<template>
  <section 
    class="physical-object paper-bom" 
    :class="{ 'focused': isFocused, 'folded': !isFocused }"
  >
    <div class="paper-clip"></div>
    
    <div class="bom-header">
      <h2>BILL OF MATERIALS</h2>
      <div class="bom-meta">
        <span><strong>Proj:</strong> {{ resume.name.toUpperCase() }}</span>
        <span><strong>Date:</strong> {{ systemInfo.get('version')?.replace('v', '') }}</span>
      </div>
    </div>
    
    <table class="bom-table">
      <thead>
        <tr>
          <th>ITEM</th><th>REF</th><th>CATEGORY</th><th>DESCRIPTION</th><th>PROFICIENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(skill, index) in formattedSkills" :key="index" class="bom-row">
          <td>{{ (index + 1).toString().padStart(2, '0') }}</td>
          <td class="refdes">{{ skill.ref }}</td>
          <td>{{ skill.category.toUpperCase() }}</td>
          <td class="value">{{ skill.name }}</td>
          <td class="qty">
            <span class="pen-box" v-for="n in 10" :key="n" :class="{ filled: n <= Math.ceil(skill.proficiency / 10) }"></span>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="coffee-stain"></div>
    
    <!-- This overlay creates the illusion of a paper fold -->
    <div class="fold-crease" v-if="!isFocused"></div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Resume } from '@/utils/types.js';
import { systemInfo } from '@/utils/system.js';

const props = defineProps<{ resume: Resume, isFocused: boolean }>();

const formattedSkills = computed(() => {
  if (!props.resume?.skills?.hard_skills) return [];
  const bom: any[] = [];
  const refPrefixes = ['U', 'J', 'R', 'C']; 
  let categoryIndex = 0;
  for (const [category, skills] of Object.entries(props.resume.skills.hard_skills)) {
    const prefix = refPrefixes[categoryIndex % refPrefixes.length];
    let counter = 1;
    (skills as any[]).forEach(skill => {
      bom.push({ ref: `${prefix}${counter++}00`, category, name: skill.name, proficiency: skill.proficiency });
    });
    categoryIndex++;
  }
  return bom;
});
</script>

<style scoped>
.physical-object { width: 90%; }

.paper-bom { 
  background-color: #f4f1ea; 
  color: #222; 
  font-family: 'Courier New', Courier, monospace; 
  padding: 3em; 
  position: relative; 
  border-radius: 2px; 
  box-shadow: 5px 10px 15px rgba(0,0,0,0.5); 
  
  /* Smooth animation between folded and unfolded states */
  transition: max-height 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
}

.paper-bom.focused {
  max-height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* Adjusts the shadow to look like the paper is folded under itself */
  box-shadow: 5px 10px 15px rgba(0,0,0,0.5), 0 15px 10px -10px rgba(0,0,0,0.4);
}
.paper-bom.focused::-webkit-scrollbar { display: none; } /* Hide scrollbar for Chrome, Safari and Opera */

/* FOLDED STATE (When sitting on the desk) */
.paper-bom.folded {
  max-height: 50vw;
  /* Adjusts the shadow to look like the paper is folded under itself */
  box-shadow: 5px 10px 15px rgba(0,0,0,0.5), 0 15px 10px -10px rgba(0,0,0,0.4);
  overflow: hidden;
}

/* The actual fold styling */
.fold-crease {
  position: absolute;
  bottom: 0; 
  left: 0; 
  right: 0;
  height: 2.5vw;
  background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.4) 40%, transparent 100%);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  pointer-events: none;
}

.paper-clip { position: absolute; top: -10px; left: 40px; width: 15px; height: 40px; border: 2px solid #888; border-radius: 10px; box-shadow: 2px 2px 2px rgba(0,0,0,0.2); }
.bom-header { border-bottom: 2px solid #222; margin-bottom: 16px; padding-bottom: 8px; }
.bom-header h2 { margin: 0; font-size: 150%; font-weight: bold; }
.bom-meta { display: flex; justify-content: space-between; margin-top: 8px; }

.bom-table { width: 100%; border-collapse: collapse; font-size: 90%; }
.bom-table th { border-bottom: 1px solid #222; padding: 4px; text-align: left; }
.bom-table td { padding: 4px; border-bottom: 1px dashed #ccc; }
.refdes { font-weight: bold; }
.pen-box { display: inline-block; width: .6vw; height: .6vw; border: 1px solid #222; margin-right: 2px; }
.pen-box.filled { background-color: #2b3a5c; }
.coffee-stain { position: absolute; bottom: 30px; right: 20px; width: 80px; height: 80px; border-radius: 50%; border: 4px solid rgba(139, 69, 19, 0.15); pointer-events: none; }
</style>