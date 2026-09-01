<script setup lang="ts">
import { onMounted, ref, watch, computed, provide } from 'vue';

import CustomCursor from '@/components/CustomCursor.vue';
import HardwareSwitch from '@/components/HardwareSwitch.vue';

import BootSequence from '@/views/BootSequence.vue';
import HardwareView from '@/views/HardwareView.vue';
import NotFound from '@/views/NotFound.vue';
import TerminalView from '@/views/TerminalView.vue';

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
  <div id="portfolio" :class="isTerminalView ? 'sw' : 'hw'" :style="styleObject">
    <CustomCursor v-if="!isCrashed && !isLoading" />

    <NotFound v-if="isCrashed" @reboot="handleReboot" />

    <template v-else>
      <HardwareSwitch v-model="isTerminalView" />

      <transition name="fade" mode="out-in">
        <BootSequence v-if="isLoading" />
        <component v-else :is="isTerminalView ? TerminalView : HardwareView" />
      </transition>
    </template>
  </div>
</template>

<style scoped>
#portfolio {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  min-height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;

  transition: color 0.3s ease;
}

.sw {
  background-image: url('@/assets/wallpaper/ascii.jpg');
  background-size: cover;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-color: var(--background-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* The start and end states (faded out and slightly scaled down) */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98); 
}
</style>
