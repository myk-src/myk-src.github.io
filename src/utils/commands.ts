// Define the type for the commands
export type Command = 'man' | 'portfolio' | 'about' | 'contact' | 'projects' | 'skills' | 'resume' | 'clear' | 'exit' | 'ls' | 'pwd' | 'cd' | 'mkdir' | 'mv' | 'cp' | 'rm' | 'touch' | 'cat' | 'echo' | 'less' | 'man' | 'uname' | 'whoami' | 'head' | 'tail' | 'wc' | 'ssh' | 'alias' | 'sudo' | 'chmod' | 'chown' | 'theme';

// Define the type for the commands object
interface CommandDetails {
  name: string;
  desc: string;
  syntax: string;
  usage: string;
  aliases: string[];
  arguments: { arg: string, desc: string }[];
  options: { opt: string, desc: string }[];
}

// Define the commands object with the Command type
export let commands = new Map<Command, CommandDetails>([
  ['portfolio', {
    name: 'portfolio',
    desc: 'Display information about the creator\'s portfolio',
    syntax: 'portfolio',
    usage: 'portfolio',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['theme', {
    name: 'theme',
    desc: 'Change/List the terminal theme',
    syntax: 'theme OR theme <theme_name> OR theme -l',
    usage: 'theme OR theme terminal OR theme -l',
    aliases: [],
    arguments: [
      { arg: 'theme_name', desc: '(Optional) The name of the theme to switch to' }
    ],
    options: [
      { opt: '-l', desc: '(Optional) List available themes' }
    ]
  }],
  ['man', {
    name: 'man',
    desc: 'Display information about available commands',
    syntax: 'man [<command_name>]',
    usage: 'man ls',
    aliases: ['?', 'h', 'help'],
    arguments: [
      { arg: 'command_name', desc: 'The command to display help for' }
    ],
    options: []
  }],
  ['about', {
    name: 'about',
    desc: 'Display information about the creator',
    syntax: 'about',
    usage: 'about',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['contact', {
    name: 'contact',
    desc: 'Display contact information of the creator',
    syntax: 'contact',
    usage: 'contact',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['projects', {
    name: 'projects',
    desc: 'Display information about projects made by the creator',
    syntax: 'projects',
    usage: 'projects',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['skills', {
    name: 'skills',
    desc: 'Display information about the skills of the creator',
    syntax: 'skills',
    usage: 'skills',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['resume', {
    name: 'resume',
    desc: 'Display the resume of the creator',
    syntax: 'resume',
    usage: 'resume',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['exit', {
    name: 'exit',
    desc: 'Exit the terminal',
    syntax: 'exit',
    usage: 'exit',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['ls', {
    name: 'ls',
    desc: 'List files and directories',
    syntax: 'ls [directory]',
    usage: 'ls',
    aliases: [],
    arguments: [
      { arg: 'directory', desc: 'The directory to list files and directories in' }
    ],
    options: []
  }],
  ['pwd', {
    name: 'pwd',
    desc: 'Print the current working directory',
    syntax: 'pwd',
    usage: 'pwd',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['cd', {
    name: 'cd',
    desc: 'Change the current working directory',
    syntax: 'cd <directory>',
    usage: 'cd Documents',
    aliases: [],
    arguments: [
      { arg: 'directory', desc: 'The directory to change to' }
    ],
    options: []
  }],
  ['mkdir', {
    name: 'mkdir',
    desc: 'Create a new directory',
    syntax: 'mkdir <directory>',
    usage: 'mkdir new_directory',
    aliases: [],
    arguments: [
      { arg: 'directory', desc: 'The name of the new directory' }
    ],
    options: []
  }],
  ['mv', {
    name: 'mv',
    desc: 'Move files or directories',
    syntax: 'mv <source> <destination>',
    usage: 'mv file.txt new_directory',
    aliases: [],
    arguments: [
      { arg: 'source', desc: 'The file or directory to move' },
      { arg: 'destination', desc: 'The destination directory' }
    ],
    options: []
  }],
  ['cp', {
    name: 'cp',
    desc: 'Copy files or directories',
    syntax: 'cp <source> <destination>',
    usage: 'cp file.txt new_directory',
    aliases: [],
    arguments: [
      { arg: 'source', desc: 'The file or directory to copy' },
      { arg: 'destination', desc: 'The destination directory' }
    ],
    options: []
  }],
  ['rm', {
    name: 'rm',
    desc: 'Remove files or directories',
    syntax: 'rm <file>',
    usage: 'rm file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file or directory to remove' }
    ],
    options: []
  }],
  ['touch', {
    name: 'touch',
    desc: 'Create an empty file',
    syntax: 'touch <file>',
    usage: 'touch new_file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The name of the new file' }
    ],
    options: []
  }],
  ['clear', {
    name: 'clear',
    desc: 'Clear the terminal screen',
    syntax: 'clear',
    usage: 'clear',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['cat', {
    name: 'cat',
    desc: 'Display the contents of a file',
    syntax: 'cat <file>',
    usage: 'cat file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to display' }
    ],
    options: []
  }],
  ['echo', {
    name: 'echo',
    desc: 'Display a line of text',
    syntax: 'echo <text>',
    usage: 'echo Hello, World!',
    aliases: [],
    arguments: [
      { arg: 'text', desc: 'The text to display' }
    ],
    options: []
  }],
  ['less', {
    name: 'less',
    desc: 'View the contents of a file one page at a time',
    syntax: 'less <file>',
    usage: 'less file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to view' }
    ],
    options: []
  }],
  ['uname', {
    name: 'uname',
    desc: 'Print system information',
    syntax: 'uname',
    usage: 'uname',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['whoami', {
    name: 'whoami',
    desc: 'Print the current user',
    syntax: 'whoami',
    usage: 'whoami',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['head', {
    name: 'head',
    desc: 'Display the beginning of a file',
    syntax: 'head <file>',
    usage: 'head file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to display' }
    ],
    options: []
  }],
  ['tail', {
    name: 'tail',
    desc: 'Display the end of a file',
    syntax: 'tail <file>',
    usage: 'tail file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to display' }
    ],
    options: []
  }],
  ['wc', {
    name: 'wc',
    desc: 'Count lines, words, and characters in a file',
    syntax: 'wc <file>',
    usage: 'wc file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to count' }
    ],
    options: []
  }],
  ['ssh', {
    name: 'ssh',
    desc: 'Connect to a remote server',
    syntax: 'ssh <user>',
    usage: 'ssh user@host',
    aliases: [],
    arguments: [
      { arg: 'user@host', desc: 'The user and host to connect to' }
    ],
    options: []
  }],
  ['alias', {
    name: 'alias',
    desc: 'Create an alias for a command',
    syntax: 'alias <name>="<command>"',
    usage: 'alias ll="ls -l"',
    aliases: [],
    arguments: [
      { arg: 'name', desc: 'The name of the alias' },
      { arg: 'command', desc: 'The command to alias' }
    ],
    options: []
  }],
  ['sudo', {
    name: 'sudo',
    desc: 'Run a command with elevated privileges',
    syntax: 'sudo <command>',
    usage: 'sudo rm file.txt',
    aliases: [],
    arguments: [
      { arg: 'command', desc: 'The command to run with elevated privileges' }
    ],
    options: []
  }],
  ['chmod', {
    name: 'chmod',
    desc: 'Change file permissions',
    syntax: 'chmod <mode> <file>',
    usage: 'chmod 755 file.txt',
    aliases: [],
    arguments: [
      { arg: 'mode', desc: 'The permissions to set' },
      { arg: 'file', desc: 'The file to change permissions for' }
    ],
    options: []
  }],
  ['chown', {
    name: 'chown',
    desc: 'Change file owner and group',
    syntax: 'chown <user:group> <file>',
    usage: 'chown user:group file.txt',
    aliases: [],
    arguments: [
      { arg: 'user:group', desc: 'The user and group to set as owner' },
      { arg: 'file', desc: 'The file to change owner and group for' }
    ],
    options: []
  }],
  ['neofetch', {
    name: 'neofetch',
    desc: 'Fetch system details',
    syntax: 'neofetch',
    usage: 'neofetch',
    aliases: ['fastfetch', 'fetch'],
    arguments: [],
    options: []
  }]
]);