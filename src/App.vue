<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import HardwareSwitch from './components/HardwareSwitch.vue';
import BootSequence from './views/BootSequence.vue';
import TerminalView from './views/TerminalView.vue';
import HardwareView from './views/HardwareView.vue';
import NotFound from './views/NotFound.vue';

const isLoading = ref(true);
const isCrashed = ref(false);

// 1. Initialize from localStorage (default to true if it doesn't exist yet)
const savedView = localStorage.getItem('isTerminalView');
const isTerminalView = ref(savedView !== null ? JSON.parse(savedView) : true);

// 2. Watch for changes and save them instantly
watch(isTerminalView, (newValue) => {
  localStorage.setItem('isTerminalView', JSON.stringify(newValue));
});

const startBootSequence = () => {
  isLoading.value = true;
  window.setTimeout(() => {
    isLoading.value = false;
  }, 3000); 
};

// Handle the reboot event from the Kernel Panic screen
const handleReboot = () => {
  isCrashed.value = false;
  // Clean up the URL in the browser without reloading the page
  window.history.replaceState({}, '', '/');
  startBootSequence();
};

onMounted(() => {
  // 1. Check for 404 condition (User navigated to a bad URL)
  // GH Pages usually formats subpaths like /portfolio/bad-url
  const path = window.location.pathname;
  const repoName = window.location.hostname.includes('github.io') ? '/' + window.location.pathname.split('/')[1] : '';
  const isBadUrl = path !== '/' && path !== repoName + '/' && path !== repoName;

  if (isBadUrl) {
    isCrashed.value = true;
  } 
  // 2. Normal Boot
  else if (isLoading.value) {
    startBootSequence();
  } else {
    isLoading.value = false;
  }
});
</script>

<template>
  <div id="portfolio">
    <!-- If crashed, ONLY show the Kernel Panic screen -->
    <NotFound v-if="isCrashed" @reboot="handleReboot" />

    <template v-else>
      <HardwareSwitch v-model="isTerminalView" />

      <BootSequence v-if="isLoading" />
      <component v-else :is="isTerminalView ? TerminalView : HardwareView" />
    </template>
  </div>
</template>

<style scoped>
#portfolio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
}
</style>
