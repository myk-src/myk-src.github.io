<script setup lang="ts">
import { onMounted, ref, watch, computed, provide } from 'vue';

import CustomCursor from '@/components/CustomCursor.vue';
import HardwareSwitch from '@/components/HardwareSwitch.vue';

import BootSequence from '@/views/BootSequence.vue';
import HardwareView from '@/views/HardwareView.vue';
import NotFound from '@/views/NotFound.vue';

import { themes } from '@/utils/themes';

const isLoading = ref(true);
const isCrashed = ref(false);

const savedTheme = localStorage.getItem('theme');
const theme = ref(savedTheme || 'myk-src');

watch(theme, (newTheme: string) => {
  localStorage.setItem('theme', newTheme);
});

const styleObject = computed(() => themes.get(theme.value));

provide('theme', theme);

// 1. Initialize from localStorage
const isTerminalView = ref(true);

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

const handleReboot = () => {
  isCrashed.value = false;
  window.history.replaceState({}, '', '/');
  startBootSequence();
};

onMounted(() => {
  if (sessionStorage.getItem('kernel_panic') === 'true') {
    sessionStorage.removeItem('kernel_panic'); 
    isCrashed.value = true;
  }
  else if (isLoading.value) {
    startBootSequence();
  } else {
    isLoading.value = false;
  }
});
</script>

<template>
  <div id="portfolio" :style="styleObject">
    <CustomCursor v-if="!isCrashed && !isLoading" />

    <NotFound v-if="isCrashed" @reboot="handleReboot" />

    <!-- Simplified! HardwareView handles everything now! -->
    <transition name="fade" mode="out-in" v-else>
      <BootSequence v-if="isLoading" />
      <HardwareView v-else v-model:is-software-mode="isTerminalView" />
    </transition>
  </div>
</template>

<style scoped>
#portfolio {
  display: flex;
  flex-direction: column;
  height: 100dvh; /* Swapped to standard height so the full screen stretches correctly */
  padding: 0;     /* Removed padding so the hardware desk hits the window edges */
  box-sizing: border-box;
  transition: color 0.3s ease;
  overflow: hidden;
  background-color: var(--background-color);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.98); }
</style>