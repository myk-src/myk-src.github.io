import { type Ref } from 'vue';
import { commands, type Command } from '@/utils/commands';
import { themes } from '@/utils/themes';

export function useCommandExecutor(
  view: Ref<string>,
  theme: Ref<string>,
  commandsRan: Ref<any[]>,
  fileSystem: any,
  user: string
) {
  const { currentPath, previousPath, getCurrentDirectory, resolvePath, getStyledName } = fileSystem;

  // ---- Command Logic Helpers ----
  const handleViewCommand = (params: string[], viewName: string) => {
    if (params.length === 0) {
      view.value = viewName;
      return viewName;
    }
    return `Invalid number of parameters for ${viewName} command\nExpected: 0 | Actual: ${params.length}\nUsage: ${viewName} [options]`;
  };

  const authRequired = () => 'Must be logged in to use this command';
  
  const invalidParams = (cmd: string, expected: string, actual: number) => 
    `Invalid number of parameters for ${cmd} command\nExpected: ${expected} | Actual: ${actual}\nUsage: ${cmd} [options]`;

  const handleFileReadCommand = (params: string[], cmdName: string, processContent: (content: string, name: string) => string) => {
    if (params.length !== 1) return invalidParams(cmdName, '1', params.length);
    
    // Resolve the full path instead of just looking in the current directory
    const targetPath = resolvePath(params[0]);
    const targetEntity = getCurrentDirectory(targetPath);
    
    if (targetEntity) {
      if (targetEntity.type === 'file') {
        // Extract just the filename from the path for the wc command
        const fileName = params[0].split('/').pop() || params[0];
        return processContent(targetEntity.content, fileName);
      } else {
        return `${cmdName}: ${params[0]}: Is a directory`;
      }
    }
    
    return `${cmdName}: ${params[0]}: No such file or directory`;
  };

  // ---- The Command Map Dictionary ----
  const commandHandlers: Record<string, (params: string[]) => string | void> = {
    // Views
    portfolio: (p) => handleViewCommand(p, 'portfolio'),
    about: (p) => handleViewCommand(p, 'about'),
    contact: (p) => handleViewCommand(p, 'contact'),
    projects: (p) => handleViewCommand(p, 'projects'),
    resume: (p) => handleViewCommand(p, 'resume'),
    skills: (p) => handleViewCommand(p, 'skills'),

    // Auth & System Overrides
    alias: authRequired, chmod: authRequired, chown: authRequired, cp: authRequired, 
    mkdir: authRequired, mv: authRequired, rm: authRequired, ssh: authRequired, touch: authRequired,
    sudo: () => 'Stop trying to sudo! You are not myk-src!',
    exit: () => 'Exiting the terminal... Wait for it... Ran into an error: You can never leave!',
    clear: () => { commandsRan.value = []; },
    
    // Theme Management
    theme: (p) => {
      if (p.length === 0) return 'theme';
      if (p.length > 1) return invalidParams('theme', '<= 1', p.length);
      if (p[0] === '-l') return 'Available themes:\n' + Array.from(themes.keys()).join(', ');
      if (themes.has(p[0])) {
        theme.value = p[0];
        return `Theme changed to ${p[0]}`;
      }
      return `Theme not found: ${p[0]}`;
    },

    // File System Navigation
    cd: (p) => {
      if (p.length === 0) {
        previousPath.value = currentPath.value;
        currentPath.value = '/';
        return '';
      }
      if (p.length > 1) return `cd: too many arguments\nUsage: cd [directory]`;
      if (p[0] === '..' && currentPath.value === '/') return 'cd: cannot move up from root directory';
      
      const newPath = resolvePath(p[0]);
      const directory = getCurrentDirectory(newPath);
      if (directory && directory.type === 'directory') {
        previousPath.value = currentPath.value;
        currentPath.value = newPath;
        return '';
      }
      return `cd: ${p[0]}: No such file or directory`;
    },
    ls: (p) => {
      if (p.length > 1) return invalidParams('ls', '0 or 1', p.length);
      
      const targetPath = p.length === 1 ? resolvePath(p[0]) : currentPath.value;
      const targetEntity = getCurrentDirectory(targetPath);
      
      if (targetEntity) {
        if (targetEntity.type === 'directory' && targetEntity.children) {
          const contents = Object.keys(targetEntity.children)
            .map(name => getStyledName(name, targetEntity.children![name].type))
            .join('\n');
            
          // If the user specified a directory, print the dir name first
          return p.length === 1 ? `${p[0]}:\n${contents}` : contents;
          
        } else if (targetEntity.type === 'file') {
          // If the user ran 'ls' on a specific file, just print the file
          const fileName = p[0].split('/').pop() || p[0];
          return getStyledName(fileName, 'file');
        }
      }
      
      return `ls: cannot access '${p.length === 1 ? p[0] : targetPath}': No such file or directory`;
    },
    pwd: (p) => p.length === 0 ? currentPath.value : invalidParams('pwd', '0', p.length),

    // File Reading
    cat: (p) => handleFileReadCommand(p, 'cat', c => c),
    less: (p) => handleFileReadCommand(p, 'less', c => c),
    head: (p) => handleFileReadCommand(p, 'head', c => c.split('\n')[1] || ''),
    tail: (p) => handleFileReadCommand(p, 'tail', c => {
      const lines = c.split('\n');
      return lines[lines.length - 2] || '';
    }),
    wc: (p) => handleFileReadCommand(p, 'wc', (c, n) => `${c.split('\n').length} ${c.split(/\s+/).length} ${c.length} ${n}`),

    // Misc
    echo: (p) => p.length === 0 ? 'echo' : p.join(' '),
    uname: (p) => p.length === 0 ? user.split('@')[1] : invalidParams('uname', '0', p.length),
    whoami: (p) => p.length === 0 ? user.split('@')[0] : invalidParams('whoami', '0', p.length),

    // Linux Rice Neofetch
    neofetch: (p) => {
      if (p.length > 0) return invalidParams('neofetch', '0', p.length);
      
      return `
<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center; margin: 1rem 0; color: var(--text-color);">
  <pre style="color: var(--user-color); margin: 0; line-height: 1.15; text-shadow: 0 0 8px color-mix(in srgb, var(--user-color) 40%, transparent);">
███╗   ███╗██╗   ██╗██╗  ██╗
████╗ ████║╚██╗ ██╔╝██║ ██╔╝
██╔████╔██║ ╚████╔╝ █████╔╝ 
██║╚██╔╝██║  ╚██╔╝  ██╔═██╗ 
██║ ╚═╝ ██║   ██║   ██║  ██╗
╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝
  </pre>

  <div style="display: flex; flex-direction: column; gap: 0;">
    <div><span style="color: var(--user-color); font-weight: bold;">${user.split('@')[0]}</span>@<span style="color: var(--path-color); font-weight: bold;">${user.split('@')[1]}</span></div>
    <div>-----------------------</div>
    <div><span style="color: var(--user-color); font-weight: bold;">OS</span>: MYK.O.S v2026.9 (web_x86_64)</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Host</span>: MY-P1 Custom Architecture</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Kernel</span>: 6.9.12-myk-core</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Uptime</span>: 94 days, 13 hours, 37 mins</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Packages</span>: 2026 (npm)</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Shell</span>: bash 5.1.16</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Resolution</span>: 1920x1080</div>
    <div><span style="color: var(--user-color); font-weight: bold;">DE</span>: Vue 3</div>
    <div><span style="color: var(--user-color); font-weight: bold;">WM</span>: CSS Flexbox / Waybar</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Terminal</span>: vue-term</div>
    <div><span style="color: var(--user-color); font-weight: bold;">CPU</span>: MY-P1 32-bit Pipelined RISC-V @ 1.2GHz</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Memory</span>: 3128MiB / 16384MiB</div>
    <div style="display: flex; gap: 0; margin-top: 1rem;">
      <span style="background: #333333; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #FF5C57; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #27C93F; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #FFBD2E; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #57C7FF; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #FF6AC1; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #5AF78E; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: var(--text-color); width: 1.5rem; height: 1rem; display: inline-block;"></span>
    </div>
  </div>
</div>`;
    }
  };

  function findCommandByAlias(alias: string): string | undefined {
    for (const [command, details] of commands.entries()) {
      if (details.aliases.includes(alias)) return command as string;
    }
    return undefined;
  }

  function runCommand(commandString: string, parameters: string[]) {
    let output = '';
    const actualCommand = (commands.has(commandString as Command) ? commandString : findCommandByAlias(commandString)) || commandString;

    // Handle Help/Man dynamically
    if (['man', '?', 'h', 'help'].includes(actualCommand)) {
      if (parameters.length === 0) output = 'man';
      else if (parameters.length === 1) {
        const targetCmd = (commands.has(parameters[0] as Command) ? parameters[0] : findCommandByAlias(parameters[0]));
        output = targetCmd ? `man ${targetCmd}` : 'Manual page not found';
      } else {
        output = 'Invalid number of parameters for help command';
      }
    } 
    // Handle empty input
    else if (actualCommand === '') {
      output = '';
      commandString = ' ';
    } 
    // Handle quit
    else if (actualCommand === 'q' && view.value !== 'console') {
      view.value = 'console';
      return;
    }
    // Execute via Dictionary
    else if (commandHandlers[actualCommand]) {
      output = commandHandlers[actualCommand](parameters) as string || '';
    } 
    // Not found
    else {
      output = `Command not found: ${commandString}`;
    }

    // Push to reactive history
    if (actualCommand !== 'clear') {
      if (view.value === 'console' || ['resume', 'about', 'contact', 'projects', 'skills', 'portfolio'].includes(actualCommand)) {
        const isCdSuccess = actualCommand === 'cd' && parameters.length <= 1 && output === '';
        commandsRan.value.push({ 
          id: commandsRan.value.length + 1, 
          command: commandString, 
          parameters, 
          path: isCdSuccess ? previousPath.value : currentPath.value, 
          output 
        });
      }
    }
  }

  return { runCommand };
}