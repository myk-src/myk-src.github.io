<template>
  <section class="physical-object keyboard-collection" :class="{ 'focused': isFocused }">
    <transition name="hot-swap" mode="out-in">

      <!-- ==========================================
           KEYBOARD 1: 65% ALUMINUM CUSTOM
           ========================================== -->
      <div class="kb-wrapper kb-65" v-if="!isSplit" key="kb65">
        
        <!-- The Elegant Button: Coiled Aviator Cable -->
        <div class="cable clickable-cord" @click.stop="toggleKeyboard" title="Unplug to swap keyboard">
          <div class="coil"></div>
          <div class="aviator-connector">
            <div class="swap-led"></div>
          </div>
          <div class="straight-run"></div>
        </div>

        <!-- Aluminum Case -->
        <div class="alum-case">
          <div class="brass-weight-edge"></div>
          <div class="plate">
            <div class="row r1">
              <div class="key esc accent"><span>Esc</span></div>
              <div class="key num" v-for="n in 12" :key="'n'+n"></div>
              <div class="key backspace"><span>Bksp</span></div>
              <div class="dial-container"><div class="rotary-dial"></div></div>
            </div>
            <div class="row r2">
              <div class="key tab"><span>Tab</span></div>
              <div class="key alpha" v-for="n in 12" :key="'q'+n"></div>
              <div class="key slash"></div>
              <div class="key nav"><span>Del</span></div>
            </div>
            <div class="row r3">
              <div class="key caps"><span>Caps</span></div>
              <div class="key alpha" v-for="n in 11" :key="'a'+n"></div>
              <div class="key enter accent"><span>Enter</span></div>
              <div class="key nav"><span>PgU</span></div>
            </div>
            <div class="row r4">
              <div class="key shift-l"><span>Shift</span></div>
              <div class="key alpha" v-for="n in 10" :key="'z'+n"></div>
              <div class="key shift-r"><span>Shift</span></div>
              <div class="key nav"><span>Up</span></div>
              <div class="key nav"><span>PgD</span></div>
            </div>
            <div class="row r5">
              <div class="key ctrl"><span>Ctrl</span></div>
              <div class="key mod"><span>Win</span></div>
              <div class="key mod"><span>Alt</span></div>
              <div class="key spacebar"></div>
              <div class="key mod"><span>Alt</span></div>
              <div class="key mod"><span>Fn</span></div>
              <div class="key nav"><span>Lt</span></div>
              <div class="key nav"><span>Dn</span></div>
              <div class="key nav"><span>Rt</span></div>
            </div>
          </div>
        </div>
      </div>


      <!-- ==========================================
           KEYBOARD 2: SPLIT ERGO TRACKBALL
           ========================================== -->
      <div class="kb-wrapper kb-split" v-else key="kbsplit">
        
        <!-- The Elegant Button: Straight Aviator Host Cable -->
        <div class="host-cable clickable-cord" @click.stop="toggleKeyboard" title="Unplug to swap keyboard">
          <div class="straight-run-short"></div>
          <div class="aviator-connector dark">
            <div class="swap-led split-led"></div>
          </div>
          <div class="straight-run-long"></div>
        </div>

        <div class="trrs-cable">
          <svg viewBox="0 0 200 50">
            <path d="M10,25 C60,80 140,80 190,25" fill="none" stroke="#222" stroke-width="6" stroke-linecap="round"/>
            <path d="M10,25 C60,80 140,80 190,25" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="split-half left-half">
          <div class="fr4-plate">
            <div class="traces"></div>
            <div class="screws tl"></div> <div class="screws tr"></div>
            <div class="screws bl"></div> <div class="screws br"></div>
            
            <div class="oled-module">
              <span>QMK v0.21.0</span><span>> myk_ergo</span><span>> layer_0</span>
            </div>

            <div class="ergo-grid">
              <div class="col c1"><div class="key mod" v-for="n in 3" :key="'sl1'+n"></div></div>
              <div class="col c2"><div class="key alpha" v-for="n in 3" :key="'al2'+n"></div></div>
              <div class="col c3"><div class="key alpha" v-for="n in 3" :key="'al3'+n"></div></div>
              <div class="col c4"><div class="key alpha" v-for="n in 3" :key="'al4'+n"></div></div>
              <div class="col c5"><div class="key alpha" v-for="n in 3" :key="'al5'+n"></div></div>
              <div class="col c6"><div class="key mod" v-for="n in 3" :key="'sl6'+n"></div></div>
            </div>
            
            <div class="thumb-cluster left-thumbs">
              <div class="key thumb"></div><div class="key thumb accent split-accent"></div><div class="key thumb"></div>
            </div>
          </div>
        </div>

        <div class="split-half right-half">
          <div class="fr4-plate">
            <div class="traces"></div>
            <div class="screws tl"></div> <div class="screws tr"></div>
            <div class="screws bl"></div> <div class="screws br"></div>

            <div class="ergo-grid">
              <div class="col c6"><div class="key mod" v-for="n in 3" :key="'sr6'+n"></div></div>
              <div class="col c5"><div class="key alpha" v-for="n in 3" :key="'ar5'+n"></div></div>
              <div class="col c4"><div class="key alpha" v-for="n in 3" :key="'ar4'+n"></div></div>
              <div class="col c3"><div class="key alpha" v-for="n in 3" :key="'ar3'+n"></div></div>
              <div class="col c2"><div class="key alpha" v-for="n in 3" :key="'ar2'+n"></div></div>
              <div class="col c1"><div class="key mod" v-for="n in 3" :key="'sr1'+n"></div></div>
            </div>

            <div class="thumb-cluster right-thumbs">
              <div class="key thumb"></div><div class="key thumb accent split-accent"></div>
              <div class="trackball-housing"><div class="trackball"></div></div>
            </div>
          </div>
        </div>
      </div>

    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ isFocused: boolean }>();

const isSplit = ref(false);

const toggleKeyboard = () => {
  isSplit.value = !isSplit.value;
};
</script>

<style scoped>
.physical-object { 
  width: 600px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.kb-wrapper {
  position: absolute;
  display: flex;
}

/* 
  =========================================
  HOT SWAP ANIMATION
  ========================================= 
*/
.hot-swap-enter-active, .hot-swap-leave-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.hot-swap-enter-from { opacity: 0; transform: translateY(-40px) scale(0.95); }
.hot-swap-leave-to { opacity: 0; transform: translateY(40px) scale(0.95); }


/* 
  =========================================
  THE ELEGANT BUTTON (CABLES)
  ========================================= 
*/
.clickable-cord {
  cursor: pointer;
  z-index: 100000; /* Ensures it's clickable above the glass shield */
  pointer-events: auto;
  transition: filter 0.2s ease, transform 0.1s ease;
}

.clickable-cord:hover {
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.4)) brightness(1.2);
}

.clickable-cord:active .aviator-connector {
  transform: scale(0.95);
}

.aviator-connector { 
  width: 40px; height: 20px; 
  background: linear-gradient(0deg, #888, #ddd, #888); 
  border-radius: 4px; border-left: 2px solid #555; border-right: 2px solid #555; 
  box-shadow: 0 5px 10px rgba(0,0,0,0.5); 
  position: relative; margin: 0 5px; 
  transition: transform 0.1s ease;
}

.aviator-connector.dark { background: linear-gradient(0deg, #333, #666, #333); border-color: #111; }

.swap-led {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 6px; height: 6px; border-radius: 50%;
  background: #e06c75; box-shadow: 0 0 8px #e06c75;
}
.swap-led.split-led { background: #4ec9b0; box-shadow: 0 0 8px #4ec9b0; }

/* 65% Cable Setup */
.kb-65 .cable { position: absolute; top: -45px; left: 80px; display: flex; align-items: center; }
.coil { width: 150px; height: 16px; background: repeating-linear-gradient(90deg, #333, #333 4px, #111 4px, #111 6px); border-radius: 8px; box-shadow: 0 5px 10px rgba(0,0,0,0.5); }
.straight-run { width: 80px; height: 6px; background: #333; border-radius: 3px; box-shadow: 0 5px 5px rgba(0,0,0,0.5); }

/* Split Cable Setup */
.kb-split .host-cable { position: absolute; top: -50px; left: 40px; display: flex; align-items: center; transform: rotate(-10deg); }
.straight-run-short { width: 40px; height: 6px; background: #111; border-radius: 3px; box-shadow: 0 5px 5px rgba(0,0,0,0.5); }
.straight-run-long { width: 120px; height: 6px; background: #111; border-radius: 3px; box-shadow: 0 5px 5px rgba(0,0,0,0.5); }


/* 
  =========================================
  KEYBOARD 1: 65% CUSTOM
  ========================================= 
*/
.alum-case { background: #2a2c30; padding: 15px; border-radius: 12px; border-top: 1px solid #444; border-bottom: 6px solid #111; box-shadow: 10px 20px 30px rgba(0,0,0,0.8); position: relative; z-index: 2; width: 560px; box-sizing: border-box; }
.brass-weight-edge { position: absolute; bottom: 0; left: 10%; right: 10%; height: 3px; background: linear-gradient(90deg, #8a6c22, #d4af37, #8a6c22); border-radius: 2px; }
.plate { background: #151515; padding: 5px; border-radius: 6px; display: flex; flex-direction: column; gap: 4px; box-shadow: inset 0 0 10px #000; }
.row { display: flex; gap: 4px; }

/* The Keycaps */
.key { height: 36px; background: #3a3b3e; border-radius: 4px; position: relative; box-shadow: inset -2px -4px 6px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.1), 2px 4px 5px rgba(0,0,0,0.6); display: flex; justify-content: flex-start; align-items: flex-start; padding: 4px 6px; font-family: 'Helvetica Neue', sans-serif; font-size: 0.6rem; font-weight: bold; color: #a0a0a0; box-sizing: border-box; transition: all 0.1s; }
.key span { text-transform: uppercase; font-size: 0.5rem; letter-spacing: 0.5px; opacity: 0.8; }
.esc, .num, .alpha, .slash, .nav, .mod { width: 36px; flex-shrink: 0; }
.backspace { width: 56px; } .tab { width: 56px; } .caps { width: 66px; } .enter { width: 84px; } .shift-l { width: 84px; } .shift-r { width: 66px; } .ctrl { width: 46px; } .spacebar { flex-grow: 1; }
.accent { background: #e06c75; color: #fff; box-shadow: inset -2px -4px 6px rgba(150,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.3), 2px 4px 5px rgba(0,0,0,0.6); }
.mod, .nav, .tab, .caps, .shift-l, .shift-r, .ctrl, .backspace { background: #2c2d30; color: #888; }

/* Rotary Dial */
.dial-container { width: 36px; height: 36px; display: flex; justify-content: center; align-items: center; margin-left: auto; }
.rotary-dial { width: 28px; height: 28px; border-radius: 50%; background: radial-gradient(circle at 50% 30%, #555, #111); box-shadow: 0 5px 10px rgba(0,0,0,0.8), inset 0 0 2px #888; border: 1px solid #111; position: relative; }
.rotary-dial::after { content: ''; position: absolute; inset: 2px; border-radius: 50%; background-image: repeating-conic-gradient(#333 0deg, #333 10deg, #111 10deg, #111 20deg); opacity: 0.3; }


/* 
  =========================================
  KEYBOARD 2: SPLIT ERGO
  ========================================= 
*/
.kb-split { width: 520px; justify-content: space-between; align-items: center; }
.trrs-cable { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 200px; z-index: 1; }
.trrs-cable svg { width: 100%; height: 100%; filter: drop-shadow(0 10px 5px rgba(0,0,0,0.5)); }

.split-half { width: 240px; position: relative; z-index: 2; }
.left-half { transform: rotate(-10deg); } .right-half { transform: rotate(10deg); }

.fr4-plate { background-color: #121212; border: 1px solid #333; border-radius: 16px 16px 30px 16px; padding: 15px; box-shadow: 5px 15px 25px rgba(0,0,0,0.7), inset 0 0 0 2px #d4af37; position: relative; overflow: hidden; }
.right-half .fr4-plate { border-radius: 16px 16px 16px 30px; }

.traces { position: absolute; inset: 0; pointer-events: none; opacity: 0.15; background-image: linear-gradient(45deg, transparent 48%, #d4af37 49%, #d4af37 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #d4af37 49%, #d4af37 51%, transparent 52%); background-size: 20px 20px; }
.screws { position: absolute; width: 6px; height: 6px; background: radial-gradient(circle, #ddd, #666); border-radius: 50%; box-shadow: 1px 1px 2px #000; }
.tl { top: 6px; left: 6px; } .tr { top: 6px; right: 6px; } .bl { bottom: 6px; left: 6px; } .br { bottom: 6px; right: 6px; }

.oled-module { background: #000; width: 80px; height: 35px; border-radius: 4px; margin-bottom: 10px; margin-left: 36px; border: 2px solid #222; box-shadow: inset 0 0 5px #fff; display: flex; flex-direction: column; justify-content: center; padding: 4px; }
.oled-module span { color: #0ff; font-family: 'Space Mono', monospace; font-size: 0.4rem; font-weight: bold; line-height: 1.2; text-shadow: 0 0 2px #0ff; }

.ergo-grid { display: flex; gap: 4px; justify-content: center; }
.col { display: flex; flex-direction: column; gap: 4px; }
.c1 { margin-top: 15px; } .c2 { margin-top: 5px; } .c3 { margin-top: 0px; } .c4 { margin-top: 5px; } .c5 { margin-top: 10px; } .c6 { margin-top: 20px; }

.kb-split .key { width: 28px; height: 28px; background: #e2e4e9; box-shadow: inset -1px -2px 4px rgba(0,0,0,0.2), inset 1px 1px 2px #fff, 2px 4px 5px rgba(0,0,0,0.6); }
.kb-split .mod { background: #b0b4be; }
.kb-split .split-accent { background: #4ec9b0; box-shadow: inset -1px -2px 4px rgba(0,50,50,0.3), inset 1px 1px 2px rgba(255,255,255,0.5), 2px 4px 5px rgba(0,0,0,0.6); }

.thumb-cluster { display: flex; gap: 4px; margin-top: 10px; }
.left-thumbs { justify-content: flex-end; padding-right: 15px; } .right-thumbs { justify-content: flex-start; padding-left: 15px; }
.thumb { height: 34px; transform: rotate(15deg); } .left-thumbs .thumb { transform: rotate(-15deg); }

.trackball-housing { width: 36px; height: 36px; background: #222; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: inset 0 2px 5px #000, 2px 4px 5px rgba(0,0,0,0.6); margin-top: -10px; border: 1px solid #111; }
.trackball { width: 28px; height: 28px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ff7b7b, #c40000 60%, #4a0000); box-shadow: inset -2px -2px 6px rgba(0,0,0,0.6), 5px 5px 10px rgba(0,0,0,0.9); }
</style>