<template>
  <section class="physical-object oscilloscope" v-if="resume">
    <div class="oscope-panel">
      <!-- Screen Area -->
      <div class="oscope-screen-bezel">
        <div class="oscope-screen">
          <div class="oscope-grid"></div>
          
          <div class="ch-label">CH1: {{ activeProject.name }}</div>
          <div class="ch-data">TECH: {{ activeProject.skills?.join(' | ') }}</div>
          
          <div class="dynamic-wave">
            <svg viewBox="0 0 400 100" preserveAspectRatio="none">
              <polyline 
                :points="generateWaveform(activeProjectIndex)" 
                fill="none" 
                stroke="#00ff00" 
                stroke-width="2"
                stroke-linejoin="miter"
              />
            </svg>
          </div>
          
          <div class="project-desc">{{ activeProject.description?.[0] }}</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="oscope-controls">
        <div class="control-group">
          <div class="dial">
            <div class="dial-indicator" :style="{ transform: `rotate(${activeProjectIndex * 45}deg)` }"></div>
          </div>
          <span>TIME/DIV</span>
        </div>
        
        <div class="button-group">
          <button class="hw-btn" @click="prevProject" :class="{ pressed: isPrevPressed }" @mousedown="isPrevPressed = true" @mouseup="isPrevPressed = false" @mouseleave="isPrevPressed = false">◀ CH-</button>
          <button class="hw-btn" @click="nextProject" :class="{ pressed: isNextPressed }" @mousedown="isNextPressed = true" @mouseup="isNextPressed = false" @mouseleave="isNextPressed = false">CH+ ▶</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue';

import type { Project, Resume } from '@/utils/types';

const resumes = inject<Ref<Resume[]>>('resumes');
const resume = computed(() => resumes?.value?.[0]);

const activeProjectIndex = ref(0);
const isPrevPressed = ref(false);
const isNextPressed = ref(false);

const sortedProjects = computed(() => {
  if (!resume?.value?.projects) return [];
  return [...resume.value.projects].sort((a: Project, b: Project) => {
    if (a.date === 'Ongoing') return -1;
    if (b.date === 'Ongoing') return 1;
    let computed = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (computed !== 0) return computed;
    return a.name.localeCompare(b.name);
  });
});

const activeProject = computed(() => sortedProjects.value[activeProjectIndex.value] || {});

const nextProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value + 1) % sortedProjects.value.length;
};

const prevProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value - 1 + sortedProjects.value.length) % sortedProjects.value.length;
};

const generateWaveform = (index: number) => {
  const seed = (index + 1) * 17;
  let points = "0,50 ";
  let x = 0;
  for (let i = 0; i < 8; i++) {
    const isHigh = (seed >> i) & 1;
    const y = isHigh ? 20 : 80;
    const nextX = x + 50;
    points += `${x},${y} ${nextX},${y} `;
    x = nextX;
  }
  return points + "400,50";
};
</script>

<style scoped>
.physical-object {
  box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
  transition: transform 0.3s ease;
  max-width: 600px;
  width: 100%;
}
.oscilloscope {
  background-color: #d1d5d1; padding: 10px; border-radius: 12px; border: 1px solid #aaa;
  box-shadow: inset -2px -2px 10px rgba(0,0,0,0.1), 10px 10px 20px rgba(0,0,0,0.5);
}
.oscope-panel { background-color: #222; border-radius: 8px; padding: 20px; display: flex; gap: 20px; align-items: center; }
.oscope-screen-bezel {
  flex-grow: 1; background-color: #111; padding: 15px; border-radius: 16px; border: 2px solid #444; box-shadow: inset 0 0 15px #000;
}
.oscope-screen {
  height: 200px; background-color: #051a05; border-radius: 8px; position: relative; overflow: hidden;
  color: #00ff00; font-family: monospace; padding: 10px;
}
.oscope-grid {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background-image: linear-gradient(rgba(0, 255, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px);
  background-size: 25px 25px; pointer-events: none;
}
.ch-label { position: relative; font-weight: bold; z-index: 2; text-shadow: 0 0 5px #0f0; }
.ch-data { position: relative; font-size: 0.7rem; opacity: 0.8; z-index: 2; margin-bottom: 10px; }
.project-desc { position: absolute; bottom: 10px; left: 10px; font-size: 0.75rem; max-width: 80%; z-index: 2; }
.dynamic-wave { position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); height: 100px; width: 100%; }
.dynamic-wave svg { width: 100%; height: 100%; filter: drop-shadow(0 0 3px #0f0); }
.oscope-controls { display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100px; }
.control-group { display: flex; flex-direction: column; align-items: center; color: #ccc; font-size: 0.6rem; font-family: sans-serif; }
.dial {
  width: 40px; height: 40px; background: radial-gradient(circle, #555, #222); border-radius: 50%;
  border: 2px solid #111; box-shadow: 0 4px 6px rgba(0,0,0,0.8); position: relative; margin-bottom: 5px;
}
.dial-indicator {
  position: absolute; top: 4px; left: 50%; width: 2px; height: 10px; background-color: #fff;
  transform-origin: 0 16px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.button-group { display: flex; flex-direction: column; gap: 10px; width: 100%; }
.hw-btn {
  background: linear-gradient(to bottom, #ddd, #999); border: 1px solid #444; border-radius: 4px;
  padding: 8px 0; font-weight: bold; font-size: 0.7rem; color: #111; cursor: pointer;
  box-shadow: 0 4px 0 #555, 0 5px 5px rgba(0,0,0,0.5); transition: all 0.1s;
}
.hw-btn:active, .hw-btn.pressed { transform: translateY(4px); box-shadow: 0 0 0 #555, 0 1px 2px rgba(0,0,0,0.5); }
</style>