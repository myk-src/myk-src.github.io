<template>
  <section class="physical-object physical-pcb" v-if="resume">
    <div class="silkscreen-logo">MYK-MB REV A</div>
    <div class="trace-timeline">
      
      <div 
        v-for="(exp, index) in resume.experience" 
        :key="index" 
        class="pcb-node"
        @mouseenter="hoveredExp = index"
        @mouseleave="hoveredExp = null"
      >
        <div class="pad-container">
          <div class="copper-pad" :class="{ 'active-pad': hoveredExp === index }">
            <div class="drill-hole">
              <div class="led" :class="{ 'led-on': hoveredExp === index }"></div>
            </div>
          </div>
          <div class="copper-trace" :class="{ 'active-trace': hoveredExp === index }" v-if="index !== resume.experience.length - 1"></div>
        </div>

        <div class="silkscreen-data" :class="{ 'active-silk': hoveredExp === index }">
          <div class="silk-ref">U{{ index + 1 }}00</div>
          <div class="silk-title">{{ exp.role }} @ {{ exp.company }}</div>
          <div class="silk-dates">
            {{ exp.start.replace('-','.') }} - {{ exp.end ? exp.end.replace('-','.') : 'Present' }}
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue';

import type { Resume } from '@/utils/types';

const resumes = inject<Ref<Resume[]>>('resumes');
const resume = computed(() => resumes?.value?.[0]);
const hoveredExp = ref<number | null>(null);
</script>

<style scoped>
.physical-object {
  box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
  transition: transform 0.3s ease;
  width: 100%;
}
.physical-pcb {
  background-color: #141b18; 
  background-image: radial-gradient(#2a3b33 1px, transparent 1px);
  background-size: 20px 20px;
  padding: 30px; border-radius: 6px; border: 2px solid #0a0e0c; position: relative;
}
.silkscreen-logo { position: absolute; top: 10px; right: 10px; color: #ffd166; font-family: monospace; font-weight: bold; font-size: 0.8rem; }
.trace-timeline { display: flex; flex-direction: column; }
.pcb-node { display: flex; min-height: 80px; cursor: pointer; }
.pad-container { width: 60px; display: flex; flex-direction: column; align-items: center; position: relative; }
.copper-pad {
  width: 24px; height: 24px; background-color: #c7a76c; border-radius: 50%;
  display: flex; justify-content: center; align-items: center; transition: all 0.2s ease;
}
.active-pad { background-color: #f4a261; box-shadow: 0 0 10px #f4a261; }
.drill-hole { width: 10px; height: 10px; background-color: #0a0e0c; border-radius: 50%; display: flex; justify-content: center; align-items: center; }
.led { width: 6px; height: 6px; background-color: #330000; border-radius: 50%; transition: all 0.2s ease; }
.led-on { background-color: #ff3333; box-shadow: 0 0 8px #ff0000, inset 0 0 2px #fff; }
.copper-trace {
  width: 6px; flex-grow: 1; background-color: #8c4e3a; 
  background-image: repeating-linear-gradient(45deg, #8c4e3a, #8c4e3a 10px, #75402f 10px, #75402f 20px);
  transition: all 0.2s ease;
}
.active-trace { background-color: #e07a5f; }
.silkscreen-data { padding-left: 16px; padding-bottom: 24px; color: #a0a0a0; font-family: monospace; transition: all 0.2s ease; }
.active-silk { color: #ffd166; transform: translateX(5px); }
.silk-ref { font-weight: bold; border: 1px solid currentColor; padding: 2px 6px; display: inline-block; margin-bottom: 4px;}
.silk-title { font-weight: bold; margin-bottom: 4px;}
.silk-dates { font-size: 0.75rem; opacity: 0.8; }
</style>