import { ref } from 'vue';

import { file_structure, type Directory, type File } from '@/utils/fileSystem';

export function useFileSystem() {
  const currentPath = ref<string>('/');
  const previousPath = ref<string>('/');

  function getCurrentDirectory(targetPath: string = currentPath.value): Directory | File | null {
    const parts = targetPath.split('/').filter(Boolean);
    let current: Directory | File = file_structure;

    for (const part of parts) {
      if (current.type === 'directory' && current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  }

  function resolvePath(target: string): string {
    if (target.startsWith('/')) return target;
    const parts = currentPath.value.split('/').concat(target.split('/')).filter(Boolean);
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
    return type === 'directory'
      ? `<span style="color: var(--header-color);">${dirEmoji} ${name}</span>`
      : `${fileEmoji} ${name}`;
  }

  return { currentPath, previousPath, getCurrentDirectory, resolvePath, getStyledName };
}