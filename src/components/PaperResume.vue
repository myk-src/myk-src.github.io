<template>
  <section 
    class="physical-object paper-resume" 
    :class="{ 'focused': isFocused, 'folded': !isFocused }"
  >
    <!-- A metal clipboard clip at the top for visual flavor -->
    <div class="clipboard-clip"></div>
    
    <div class="resume-content-wrapper">
      <ResumeContent />
    </div>
    
    <!-- Fades out the bottom text when folded on the desk -->
    <div class="fold-crease" v-if="!isFocused"></div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, shallowRef, provide } from 'vue';

import resumeData from '@/data/resume.json';

import type { Resume } from '@/utils/types';

const ResumeContent = defineAsyncComponent(() => import('@/components/ResumeContent.vue'));
defineProps<{ isFocused: boolean }>();
const resumes = shallowRef<Resume[]>([]);
resumes.value = resumeData as Resume[];
provide('resumes', resumes);
</script>

<style scoped>
.physical-object { width: 65vw; height: 90vh; }

.paper-resume { 
  background-color: #faf9f6; /* Warm off-white paper color */
  padding: 50px 40px; 
  position: relative; 
  border-radius: 2px; 
  box-shadow: 5px 10px 15px rgba(0,0,0,0.5); 
  
  /* Smooth animation between folded and unfolded states */
  transition: max-height 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
  max-height: 2000px; /* Fully expanded */
  overflow-y: auto;
  scrollbar-width: none; /* Hide scrollbar for a cleaner physical look */
}

/* FOLDED STATE (When sitting on the desk) */
.paper-resume.folded {
  max-height: 180px;
  box-shadow: 5px 10px 15px rgba(0,0,0,0.5), 0 15px 10px -10px rgba(0,0,0,0.4);
  overflow: hidden;
}

.clipboard-clip {
  position: absolute;
  top: 0; 
  left: 50%; 
  transform: translateX(-50%);
  width: 100px; 
  height: 25px;
  background: linear-gradient(to bottom, #ddd, #888);
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.4), inset 0 -2px 2px rgba(0,0,0,0.2);
  z-index: 10;
}

.fold-crease {
  position: absolute;
  bottom: 0; 
  left: 0; 
  right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(250, 249, 246, 1) 0%, rgba(250, 249, 246, 0) 100%);
  pointer-events: none;
}

/* 
  =========================================
  OVERRIDE THE TERMINAL STYLES
  We use :deep() to force the imported Terminal
  component to look like ink on printed paper.
  ========================================= 
*/
.resume-content-wrapper :deep(*) {
  color: #333 !important;
  text-shadow: none !important;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  line-height: 1.5;
}

.resume-content-wrapper :deep(#headers),
.resume-content-wrapper :deep(h1),
.resume-content-wrapper :deep(h2),
.resume-content-wrapper :deep(h3) {
  color: #000 !important;
  font-weight: 700 !important;
  border-bottom: 1px solid #ccc !important;
  margin-top: 1.5em;
  padding-bottom: 0.2em;
}

.resume-content-wrapper :deep(a) {
  color: #0056b3 !important;
  text-decoration: underline;
}

.resume-content-wrapper :deep(ul) {
  padding-left: 20px;
}
</style>