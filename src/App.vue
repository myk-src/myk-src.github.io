<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HardwareSwitch from './components/HardwareSwitch.vue';
import BootSequence from './views/BootSequence.vue';
import TerminalView from './views/TerminalView.vue';
import HardwareView from './views/HardwareView.vue';

const isLoading = ref(true);
const isTerminalView = ref(true);

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
  min-height: 100vh;
}
</style>
