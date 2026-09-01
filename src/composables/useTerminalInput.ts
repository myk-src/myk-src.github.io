import { ref, computed, watch, nextTick } from 'vue';

import { commands } from '@/utils/commands';

export function useTerminalInput() {
  const input = ref('');
  const inputField = ref<HTMLInputElement | null>(null);
  const cursorPosition = ref(0);
  const commandHistory = ref<string[]>([]);
  const currentCommandIndex = ref<number>(-1);
  const suggestion = ref('');

  const caretOffset = computed(() => `${cursorPosition.value}ch`);

  const suggestedCompletion = computed(() => {
    if (input.value.trim() === '') return '';
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