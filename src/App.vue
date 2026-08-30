<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import HardwareSwitch from './components/HardwareSwitch.vue';
import BootSequence from './views/BootSequence.vue';
import TerminalView from './views/TerminalView.vue';
import HardwareView from './views/HardwareView.vue';

const isLoading = ref(true);

// 1. Initialize from localStorage (default to true if it doesn't exist yet)
const savedView = localStorage.getItem('isTerminalView');
const isTerminalView = ref(savedView !== null ? JSON.parse(savedView) : true);

// 2. Watch for changes and save them instantly
watch(isTerminalView, (newValue) => {
  localStorage.setItem('isTerminalView', JSON.stringify(newValue));
});

onMounted(() => {
  window.setTimeout(() => {
    isLoading.value = false;
  }, 3000); // Simulate a 3-second boot sequence (> 3 seconds to ensure the boot sequence completes)
});
</script>

<template>
  <div id="portfolio">
    <HardwareSwitch v-model="isTerminalView" />

    <BootSequence v-if="isLoading" />
    <component v-else :is="isTerminalView ? TerminalView : HardwareView" />
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
