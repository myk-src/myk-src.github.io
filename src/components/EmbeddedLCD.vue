<template>
  <section class="physical-object embedded-lcd" v-if="resume">
    <div class="pcb-substrate">
      <div class="mounting-hole tl"></div>
      <div class="mounting-hole tr"></div>
      <div class="mounting-hole bl"></div>
      <div class="mounting-hole br"></div>
      
      <div class="lcd-bezel">
        <div class="lcd-screen">
          <div class="scanline"></div>
<pre><code><span class="kw">module</span> <span class="fn">myk_system_arch</span> (
  <span class="kw">input</span>  clk,
  <span class="kw">output</span> [31:0] degree
);

<span class="comment">// DEVELOPER: {{ resume.name }}</span>
<span class="comment">// EDUCATION: {{ resume.education.school }} </span>
<span class="comment">// CONCENTRATION: {{ concentrationText }}</span>

<span class="kw">always</span> @(<span class="kw">posedge</span> clk) <span class="kw">begin</span>
  degree &lt;= <span class="str">"HW/SW Solutions"</span>;
<span class="kw">end</span>
<span class="kw">endmodule</span></code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';

import type { Resume } from '@/utils/types';

const resumes = inject<Ref<Resume[]>>('resumes');
const resume = computed(() => resumes?.value?.[0]);

const concentrationText = computed(() => {
  if (!resume.value) return '';
  const conc = resume.value.education.major[0].concentration;
  if (conc.length <= 1) return conc.join('');
  return `${conc.slice(0, -1).join(', ')}${conc.length > 2 ? ',' : ''} and ${conc.slice(-1)}`;
});
</script>

<style scoped>
.physical-object {
  box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
  transition: transform 0.3s ease;
  max-width: 600px;
  width: 100%;
}
.embedded-lcd { background-color: #1a472a; padding: 20px; border-radius: 8px; border: 1px solid #0d2616; }
.pcb-substrate { position: relative; }
.mounting-hole {
  position: absolute; width: 12px; height: 12px; background-color: #2b453a;
  border-radius: 50%; border: 2px solid #c7a76c; box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
}
.tl { top: -10px; left: -10px; }
.tr { top: -10px; right: -10px; }
.bl { bottom: -10px; left: -10px; }
.br { bottom: -10px; right: -10px; }
.lcd-bezel { background-color: #111; padding: 10px; border-radius: 4px; box-shadow: inset 0 0 10px #000; }
.lcd-screen {
  background-color: #8bb381; color: #1a2e15; padding: 12px; font-family: 'Space Mono', monospace;
  font-size: 0.85rem; box-shadow: inset 0 0 8px rgba(0,0,0,0.5); position: relative; overflow: hidden;
}
.lcd-screen pre { margin: 0; line-height: 1.4; }
.kw { font-weight: bold; } 
.str { font-style: italic; } 
.comment { opacity: 0.7; }
</style>