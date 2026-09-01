import { ref, computed, watch, nextTick } from 'vue';

import { commands } from '@/utils/commands';
import { themes } from '@/utils/themes';

export function useTerminalInput(fileSystem: any) {
  const input = ref('');
  const inputField = ref<HTMLInputElement | null>(null);
  const cursorPosition = ref(0);
  const commandHistory = ref<string[]>([]);
  const currentCommandIndex = ref<number>(-1);
  const suggestion = ref('');

  const caretOffset = computed(() => `${cursorPosition.value}ch`);

  const suggestedCompletion = computed(() => {
    if (input.value.trim() === '') return '';

    // Handle single word (Command completion)
    if (!input.value.includes(' ')) {
      const matchingCommands = Array.from(commands.keys()).filter(cmd =>
        cmd.startsWith(input.value)
      );
      return matchingCommands.length === 1 ? matchingCommands[0] : '';
    }

    // Handle multiple words (Argument completion)
    const parts = input.value.split(' ');
    
    // Only autocomplete the first argument to keep it simple and clean
    if (parts.length === 2) {
      const cmd = parts[0];
      const arg = parts[1];

      // Theme completion
      if (cmd === 'theme') {
        const matchingThemes = Array.from(themes.keys()).filter(t => t.startsWith(arg));
        return matchingThemes.length === 1 ? `${cmd} ${matchingThemes[0]}` : '';
      }

      // File System completion
      const fsCommands = ['cd', 'cat', 'less', 'ls', 'head', 'tail', 'wc'];
      if (fsCommands.includes(cmd) && fileSystem) {
        const lastSlashIndex = arg.lastIndexOf('/');
        let searchDir = fileSystem.currentPath.value;
        let partial = arg;

        // If they type a nested path like "cd folder/sub", split it up to search inside "folder"
        if (lastSlashIndex !== -1) {
          const pathPart = arg.substring(0, lastSlashIndex) || '/';
          searchDir = fileSystem.resolvePath(pathPart);
          partial = arg.substring(lastSlashIndex + 1);
        }

        const dirEntity = fileSystem.getCurrentDirectory(searchDir);
        
        if (dirEntity && dirEntity.type === 'directory' && dirEntity.children) {
          const matchingFiles = Object.keys(dirEntity.children).filter(f => f.startsWith(partial));
          
          if (matchingFiles.length === 1) {
            const prefix = lastSlashIndex !== -1 ? arg.substring(0, lastSlashIndex + 1) : '';
            return `${cmd} ${prefix}${matchingFiles[0]}`;
          }
        }
      }
    }

    return '';
  });

  watch(input, () => {
    suggestion.value = suggestedCompletion.value;
    if (cursorPosition.value > input.value.length) {
      cursorPosition.value = input.value.length;
    }
  });

  function syncCursorPosition() {
    if (!inputField.value) {
      cursorPosition.value = input.value.length;
      return;
    }
    const selectionStart = inputField.value.selectionStart ?? input.value.length;
    const selectionEnd = inputField.value.selectionEnd ?? selectionStart;
    cursorPosition.value = Math.min(selectionStart, selectionEnd, input.value.length);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      event.preventDefault(); // Stop browser from jumping to the beginning
      
      if (commandHistory.value.length > 0) {
        if (currentCommandIndex.value === -1) {
          currentCommandIndex.value = commandHistory.value.length - 1;
        } else if (currentCommandIndex.value > 0) {
          currentCommandIndex.value--;
        }
        
        input.value = commandHistory.value[currentCommandIndex.value];
        cursorPosition.value = input.value.length;
        suggestion.value = '';

        // Force native input cursor to the end
        nextTick(() => {
          if (inputField.value) {
            inputField.value.selectionStart = cursorPosition.value;
            inputField.value.selectionEnd = cursorPosition.value;
          }
        });
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault(); // Stop browser from jumping to the end natively
      
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

        // Force native input cursor to the end
        nextTick(() => {
          if (inputField.value) {
            inputField.value.selectionStart = cursorPosition.value;
            inputField.value.selectionEnd = cursorPosition.value;
          }
        });
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

  // Focuses the input field, but allows users to highlight and copy text!
  function focusInput() {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return; // Don't steal focus if they are highlighting text
    }
    
    if (inputField.value) {
      inputField.value.focus();
    }
  }

  return {
    input, inputField, commandHistory, currentCommandIndex,
    suggestion, caretOffset, syncCursorPosition, handleKeyDown, focusInput
  };
}