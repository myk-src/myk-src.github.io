<template>
	<main>
  <div class="workbench-desk" v-if="resume" :class="{ 'has-focus': focusedItem !== null }">
    
    <!-- Dark overlay when an item is focused -->
    <div class="focus-backdrop" v-if="focusedItem" @click="focusedItem = null"></div>

    <div class="desk-surface">
      <!-- Cutting Mat in the center -->
      <div class="cutting-mat"></div>

      <!-- The 4 Physical Objects scattered on the desk -->
      <MonitorPCB 
        :resume="resume" 
        :is-focused="focusedItem === 'monitor'" 
        @click.stop="focusItem('monitor')" 
        class="desk-item pos-monitor" 
      />
      
      <PaperBOM 
        :resume="resume" 
        :is-focused="focusedItem === 'bom'" 
        @click.stop="focusItem('bom')" 
        class="desk-item pos-bom" 
      />
      
      <EmbeddedLCD 
        :resume="resume" 
        :is-focused="focusedItem === 'lcd'" 
        @click.stop="focusItem('lcd')" 
        class="desk-item pos-lcd" 
      />
      
      <OscilloscopeProjects 
        :resume="resume" 
        :is-focused="focusedItem === 'scope'" 
        @click.stop="focusItem('scope')" 
        class="desk-item pos-scope" 
      />
    </div>
  </div>
	</main>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed, ref } from 'vue';
import resumeData from '@/data/resume.json';
import type { Resume } from '@/utils/types.js';

const PaperBOM = defineAsyncComponent(() => import('@/components/PaperBOM.vue'));
const EmbeddedLCD = defineAsyncComponent(() => import('@/components/EmbeddedLCD.vue'));
const MonitorPCB = defineAsyncComponent(() => import('@/components/MonitorPCB.vue'));
const OscilloscopeProjects = defineAsyncComponent(() => import('@/components/OscilloscopeProjects.vue'));

const resume = computed(() => (resumeData as Resume[])[0]);
const focusedItem = ref<string | null>(null);

const focusItem = (item: string) => {
  // If already focused, clicking it again shouldn't do anything (backdrop handles closing)
  if (focusedItem.value !== item) {
    focusedItem.value = item;
  }
};
</script>

<style scoped>
main {
  min-height: 90%;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
}

.workbench-desk {
  width: 100%;
  /* Dark wood desk texture */
  background-color: #2c1e16;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(0,0,0,0.1),
    rgba(0,0,0,0.1) 2px,
    transparent 2px,
    transparent 40px
  );
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: inset 0 0 100px rgba(0,0,0,0.9);
	flex-grow: 1;
}

.cutting-mat {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; height: 80%;
  background-color: #1a3325; 
  background-image: 
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  pointer-events: none;
}

.focus-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 50;
  cursor: pointer;
}

/* Base style for all desk items */
.desk-item {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy spring transition */
  cursor: pointer;
  transform-origin: center center;
}

/* Add a hover glow when NOT focused to indicate interactivity */
.workbench-desk:not(.has-focus) .desk-item:hover {
  filter: brightness(1.1) drop-shadow(0 0 15px rgba(255,255,255,0.2));
}

/* .workbench-desk.has-focus .desk-surface:has(.desk-item.pos-bom.focused) {
  overflow-y: scroll; overflow-x: hidden;
} */

/* --- SCATTERED DESK POSITIONS --- */
.pos-monitor {
  top: 20px; left: 50%;
  transform: translateX(-50%);
  z-index: 15;
}
.pos-bom {
  bottom: 100%; right: 5px;
  transform: rotate(-15deg) scale(0.25);
  z-index: 11;
}
.pos-lcd {
  bottom: 50px; left: -50px;
  transform: rotate(8deg) scale(0.25); 
  z-index: 12;
}
.pos-scope {
  top: 100px; right: 5%;
  transform: rotate(-5deg);
  z-index: 15;
}

/* --- FOCUSED STATE OVERRIDES --- */
.desk-item[is-focused="true"],
.desk-item.focused { /* Handle both prop and class based logic */
  top: 50% !important;
  left: 50% !important;
  bottom: auto !important;
  right: auto !important;
  transform: translate(-50%, -50%) scale(1) rotate(0deg) !important;
  z-index: 100 !important;
  cursor: default;
}
.desk-item.focused:is(.pos-bom) { /* Handle both prop and class based logic */
  top: 50% !important;
  left: 50% !important;
  bottom: auto !important;
  right: auto !important;
  transform: translate(-50%, 1rem) scale(1) rotate(0deg) !important;
  z-index: 100 !important;
  cursor: default;
}
</style>