<template>
  <div class="workbench-mat">
    <div class="hw-scroll-area">
      
      <PaperBOM />
      <EmbeddedLCD />
      <PhysicalPCB />
      <OscilloscopeProjects />

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, shallowRef, onMounted, provide } from 'vue';

import resumeData from '@/data/resume.json';

import type { Resume } from '@/utils/types.js';

const PaperBOM = defineAsyncComponent(() => import('@/components/PaperBOM.vue'));
const EmbeddedLCD = defineAsyncComponent(() => import('@/components/EmbeddedLCD.vue'));
const PhysicalPCB = defineAsyncComponent(() => import('@/components/PhysicalPCB.vue'));
const OscilloscopeProjects = defineAsyncComponent(() => import('@/components/OscilloscopeProjects.vue'));

const resumes = shallowRef<Resume[]>([]);

provide('resumes', resumes);

onMounted(() => {
  resumes.value = resumeData as Resume[];
});
</script>

<style scoped>
.workbench-mat {
  width: 100%;
  height: 100%;
  background-color: #2b453a; 
  /* Cutting mat grid lines */
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: inset 0 0 50px rgba(0,0,0,0.8);
  border-radius: 6px; /* Smooth corners for the main view */
}

.hw-scroll-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  scrollbar-width: thin;
}
</style>