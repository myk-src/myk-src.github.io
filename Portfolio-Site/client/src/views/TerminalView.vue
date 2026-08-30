<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch, provide } from 'vue';
import HelpOutput from '@/components/HelpOutput.vue';
import ManualPage from '@/components/ManualPage.vue';
import AboutContent from '@/components/AboutContent.vue';
import ResumeContent from '@/components/ResumeContent.vue';
import SkillsContent from '@/components/SkillsContent.vue';
import ContactContent from '@/components/ContactContent.vue';
import ProjectsContent from '@/components/ProjectsContent.vue';
import Api from '@/api';
import resumeData from '@/data/resume.json';
import type { Resume } from '@/types';
import { file_structure, type Directory, type File } from '@/utils/fileSystem';
import { commands, type Command } from '@/utils/commands';
import { themes } from '@/utils/themes';

const view = ref('console');

const theme = ref('myk-src');

const styleObject = computed(() => themes.get(theme.value));

const commandHistory = ref<string[]>([]);
const currentCommandIndex = ref<number>(-1);
const suggestion = ref('');

const resumes = ref<Resume[]>([]);

function switchTheme(newTheme: string) {
  theme.value = newTheme;
}

let commands_ran: { id: number, command: string, parameters: string[], path: string, output: string }[] = [];

const user = 'Guest@' + window.location.toString().split('/')[2];
const os = 'MYK.O.S';
const version = 'v2026.9';
let path: string = '/';
let previousPath: string = '/';

function getCurrentDirectory(path: string): any {
  const parts = path.split('/').filter(Boolean);
  let current: Directory | File = file_structure;

  for (const part of parts) {
    if (current.type === 'directory' && current.children[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  return current;
}

function resolvePath(path: string, currentPath: string): string {
  if (path.startsWith('/')) return path;
  const parts = currentPath.split('/').concat(path.split('/')).filter(Boolean);
  const stack: string[] = [];

  for (const part of parts) {
    if (part === '..') {
      stack.pop();
    } else if (part !== '.') {
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}

function getStyledName(name: string, type: string): string {
  const fileEmoji = '📄';
  const dirEmoji = '📁';
  const styledName = type === 'directory'
    ? `<span style="color: var(--header-color);">${dirEmoji} ${name}</span>`
    : `${fileEmoji} ${name}`;
  return styledName;
}

function findCommandByAlias(alias: string): Command | undefined {
  for (const [command, details] of commands.entries()) {
    if (details.aliases.includes(alias)) {
      return command;
    }
  }
  return undefined;
}

function runCommand(command: string, parameters: string[]) {
  let output = '';
  const actualCommand = commands.has(command as Command) ? command as Command : findCommandByAlias(command);

  if (command === 'man' || command === '?' || command === 'h' || command === 'help') {
    if (parameters.length === 1) {
      const cmd = parameters[0] as Command;
      const actualCmd = commands.has(cmd) ? cmd : findCommandByAlias(cmd);
      if (actualCmd) {
        output = 'man ' + actualCmd;
      } else {
        output = 'Manual page not found';
      }
    } else if (parameters.length === 0) {
      output = 'man';
    } else {
      output = 'Invalid number of parameters for help command';
    }
  } else if (actualCommand) {
    switch (actualCommand) {
      case 'portfolio':
        if (parameters.length === 0) {
          output = 'portfolio';
          view.value = 'portfolio';
        } else {
          output = 
            'Invalid number of parameters for portfolio command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: portfolio [options]';
        }
        break;
      case 'theme':
        if (parameters.length === 0) {
          output = 'theme';
        } else if (parameters.length === 1) {
          const newTheme = parameters[0];
          if (newTheme === '-l') {
            output = 'Available themes:\n' + Array.from(themes.keys()).join(', ');
          } else {
            if (themes.has(newTheme)) {
              switchTheme(newTheme);
              output = 'Theme changed to ' + newTheme;
            } else {
              output = 'Theme not found: ' + newTheme;
            }
          }
        } else {
          output = 
            'Invalid number of parameters for theme command\n' 
            + 'Expected: <= 1  | Actual: ' + parameters.length + '\n' + 'Usage: theme [option/argument]';
        }
        break;
      case 'about':
        if (parameters.length === 0) {
          output = 'about';
          view.value = 'about';
        } else {
          output = 
            'Invalid number of parameters for about command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: about [options]';
        }
        break;
      case 'alias':
        output = 'Must be logged in to use this command';
        break;
      case 'cat':
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content;
            } else {
              output = `cat: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `cat: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for cat command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: cat [file]';
        }
        break;
      case 'cd':
        if (parameters.length === 0) {
          previousPath = path;
          path = '/';
          output = '';
        }
        else if (parameters.length === 1) {
          if (parameters.length === 1 && parameters[0] === '..' && path === '/') {
            output = 'cd: cannot move up from root directory';
            break;
          }
          const newPath = resolvePath(parameters[0], path);
          const directory = getCurrentDirectory(newPath);
          if (directory && directory.type === 'directory') {
            previousPath = path;
            path = newPath;
            output = '';
          } else {
            output = `cd: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = `cd: too many arguments\nUsage: cd [directory]`;
        }
        break;
      case 'chmod':
        output = 'Must be logged in to use this command';
        break;
      case 'chown':
        output = 'Must be logged in to use this command';
        break;
      case 'clear':
        commands_ran = [];
        return;
      case 'contact':
        if (parameters.length === 0) {
          output = 'contact';
          view.value = 'contact';
        } else {
          output = 
            'Invalid number of parameters for contact command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: contact [options]';
        }
        break;
      case 'cp':
        output = 'Must be logged in to use this command';
        break;
      case 'echo':
        if (parameters.length === 0) {
          output = 'echo';
        } else {
          output = parameters.join(' ');
        }
        break;
      case 'exit':
        output = 'Exiting the terminal... Wait for it... Ran into an error: You can never leave!';
        break;
      case 'head':
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content.split('\n')[1];
            } else {
              output = `head: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `head: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for head command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: head [file]';
        }
        break;
      case 'less':
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content;
            } else {
              output = `less: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `less: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for less command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: less [file]';
        }
        break;
      case 'ls':
        if (parameters.length > 1) {
          output = 'Invalid number of parameters for ls command\n' +
            'Expected: 0 or 1 | Actual: ' + parameters.length + '\n' + 'Usage: ls [directory]';
          break;
        }

        const targetPath = parameters.length === 1 ? resolvePath(parameters[0], path) : path;
        const targetDir = getCurrentDirectory(targetPath);

        if (targetDir && targetDir.type === 'directory' && targetDir.children) {
          output = Object.keys(targetDir.children)
            .map(name => getStyledName(name, targetDir.children[name].type))
            .join('\n');
        } else {
          output = `ls: cannot access '${targetPath}': No such file or directory`;
        }
        break;
      case 'mkdir':
        output = 'Must be logged in to use this command';
        break;
      case 'mv':
        output = 'Must be logged in to use this command';
        break;
      case 'projects':
        if (parameters.length === 0) {
          output = 'projects';
          view.value = 'projects';
        } else {
          output = 
            'Invalid number of parameters for projects command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: projects [options]';
        }
        break;
      case 'pwd':
        if (parameters.length === 0) {
          output = path;
        } else {
          output = 
            'Invalid number of parameters for pwd command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: pwd [options]';
        }
        break;
      case 'resume':
        if (parameters.length === 0) {
          output = 'resume';
          view.value = 'resume';
        } else {
          output = 
            'Invalid number of parameters for resume command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: resume [options]';
        }
        break;
      case 'rm':
        output = 'Must be logged in to use this command';
        break;
      case 'skills':
        if (parameters.length === 0) {
          output = 'skills';
          view.value = 'skills';
        } else {
          output = 
            'Invalid number of parameters for skills command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: skills [options]';
        }
        break;
      case 'ssh':
        output = 'Must be logged in to use this command';
        break;
      case 'sudo':
        output = 'Stop trying to sudo! You are not MyKl-Y!';
        break;
      case 'tail':
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content.split('\n')[file.content.split('\n').length - 2];
            } else {
              output = `tail: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `tail: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for tail command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: tail [file]';
        }
        break;
      case 'touch':
        output = 'Must be logged in to use this command';
        break;
      case 'uname':
        if (parameters.length === 0) {
          output = user.split('@')[1];
        } else {
          output = 
            'Invalid number of parameters for uname command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: uname [options]';
        }
        break;
      case 'wc':
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              const lines = file.content.split('\n').length;
              const words = file.content.split(/\s+/).length;
              const characters = file.content.length;
              output = `${lines} ${words} ${characters} ${parameters[0]}`;
            } else {
              output = `wc: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `wc: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for wc command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: wc [file]';
        }
        break;
      case 'whoami':
        if (parameters.length === 0) {
          output = user.split('@')[0];
        } else {
          output = 
            'Invalid number of parameters for whoami command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: whoami [options]';
        }
        break;
      default:
        output = 'Command not found: ' + command;
    }
  } else {
    if (command === '') {
      output = '';
      command = ' ';
    } else if (command === 'q' && view.value !== 'console') {
      view.value = 'console';
      return;
    } else {
      output = 'Command not found: ' + command;
    }
  }
  if (view.value === 'console' || command === 'resume' || command === 'about' || command === 'contact' || command === 'projects' || command === 'skills' || command === 'portfolio') {
    if (command === 'cd' && parameters.length <= 1 && output === '') {
      commands_ran.push({ id: commands_ran.length + 1, command, parameters, path: previousPath, output });
    } else {
      commands_ran.push({ id: commands_ran.length + 1, command, parameters, path, output });
    }
  }
}

const input = ref('');
const inputField = ref<HTMLInputElement | null>(null);
const cursorPosition = ref(0);
const showHeader = ref(false);
const showHelpPrompt = ref(false);
const showUserInput = ref(false);

const caretOffset = computed(() => `${cursorPosition.value}ch`);

function syncCursorPosition() {
  if (!inputField.value) {
    cursorPosition.value = input.value.length;
    return;
  }

  const selectionStart = inputField.value.selectionStart ?? input.value.length;
  const selectionEnd = inputField.value.selectionEnd ?? selectionStart;
  cursorPosition.value = Math.min(selectionStart, selectionEnd, input.value.length);
}

const suggestedCompletion = computed(() => {
  if (input.value.trim() === '') {
    return '';
  }
  const matchingCommands = Array.from(commands.keys()).filter(cmd =>
    cmd.startsWith(input.value)
  );
  return matchingCommands.length === 1 ? matchingCommands[0] : '';
});

watch(input, () => {
  suggestion.value = suggestedCompletion.value;
  if (cursorPosition.value > input.value.length) {
    cursorPosition.value = input.value.length;
  }
});

function handleSubmit() {
  if (input.value.trim() !== '') {
    commandHistory.value.push(input.value);
    currentCommandIndex.value = -1; // Reset command history index

    const [command, ...parameters] = input.value.split(' ');
    runCommand(command, parameters);
  } else {
    input.value = ' ';
    runCommand('', []);
  }
  input.value = '';
  suggestion.value = '';
  if (view.value === 'console') {
    nextTick(() => {
      const terminal = document.getElementById('bottom');
      terminal?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowUp') {
    if (commandHistory.value.length > 0) {
      if (currentCommandIndex.value === -1) {
        currentCommandIndex.value = commandHistory.value.length - 1;
      } else if (currentCommandIndex.value > 0) {
        currentCommandIndex.value--;
      }
      input.value = commandHistory.value[currentCommandIndex.value];
      cursorPosition.value = input.value.length;
      suggestion.value = '';
    }
  } else if (event.key === 'ArrowDown') {
    if (commandHistory.value.length > 0 && currentCommandIndex.value !== -1) {
      if (currentCommandIndex.value < commandHistory.value.length - 1) {
        currentCommandIndex.value++;
        input.value = commandHistory.value[currentCommandIndex.value];
      } else {
        currentCommandIndex.value = -1;
        input.value = '';
      }
      cursorPosition.value = input.value.length;
      suggestion.value = '';
    }
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    cursorPosition.value = Math.max(0, cursorPosition.value - 1);
    if (inputField.value) {
      inputField.value.selectionStart = cursorPosition.value;
      inputField.value.selectionEnd = cursorPosition.value;
    }
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    cursorPosition.value = Math.min(input.value.length, cursorPosition.value + 1);
    if (inputField.value) {
      inputField.value.selectionStart = cursorPosition.value;
      inputField.value.selectionEnd = cursorPosition.value;
    }
  } else if (event.key === 'Tab') {
    event.preventDefault();
    if (suggestion.value) {
      input.value = suggestion.value;
      cursorPosition.value = input.value.length;
      suggestion.value = '';
    }
  } else {
    suggestion.value = '';
  }
}

async function fetchResumes() {
    resumes.value = resumeData as Resume[];
}

provide('resumes', resumes);

onMounted(() => {
  fetchResumes();
  showHeader.value = true;
  setTimeout(() => {
    showHelpPrompt.value = true;
    setTimeout(() => {
      if (resumes.value && resumes.value.length > 0) {
        showUserInput.value = true;
      }
    }, 500); // .5 second delay for user input prompt
  }, 1000); // 1 second delay for help prompt
});
</script>

<template>
  <main :style="styleObject">
    <span class="navbar">
      <span class="buttons">
        <button class="button close"></button>
        <button class="button minimize"></button>
        <button class="button maximize"></button>
      </span>
      <span class="title">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="1rem" height="1rem" viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff" stroke="none">
          <path d="M2360 5049 c-154 -11 -357 -47 -516 -93 -902 -259 -1603 -1017 -1790
          -1934 -136 -669 -8 -1355 354 -1908 255 -390 580 -686 968 -886 141 -73 341
          -154 403 -164 58 -9 109 19 133 73 18 40 18 60 12 286 l-7 243 -86 -14 c-97
          -15 -256 -9 -386 13 -105 19 -211 71 -278 139 -53 53 -67 76 -136 229 -63 139
          -135 231 -232 297 -66 46 -121 106 -117 128 6 30 48 43 121 38 141 -10 288
          -113 393 -274 72 -110 143 -179 230 -222 62 -31 79 -35 169 -38 103 -4 207 12
          291 44 41 16 43 18 58 85 19 86 56 164 106 228 l39 49 -82 11 c-264 38 -452
          102 -627 215 -229 148 -365 379 -431 731 -20 109 -23 389 -5 492 29 167 98
          319 200 445 l45 55 -20 62 c-52 168 -42 372 28 574 18 50 22 52 103 48 118 -6
          371 -108 543 -218 l71 -46 56 11 c30 6 87 18 127 27 271 58 655 58 926 0 40
          -9 97 -21 127 -27 l55 -10 95 58 c226 137 484 230 575 206 26 -7 33 -17 53
          -75 43 -125 55 -210 50 -351 -4 -95 -11 -148 -26 -195 l-21 -64 44 -54 c89
          -109 155 -244 192 -389 22 -89 25 -417 4 -544 -32 -198 -114 -406 -210 -532
          -165 -217 -464 -366 -843 -418 l-87 -12 39 -49 c47 -60 85 -137 106 -221 14
          -52 17 -137 20 -503 5 -490 5 -489 72 -521 46 -21 83 -15 229 42 738 284 1320
          932 1533 1703 141 513 111 1108 -80 1601 -172 440 -475 842 -848 1122 -405
          303 -865 474 -1367 507 -175 12 -192 12 -375 0z"/>
          </g>
        </svg>
        github.com/myk-src
      </span>
      <span class="blank"></span>
    </span>
    <div class="body">
      <span v-if="view === 'console'">
        <span id="headers" v-if="showHeader">MYK Operating System ({{ os }}) {{ version }} </span>
        <br v-if="showHeader" />
        <!--<pre>
        ░▒▓██████████████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░              ░▒▓██████▓▒░        ░▒▓███████▓▒░        
        ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░               
        ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░               
        ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░       ░▒▓██████▓▒░         
        ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░             ░▒▓█▓▒░        
        ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓██▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██▓▒░      ░▒▓█▓▒░▒▓██▓▒░ 
        ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓██▓▒░░▒▓██████▓▒░░▒▓██▓▒░▒▓███████▓▒░░▒▓██▓▒░ 
        </pre>-->
        <pre>
  ███╗   ███╗██╗   ██╗██╗  ██╗     ██████╗    ███████╗   
  ████╗ ████║╚██╗ ██╔╝██║ ██╔╝    ██╔═══██╗   ██╔════╝   
  ██╔████╔██║ ╚████╔╝ █████╔╝     ██║   ██║   ███████╗   
  ██║╚██╔╝██║  ╚██╔╝  ██╔═██╗     ██║   ██║   ╚════██║   
  ██║ ╚═╝ ██║   ██║   ██║  ██╗    ╚██████╔╝██╗███████║██╗
  ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚═════╝ ╚═╝╚══════╝╚═╝ {{ version }}</pre>
        <span v-if="showHelpPrompt">Type `<code>man</code>` for a list of commands.</span>
        <br v-if="showHelpPrompt" />
        <span v-if="showHelpPrompt">Type `<code>portfolio</code>` to view full portfolio.</span>
        <br v-if="showHelpPrompt" />
        <span v-for="command in commands_ran" :key="command.id">
          <span id="user">{{ user.split('@')[0] }}</span>
          <span id="ampersand">@</span>
          <span id="machine">{{ user.split('@')[1] }}</span>
          <span>:</span>
          <span id="path">{{ command.path.length === 1 ? "~" : "~/" + command.path.slice(1) }}</span>$
          <span class="code">{{ command.command + " " }}</span>
          <span class="code" v-for="(parameter, index) in command.parameters" :key="index"> {{ parameter + " " }}</span>
          <br/>
          <HelpOutput v-if="command.output == 'man'" :commands="commands" />
          <ManualPage
            v-else-if="command.output.startsWith('man') && command.output.split(' ').length > 1 && commands.get(command.output.split(' ')[1] as Command)"
            :command="commands.get(command.output.split(' ')[1] as Command)!"
          />
          <span v-else-if="command.output === 'theme'">
            Current theme: <span id="headers">{{ theme }}</span>
            <br/>
            For list of themes, run <code>theme -l</code>.
            <br/>
            To change themes, run <code>theme &lt;theme_name&gt;</code>.
            <br/>
          </span>
          <pre class="error" v-else-if="command.command === 'theme' && command.parameters.length === 1 && command.output.includes('not found')">{{ command.output }}</pre>
          <pre v-else-if="command.command === 'theme' && command.parameters.length === 1">{{ command.output }}</pre>
          <pre v-else-if="['resume', 'about', 'projects', 'contact', 'skills', 'portfolio'].includes(command.command) && command.parameters.length < 1"></pre>
          <pre id="headers" v-else-if="['uname', 'whoami'].includes(command.command) && command.parameters.length < 1">{{ command.output }}</pre>
          <pre v-else-if="command.command === 'echo' && command.parameters.length > 0">{{ command.output }}</pre>
          <span v-else-if="command.command === 'echo' && command.parameters.length === 0">
            <span>echo</span> <span style="font-size: .75rem;">echo</span> <span style="font-size: .5rem;">echo</span> <span style="font-size: .25rem;">echo</span> <br/>
          </span>
          <pre v-else-if="['cat', 'less', 'wc'].includes(command.command) && !command.output.includes('directory') && !command.output.includes('Invalid')">{{ command.output }}</pre>
          <pre id="headers" v-else-if="command.command === 'pwd' && command.parameters.length < 1">{{ command.output }}</pre>
          <pre class="error" v-else v-html="command.output"></pre>
        </span>
      </span>
      <span v-else-if="view === 'about'">
        <div class="secondary-header">
          <span>about(1)</span>
          <span id="headers">About Me</span>
          <span>about(1)</span>
        </div>
        <br/>
        <AboutContent />
      </span>
      <span v-else-if="view === 'resume'">
        <div class="secondary-header">
          <span>resume(1)</span>
          <span id="headers">Resume</span>
          <span>resume(1)</span>
        </div>
        <br/>
        <ResumeContent />
      </span>
      <span v-else-if="view === 'projects'">
        <div class="secondary-header">
          <span>projects(1)</span>
          <span id="headers">Projects</span>
          <span>projects(1)</span>
        </div>
        <br/>
        <ProjectsContent />
      </span>
      <span v-else-if="view === 'skills'">
        <div class="secondary-header">
          <span>skills(1)</span>
          <span id="headers">Skills</span>
          <span>skills(1)</span>
        </div>
        <br/>
        <SkillsContent />
      </span>
      <span v-else-if="view === 'contact'">
        <div class="secondary-header">
          <span>contact(1)</span>
          <span id="headers">Contact</span>
          <span>contact(1)</span>
        </div>
        <br/>
        <ContactContent />
      </span>
      <span v-else-if="view === 'portfolio'">
        <div class="secondary-header">
          <span>portfolio(1)</span>
          <span id="headers">Portfolio</span>
          <span>portfolio(1)</span>
        </div>
        <br/>
        <div id="headers" style="text-align: center;">About Me</div>
        <AboutContent />
        <br/>
        <div id="headers" style="text-align: center;">My Skills</div>
        <SkillsContent />
        <br/>
        <div id="headers" style="text-align: center;">Projects Experience</div>
        <ProjectsContent />
        <br/>
        <div id="headers" style="text-align: center;">My Resume</div>
        <ResumeContent />
        <br/>
        <div id="headers" style="text-align: center;">Contact Me</div>
        <ContactContent />
      </span>
      <span v-if="showUserInput" class="input-line-container">
        <span v-if="view === 'console'">
          <span id="user">{{ user.split('@')[0] }}</span>
          <span id="ampersand">@</span>
          <span id="machine">{{ user.split('@')[1] }}</span>
          <span>:</span>
          <span id="path">{{ path.length === 1 ? "~" : "~/" + path.slice(1) }}</span>$ 
        </span>
        <span v-else>:</span>
        <form @submit.prevent="handleSubmit" class="input-form">
          <span class="blinking-cursor" :style="{ left: caretOffset }"></span>
          <input
            ref="inputField"
            v-model="input"
            type="text"
            class="input-text"
            @keydown="handleKeyDown"
            @click="syncCursorPosition"
            @input="syncCursorPosition"
          />
          <span class="suggestion" v-if="suggestion" :style="{ left: caretOffset }">{{ suggestion.replace(input, '') }}</span>
        </form>
      </span>
      <span id="bottom"></span>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: 100vw;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.navbar {
  display: flex; 
  width: 95vw;
  justify-content: space-between;
  background-color: #444;
  border: 1px solid #ffffff;
  border-radius: .5rem .5rem 0 0;
  border-bottom: none !important;
  color: #ffffff;
}
.title {
  display: flex;
  align-items: center;
}
svg {
  margin-right: .25rem;
}
.buttons, .blank {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 3rem;
  margin: 0 .25rem;
}
.button {
  width: .75rem;
  height: .75rem;
  border-radius: 50%;
  border: none;
}
.button.close {
  background-color: #FF5C57;
}
.button.minimize {
  background-color: #FFBD2E;
}
.button.maximize {
  background-color: #27C93F;
}
.body {
  font-family: monospace;
  height: 85vh;
  width: 95vw;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 1rem;
  padding: 1rem;
  overflow: scroll;
  border-radius: 0 0 .5rem .5rem;
  border: 1px solid #ffffff;
  border-top: none !important;

  /* Firefox */
  scrollbar-width: none; 
  
  /* Internet Explorer and Legacy Edge */
  -ms-overflow-style: none; 
}
/* Chrome, Safari, and Opera */
.body::-webkit-scrollbar {
    display: none;
}
.secondary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
pre {
  line-height: normal;
}

.error {
  color: var(--error-color);
}

#headers {
  color: var(--header-color);
  text-decoration: none !important;
  font-style: normal !important;
  font-weight: bolder;
}

#user {
  color: var(--user-color);
  text-decoration: none !important;
  font-style: normal !important;
}
#ampersand {
  color: var(--ampersand-color);
  text-decoration: none !important;
  font-style: normal !important;
}
#machine {
  color: var(--machine-color);
  text-decoration: none !important;
  font-style: normal !important;
}

#path {
  color: var(--path-color);
  text-decoration: none !important;
  font-style: normal !important;
}

input {
  background-color: transparent;
  color: var(--input-color);
  border: none;
  font-family: monospace;
  font-size: 1rem;
  padding: 0;
  margin: 0;
  outline: none;
}
.suggestion {
  color: var(--input-color);
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}

.code {
  color: var(--input-color);
}
code {
  font-weight: bolder;
  color: var(--input-color)
}

.input-line-container {
  display: flex;
  width: 100%;
}

.input-form {
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-left: .5rem;
  flex-grow: 1;
}

.input-text {
  width: auto;
  flex-grow: 1;
  caret-color: transparent;
}

.blinking-cursor {
  display: block;
  width: 1ch;
  height: 1.2rem;
  position: absolute;
  background-color: var(--input-color);
  animation: blink 1s linear infinite;
  bottom: 4px;
}
.input-form:not(:focus-within) .blinking-cursor {
  background-color: transparent !important;
  border: 1px solid var(--input-color);
}

@keyframes blink {
  from, to {
    background-color: transparent;
    border-color: transparent;
  }
  50% {
    background-color: var(--input-color);
    border-color: var(--input-color);
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
</style>
