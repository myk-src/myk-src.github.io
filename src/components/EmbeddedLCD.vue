<template>
  <section class="physical-object breadboard-assembly" :class="{ 'focused': isFocused }">
    
    <div class="breadboard">
      
      <!-- Power Rail (Red) -->
      <div class="power-rail red-rail">
        <div class="hole" v-for="n in 30" :key="'r'+n"></div>
      </div>
      
      <div class="breadboard-body">
        <!-- The Embedded LCD sits plugged into the breadboard -->
        <div class="embedded-lcd">
          <div class="lcd-bezel">
            <div class="lcd-screen">
              <div class="scanline"></div>
<pre><code><span class="kw">module</span> <span class="fn">myk_system_arch</span> (
  <span class="kw">input</span>  clk,
  <span class="kw">output</span> [31:0] degree
);

<span class="comment">// DEVELOPER:     {{ resume.name }}</span>
<span class="comment">// EDUCATION:     {{ resume.education.school }} </span>
<span class="comment">// MAJOR:         {{ resume.education.major[0].name }}</span>
<span class="comment">// CONCENTRATION: {{ resume.education.major[0].concentration[0] }}</span>
<span class="comment">//                {{ resume.education.major[0].concentration[1] }}</span>
<span class="comment">// MINORS:        {{ resume.education.minors[0] }}</span>
<span class="comment">//                {{ resume.education.minors[1] }}</span>
<span class="comment">//                {{ resume.education.minors[2] }}</span>

<span class="kw">always</span> @(<span class="kw">posedge</span> clk) <span class="kw">begin</span>
  degree &lt;= <span class="str">"HW/SW Solutions"</span>;
<span class="kw">end</span>
<span class="kw">endmodule</span></code></pre>
            </div>
          </div>
          <div class="pins top-pins"><div class="pin" v-for="n in 10" :key="'pt'+n"></div></div>
          <div class="pins bottom-pins"><div class="pin" v-for="n in 10" :key="'pb'+n"></div></div>
        </div>

        <!-- Visible empty breadboard holes -->
        <div class="hole-grid">
          <div class="hole-col" v-for="c in 10" :key="'c'+c">
            <div class="hole" v-for="r in 10" :key="'h'+r"></div>
          </div>
        </div>
      </div>

      <!-- Power Rail (Blue) -->
      <div class="power-rail blue-rail">
        <div class="hole" v-for="n in 30" :key="'b'+n"></div>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Resume } from '@/utils/types.js';

const props = defineProps<{ resume: Resume, isFocused: boolean }>();

const concentrationText = computed(() => {
  if (!props.resume) return '';
  const conc = props.resume.education.major[0].concentration || [];
  return conc.length <= 1 ? conc.join('') : `${conc.slice(0, -1).join(', ')} and ${conc.slice(-1)}`;
});
</script>

<style scoped>
.physical-object { width: 75vw; }

.breadboard {
  background-color: #f2f2f2;
  border-radius: 6px;
  box-shadow: 5px 10px 20px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.8);
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
}

.power-rail {
  display: flex; justify-content: space-between; padding: 5px 10px;
}
.red-rail { border-top: 2px solid #e74c3c; }
.blue-rail { border-bottom: 2px solid #3498db; }

.hole {
  width: 8px; height: 8px;
  background-color: #444; border-radius: 1px;
  box-shadow: inset 1px 1px 2px #000, 1px 1px 1px #fff;
}

.breadboard-body {
  position: relative;
  display: flex; justify-content: center; align-items: center;
  background-color: #eee; border-radius: 4px; padding: 20px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
}

.hole-grid {
  display: flex; gap: 15px; position: absolute; inset: 10px; z-index: 1; justify-content: space-around;
}
.hole-col { display: flex; flex-direction: column; gap: 8px; }

/* The LCD Module Placed ON the breadboard */
.embedded-lcd {
  background-color: #1a472a; padding: 15px; border-radius: 4px;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.6); position: relative; z-index: 2; width: 90%;
}
.lcd-bezel { background-color: #111; padding: 10px; border-radius: 4px; box-shadow: inset 0 0 10px #000; }
.lcd-screen { background-color: #8bb381; color: #1a2e15; padding: 12px; font-family: 'Space Mono', monospace; font-size: 80%; box-shadow: inset 0 0 8px rgba(0,0,0,0.5); }
.lcd-screen pre { margin: 0; line-height: 1.4; }
.kw { font-weight: bold; } .str { font-style: italic; } .comment { opacity: 0.7; }

/* Fake pins plugging into the board */
.pins { display: flex; justify-content: space-around; position: absolute; left: 20px; right: 20px; }
.top-pins { top: -8px; }
.bottom-pins { bottom: -8px; }
.pin { width: 4px; height: 16px; background: linear-gradient(90deg, #999, #eee, #999); border-radius: 2px; }
</style>