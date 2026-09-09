<script setup lang="ts">
import { computed, ref } from 'vue';

import resumeData from '@/data/resume.json';

import type { Resume } from '@/utils/types.js';

import PaperBOM from '@/components/PaperBOM.vue';
import EmbeddedLCD from '@/components/EmbeddedLCD.vue';
import MonitorPCB from '@/components/MonitorPCB.vue';
import OscilloscopeProjects from '@/components/OscilloscopeProjects.vue';
import PaperResume from '@/components/PaperResume.vue';
import BusinessCard from '@/components/BusinessCard.vue';
import DeskKeyboard from '@/components/DeskKeyboard.vue';
import ComputerMouse from '@/components/ComputerMouse.vue';

const resume = computed(() => (resumeData as Resume[])[0]);
const focusedItem = ref<string | null>(null);

const props = defineProps<{ isSoftwareMode: boolean }>();
const emit = defineEmits(['update:isSoftwareMode']);

// Synchronous interceptor: Locks the monitor in focus BEFORE the screen shrinks!
const handleSoftwareMode = (val: boolean) => {
  if (!val) {
    focusedItem.value = 'monitor';
  }
  emit('update:isSoftwareMode', val);
};

const focusItem = (item: string) => {
  if (props.isSoftwareMode) return; 
  if (focusedItem.value !== item) {
    focusedItem.value = item;
  }
};
</script>

<template>
  <main>
  <div class="workbench-desk" v-if="resume" :class="{ 'has-focus': focusedItem !== null }">
    <div class="focus-backdrop" v-if="focusedItem && !isSoftwareMode" @click="focusedItem = null"></div>

    <div class="desk-surface">
      <div class="cutting-mat"></div>

      <!-- Listen to the monitor's update event and pass it up -->
      <MonitorPCB 
        :resume="resume" 
        :is-focused="focusedItem === 'monitor' || isSoftwareMode" 
        :is-software-mode="isSoftwareMode"
        @update:is-software-mode="handleSoftwareMode"
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

      <PaperResume 
        :is-focused="focusedItem === 'resume'" 
        @click.stop="focusItem('resume')" 
        class="desk-item pos-resume" 
      />

      <BusinessCard 
        :resume="resume" 
        :is-focused="focusedItem === 'card'" 
        @click.stop="focusItem('card')" 
        class="desk-item pos-card" 
      />

      <DeskKeyboard 
        :is-focused="focusedItem === 'keyboard'" 
        @click.stop="focusItem('keyboard')" 
        class="desk-item pos-keyboard" 
      />

      <ComputerMouse 
        :is-focused="focusedItem === 'mouse'" 
        @click.stop="focusItem('mouse')" 
        class="desk-item pos-mouse" 
      />
    </div>
  </div>
  </main>
</template>

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
    90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 40px
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
  translate: -50% -50%;
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
  top: 10%; left: 50%;
  z-index: 13;
}
.pos-bom {
  top: 45%; left: 70%;
  rotate: -15deg; 
  scale: 0.25;
  z-index: 11;
}
.pos-lcd {
  top: 75%; left: 30%;
  rotate: 8deg; 
  scale: 0.25;
  z-index: 12;
}
.pos-scope {
  top: 30%; left: 25%;
  scale: 0.55;
  rotate: -5deg;
  z-index: 12;
}
.pos-resume {
  top: 70%; left: 80%;
  scale: 0.35;
  rotate: 8deg;
  z-index: 11;
}
.pos-card {
  top: 85%; left: 55%;
  scale: 0.25;
  rotate: -6deg;
  z-index: 14;
}
.pos-keyboard {
  top: 25%; left: 50%;
  scale: 0.4;
  rotate: 0deg;
  z-index: 16;
}
.pos-mouse { 
  top: 25%; left: 68%; 
  scale: 0.25; 
  rotate: -15deg; 
  z-index: 15; 
}

/* --- FOCUSED STATE OVERRIDES --- */
.desk-item[is-focused="true"],
.desk-item.focused {
  top: 50% !important;
  left: 50% !important;
  scale: 1 !important; 
  rotate: 0deg !important;
  z-index: 100 !important;
  cursor: default;
}
.desk-item.focused:is(.pos-bom, .pos-resume) { 
  translate: -50% -50% !important;
}

@media (max-width: 768px) {
  .pos-monitor { top: 10%; }
  .pos-keyboard { top: 20%; scale: 0.4; }
  .pos-mouse    { top: 20%; left: 68%; scale: 0.2; rotate: -12deg; }
  .pos-bom     { top: 40%; left: 25%; scale: 0.25; }
  .pos-resume  { top: 70%; left: 75%; scale: 0.25; }
  .pos-lcd     { top: 75%; left: 30%; scale: 0.35; }
  .pos-scope   { top: 35%; left: 75%; scale: 0.35; }
  .pos-card    { top: 85%; left: 55%; scale: 0.15; }
}

@media (max-width: 480px) {
  .pos-keyboard { top: 20%; scale: 0.3; }
  .pos-mouse    { top: 20%; left: 68%; scale: 0.15; rotate: -8deg; }
  .pos-bom     { top: 45%; left: 30%; scale: 0.2; rotate: -5deg; }
  .pos-resume  { top: 75%; left: 70%; scale: 0.2; rotate: 5deg; }
  .pos-lcd     { top: 80%; left: 30%; scale: 0.25; }
  .pos-scope   { top: 40%; left: 70%; scale: 0.25; }
  .pos-card    { top: 88%; left: 55%; scale: 0.10; rotate: 4deg; }
}

.desk-item:not(.focused)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  cursor: pointer;
  border-radius: inherit;
}
.desk-item:not(.focused) {
  user-select: none;
  -webkit-user-drag: none;
}
</style>