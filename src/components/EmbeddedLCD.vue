<template>
  <section class="physical-object breadboard-assembly" :class="{ 'focused': isFocused }">
    
    <div class="breadboard">
      
      <!-- Power Rail (Top) -->
      <div class="power-rail red-rail">
        <div class="hole" v-for="n in 30" :key="'r'+n"></div>
      </div>
      <div class="power-rail blue-rail">
        <div class="hole" v-for="n in 30" :key="'b'+n"></div>
      </div>
      
      <div class="breadboard-body">
        <!-- The Embedded LCD sits plugged into the breadboard -->
        <div class="embedded-lcd">
          <div class="pins top-pins"><div class="pin" v-for="n in 10" :key="'pt'+n"></div></div>
          <div class="lcd-bezel">
            <div class="lcd-screen">
              <div class="scanline"></div>
<pre><code><span class="kw">module</span> <span class="fn">myk_system_arch</span> (
  <span class="kw">input</span>  clk,
  <span class="kw">output</span> [31:0] degree
);

<span class="comment">// DEVELOPER:</span>
<span class="comment">//     > {{ resume.name }}</span>
<span class="comment">// EDUCATION:</span>
<span class="comment">//     > {{ resume.education.school }}</span>
<span class="comment">// MAJOR:</span>
<span class="comment">//     > {{ resume.education.major[0].name }}</span>
<span class="comment">// CONCENTRATIONS:</span>
<span class="comment">//     > {{ resume.education.major[0].concentration[0] }}</span>
<span class="comment">//     > {{ resume.education.major[0].concentration[1] }}</span>
<span class="comment">// MINORS:</span>
<span class="comment">//     > {{ resume.education.minors[0] }}</span>
<span class="comment">//     > {{ resume.education.minors[1] }}</span>
<span class="comment">//     > {{ resume.education.minors[2] }}</span>

<span class="kw">always</span> @(<span class="kw">posedge</span> clk) <span class="kw">begin</span>
  degree &lt;= <span class="str">"HW/SW Solutions"</span>;
<span class="kw">end</span>
<span class="kw">endmodule</span></code></pre>
            </div>
          </div>
          <div class="pins bottom-pins"><div class="pin" v-for="n in 10" :key="'pb'+n"></div></div>
        </div>
      </div>

      <!-- Power Rail (Bottom) -->
      <div class="power-rail red-rail">
        <div class="hole" v-for="n in 30" :key="'r'+n"></div>
      </div>
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
.physical-object { width: 75vw; min-height: 50vh; }

.breadboard {
  height: 100%; width: 100%;
  background-color: #f2f2f2;
  border-radius: 6px;
  box-shadow: 5px 10px 20px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.8);
  display: flex;
  flex-direction: column;
  padding: .5vw;
  gap: 1vw;
}

.power-rail {
  display: flex; justify-content: space-between; padding: .5vw 1vw;
}
.red-rail { border-top: .2vw solid #e74c3c; }
.blue-rail { border-bottom: .2vw solid #3498db; }

.hole {
  width: .8vw; height: .8vw;
  background-color: #444; border-radius: .1vw;
  box-shadow: inset .1vw .1vw .2vw #000, .1vw .1vw .1vw #fff;
}

.breadboard-body {
  height: 100%; width: 100%;
  position: relative;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
  background-color: #eee; border-radius: 4px; padding: 1vw .5vw;
  box-shadow: inset 0 0 1vw rgba(0,0,0,0.1);
}

.hole-grid {
  display: flex; gap: 1.5vw; position: absolute; inset: 10px; z-index: 1; justify-content: space-between;;
}
.hole-col { display: flex; flex-direction: column; justify-content: space-between; gap: 1.5vw; }

/* The LCD Module Placed ON the breadboard */
.embedded-lcd {
  background-color: #1a472a; padding: 1.5em; border-radius: 4px;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.6); position: relative; z-index: 2; width: 100%; height: 100%;
}
.lcd-bezel { height: 100%; background-color: #111; padding: 1vw; border-radius: 4px; box-shadow: inset 0 0 10px #000; }
.lcd-screen { height: 100%; background-color: #8bb381; color: #1a2e15; padding: 12px; font-family: 'Space Mono', monospace; font-size: 80%; box-shadow: inset 0 0 8px rgba(0,0,0,0.5); }
.lcd-screen pre { margin: 0; line-height: 1.4; }
.kw { font-weight: bold; } .str { font-style: italic; } .comment { opacity: 0.7; }

/* Fake pins plugging into the board */
.pins { display: flex; justify-content: space-between; position: relative; }
.top-pins { padding-bottom: 1.5vw; }
.bottom-pins { padding-top: 1.5vw; }
.pin { width: .8vw; height: .8vw; background: linear-gradient(90deg, #999, #eee, #999); border-radius: 2px; }
</style>