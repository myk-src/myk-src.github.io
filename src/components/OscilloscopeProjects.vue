<template>
  <section class="physical-object" :class="{ 'focused': isFocused }">
    
    <!-- STATE 1: TOP DOWN VIEW (Unfocused) -->
    <div v-if="!isFocused" class="oscope-topdown">
      <div class="handle"></div>
      <div class="vents"></div>
      <div class="brand">MYK-OSC</div>
    </div>

    <!-- STATE 2: FRONT PANEL (Focused) -->
    <div v-else class="oscilloscope-front">
      <div class="oscope-panel">
        
        <div class="oscope-screen-bezel">
          <div class="oscope-screen">
            <div class="oscope-grid"></div>
            
            <div class="ch-label">CH{{activeProjectIndex + 1}}: {{ activeProject.name }}</div>
            <div class="ch-data">TECH: {{ activeProject.skills?.join(' | ') }}</div>
            
            <div class="dynamic-wave">
              <svg viewBox="0 0 400 100" preserveAspectRatio="none">
                <polyline :points="generateWaveform(activeProjectIndex)" fill="none" stroke="#00ff00" stroke-width="2" />
              </svg>
            </div>
            
            <!-- Page Indicator -->
            <div class="desc-indicator">
              PAGE [{{ activeDescIndex + 1 }}/{{ activeProject.description?.length }}]
            </div>

            <!-- Autoscrolling Description -->
            <div class="project-desc-container" ref="descContainer">
              {{ currentDescription }}
            </div>
          </div>
        </div>

        <div class="oscope-controls">
          <div class="control-group">
            <div class="dial"><div class="dial-indicator" :style="{ transform: `rotate(${activeProjectIndex * 45}deg)` }"></div></div>
            <span>TIME/DIV</span>
          </div>
          <div class="button-group">
            <button class="hw-btn" @click.stop="prevProject">◀ CH-</button>
            <button class="hw-btn" @click.stop="nextProject">CH+ ▶</button>
            <button class="hw-btn" @click.stop="nextDesc">INFO ⏏</button>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import type { Resume, Project } from '@/utils/types.js';

const props = defineProps<{ resume: Resume, isFocused: boolean }>();

const activeProjectIndex = ref(0);
const activeDescIndex = ref(0);
const descContainer = ref<HTMLElement | null>(null);
let scrollInterval: ReturnType<typeof setInterval>;

const sortedProjects = computed(() => {
  if (!props.resume?.projects) return [];
  return [...props.resume.projects].sort((a: Project, b: Project) => {
    if (a.date === 'Ongoing') return -1;
    if (b.date === 'Ongoing') return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});

const activeProject = computed(() => sortedProjects.value[activeProjectIndex.value] || {});
const currentDescription = computed(() => activeProject.value.description?.[activeDescIndex.value] || '');

// --- Navigation ---
const nextProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value + 1) % sortedProjects.value.length;
};

const prevProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value - 1 + sortedProjects.value.length) % sortedProjects.value.length;
};

const nextDesc = () => {
  if (activeProject.value.description) {
    if (activeProject.value.description.length === 0) {
      activeDescIndex.value = 0;
    } else {
      activeDescIndex.value = (activeDescIndex.value + 1) % activeProject.value.description.length;
    }
  }
};

// Reset description view and scrollbar when changing projects/pages
watch([activeProjectIndex, activeDescIndex], () => {
  if (activeProjectIndex.value !== activeProjectIndex.value) {
    activeDescIndex.value = 0; // Reset to page 1 on new project
  }
  if (descContainer.value) {
    descContainer.value.scrollTop = 0;
  }
});

// --- Hardware Autoscroll Logic ---
let isWaiting = false;

onMounted(() => {
  scrollInterval = setInterval(() => {
    if (!descContainer.value || isWaiting) return;
    const el = descContainer.value;
    
    // Only scroll if text overflows the container
    if (el.scrollHeight > el.clientHeight) {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        // Reached the bottom: Pause, then reset to top
        isWaiting = true;
        setTimeout(() => {
          if (descContainer.value) descContainer.value.scrollTop = 0;
          isWaiting = false;
        }, 2000);
      } else {
        el.scrollTop += 1;
      }
    }
  }, 60); // Speed of scroll
});

onUnmounted(() => {
  clearInterval(scrollInterval);
});

// --- Waveform Generator ---
const generateWaveform = (index: number) => {
  const seed = (index + 1) * 17;
  let points = "0,50 ", x = 0;
  for (let i = 0; i < 8; i++) {
    const isHigh = (seed >> i) & 1;
    points += `${x},${isHigh ? 20 : 80} ${x += 50},${isHigh ? 20 : 80} `;
  }
  return points + "400,50";
};
</script>

<style scoped>
/* Top Down View */
.oscope-topdown {
  width: 20vw; height: 13vw;
  background: #d1d5d1;
  border-radius: 8px;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.6), inset -2px -2px 10px rgba(0,0,0,0.1);
  position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 5% 0;
}
.handle { width: 60%; height: 2vw; background: #999; border-radius: 10px; box-shadow: 0 10px 15px rgba(0,0,0,0.5); border: 1px solid #777; }
.vents { width: 80%; height: 10vw; background-image: repeating-linear-gradient(0deg, #333, #333 2px, transparent 2px, transparent 7px); opacity: 0.5; }
.brand { font-family: sans-serif; font-weight: bold; color: #555; }

/* Front View */
.oscilloscope-front {
  width: 80vw;
  height: 50vw;
  background-color: #d1d5d1; padding: 10px; border-radius: 12px; border: 1px solid #aaa;
  box-shadow: inset -2px -2px 10px rgba(0,0,0,0.1), 10px 10px 30px rgba(0,0,0,0.8);
  display: flex;
}
@media (min-width: 768px) {
  .oscilloscope-front {
    width: 70vw;
    height: 44vw;
    background-color: #d1d5d1; padding: 10px; border-radius: 12px; border: 1px solid #aaa;
    box-shadow: inset -2px -2px 10px rgba(0,0,0,0.1), 10px 10px 30px rgba(0,0,0,0.8);
    display: flex;
  }
}
.oscope-panel { flex-grow: 1; display: flex; background-color: #222; border-radius: 8px; padding: 20px; gap: 20px; align-items: center; }
.oscope-screen-bezel { height: 100%; flex-grow: 1; display: flex; background-color: #111; padding: 15px; border-radius: 16px; border: 2px solid #444; box-shadow: inset 0 0 15px #000; }
.oscope-screen { flex-grow: 1; background-color: #051a05; border-radius: 8px; position: relative; overflow: hidden; color: #00ff00; font-family: monospace; padding: 10px; }
.oscope-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0, 255, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px); background-size: 25px 25px; pointer-events: none; }
.ch-label { position: relative; font-weight: bold; z-index: 2; text-shadow: 0 0 5px #0f0; }
.ch-data { position: relative; font-size: 70%; opacity: 0.8; z-index: 2; margin-bottom: 10px; }
/* Autoscroll Description Container */
.desc-indicator { position: absolute; bottom: calc(3.6em + 12px); left: 10px; font-size: 65%; opacity: 0.8; z-index: 2; }
.project-desc-container { 
  position: absolute; 
  bottom: 10px; 
  left: 10px; 
  width: 80%;
  font-size: 75%; 
  line-height: 1.2em;
  max-height: 3.6em; /* Exactly 3 lines */
  overflow-y: auto;
  z-index: 2; 
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  /* Feather the bottom edge so text fades out instead of cutting off sharply */
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}
.project-desc-container::-webkit-scrollbar { display: none; /* Chrome/Safari */ }

@media (max-width: 480px) { .dynamic-wave { display: none; } }
.dynamic-wave { position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); height: 10vw; width: 100%; }
.dynamic-wave svg { width: 100%; height: 100%; filter: drop-shadow(0 0 3px #0f0); }
.oscope-controls { display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100px; }
.control-group { display: flex; flex-direction: column; align-items: center; color: #ccc; font-size: 60%; font-family: sans-serif; }
.dial { width: 5em; height: 5em; background: radial-gradient(circle, #555, #222); border-radius: 50%; border: 2px solid #111; box-shadow: 0 4px 6px rgba(0,0,0,0.8); position: relative; margin-bottom: 5px; }
.dial-indicator { position: absolute; top: 4px; left: 50%; width: 2px; height: 10px; background-color: #fff; transform-origin: 0 16px; transition: transform 0.3s; }
.button-group { display: flex; flex-direction: column; gap: 10px; width: 100%; }
.hw-btn { background: linear-gradient(to bottom, #ddd, #999); border: 1px solid #444; border-radius: 4px; padding: 8px 0; font-weight: bold; font-size: 70%; cursor: pointer; box-shadow: 0 4px 0 #555; }
.hw-btn:active { transform: translateY(4px); box-shadow: 0 0 0 #555; }
</style>