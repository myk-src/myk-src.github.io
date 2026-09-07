<template>
  <section class="physical-object paper-bom" v-if="resume">
    <div class="paper-clip"></div>
    <div class="bom-header">
      <h2>BILL OF MATERIALS</h2>
      <div class="bom-meta">
        <span><strong>Proj:</strong> {{ resume.name.toUpperCase() }}</span>
        <span><strong>Date:</strong> 2026.09</span>
        <span><strong>Rev:</strong> 1.0</span>
      </div>
    </div>
    
    <table class="bom-table">
      <thead>
        <tr>
          <th>ITEM</th>
          <th>REF</th>
          <th>CATEGORY</th>
          <th>DESCRIPTION (SKILL)</th>
          <th>QTY (PROF)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(skill, index) in formattedSkills" :key="index" class="bom-row">
          <td>{{ (index + 1).toString().padStart(2, '0') }}</td>
          <td class="refdes">{{ skill.ref }}</td>
          <td>{{ skill.category.toUpperCase() }}</td>
          <td class="value">{{ skill.name }}</td>
          <td class="qty">
            <span class="pen-box" v-for="n in 5" :key="n" :class="{ filled: n <= Math.ceil(skill.proficiency / 20) }"></span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="coffee-stain"></div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';

import type { Resume } from '@/utils/types';

const resumes = inject<Ref<Resume[]>>('resumes');
const resume = computed(() => resumes?.value?.[0]);

const formattedSkills = computed(() => {
  if (!resume.value?.skills?.hard_skills) return [];
  const bom: any[] = [];
  const refPrefixes = ['U', 'J', 'R', 'C']; 
  let categoryIndex = 0;

  for (const [category, skills] of Object.entries(resume.value.skills.hard_skills)) {
    const prefix = refPrefixes[categoryIndex % refPrefixes.length];
    let counter = 1;
    (skills as any[]).forEach(skill => {
      bom.push({
        ref: `${prefix}${counter++}00`,
        category: category,
        name: skill.name,
        proficiency: skill.proficiency
      });
    });
    categoryIndex++;
  }
  return bom;
});

</script>

<style scoped>
.physical-object {
  box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
  transition: transform 0.3s ease;
  max-width: 600px;
  width: 100%;
}
.paper-bom {
  background-color: #f4f1ea;
  color: #222;
  font-family: 'Courier New', Courier, monospace;
  padding: 30px;
  position: relative;
  transform: rotate(-1.5deg);
  border-radius: 2px;
}
.paper-bom:hover { transform: rotate(0deg) scale(1.02); }
.paper-clip {
  position: absolute; top: -10px; left: 40px; width: 15px; height: 40px;
  border: 2px solid #888; border-radius: 10px; background: transparent; box-shadow: 2px 2px 2px rgba(0,0,0,0.2); z-index: 5;
}
.bom-header { border-bottom: 2px solid #222; margin-bottom: 16px; padding-bottom: 8px; }
.bom-header h2 { margin: 0; font-size: 1.2rem; font-weight: bold; letter-spacing: 1px; }
.bom-meta { display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 8px; }
.bom-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.bom-table th { border-bottom: 1px solid #222; padding: 4px; text-align: left; }
.bom-table td { padding: 4px; border-bottom: 1px dashed #ccc; }
.bom-row:hover { background-color: rgba(0,0,0,0.05); }
.refdes { font-weight: bold; }
.pen-box {
  display: inline-block; width: 10px; height: 10px; border: 1px solid #222; margin-right: 2px; border-radius: 1px;
}
.pen-box.filled { background-color: #2b3a5c; }
.coffee-stain {
  position: absolute; bottom: 20px; right: 20px; width: 80px; height: 80px;
  border-radius: 50%; border: 4px solid rgba(139, 69, 19, 0.15); pointer-events: none;
}
</style>