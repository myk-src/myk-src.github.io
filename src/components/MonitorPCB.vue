<template>
  <section class="physical-object monitor-assembly" :class="{ 'focused': isFocused, 'software-mode': isSoftwareMode }">
    
    <!-- STATE 1: TOP DOWN VIEW (Unfocused) -->
    <div v-if="!isFocused" class="monitor-topdown">
      <div class="top-screen-edge">
        <div class="vents-top"></div>
        <div class="power-btn-top"></div>
      </div>
      <div class="stand-neck"></div>
      <div class="stand-base"></div>
    </div>

    <!-- STATE 2 & 3: FRONT PANEL / FULLSCREEN TERMINAL -->
    <div v-else class="monitor-front">
      <div class="monitor-body">
        
        <div class="power-led" v-if="!isSoftwareMode"></div>
        <div class="brand-logo" v-if="!isSoftwareMode">MYK-VISION</div>
        
        <div class="monitor-screen" :class="{ 'sw-wallpaper': isSoftwareMode }">
          <div class="glass-glare" v-if="!isSoftwareMode"></div>

          <!-- THE SWITCH -->
          <div class="floating-waybar" v-if="isFocused || isSoftwareMode">
            <HardwareSwitch 
              :modelValue="isSoftwareMode" 
              @update:modelValue="$emit('update:isSoftwareMode', $event)" 
            />
          </div>

          <!-- MAGIC GRID CROSSFADE -->
          <div class="crossfade-container">
            <transition name="screen-crossfade">
              
              <!-- TERMINAL VIEW (SW MODE) -->
              <div class="terminal-wrapper crossfade-panel" v-if="isSoftwareMode" key="sw">
                <TerminalView />
              </div>

              <!-- PCB VIEW (HW MODE) -->
              <div class="physical-pcb crossfade-panel" v-else key="hw">
                <div class="silkscreen-logo">MYK-MB REV A (DISPLAY OUT)</div>
                <div class="trace-timeline">
                  <div 
                    v-for="(exp, index) in reversedExperience" 
                    :key="index" 
                    class="pcb-node"
                    @mouseenter="isFocused ? hoveredExp = index : null"
                    @mouseleave="hoveredExp = null"
                  >
                    <div class="pad-container">
                      <div class="copper-pad" :class="{ 'active-pad': hoveredExp === index }">
                        <div class="drill-hole">
                          <div class="led" :class="{ 'led-on': hoveredExp === index }"></div>
                        </div>
                      </div>
                      <div class="copper-trace" :class="{ 'active-trace': hoveredExp === index }" v-if="index !== reversedExperience.length - 1"></div>
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
              </div>

            </transition>
          </div>

        </div>
      </div>
    </div>
    
  </section>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import type { Resume } from '@/utils/types.js';

import HardwareSwitch from '@/components/HardwareSwitch.vue';
const TerminalView = defineAsyncComponent(() => import('@/views/TerminalView.vue'));

const props = defineProps<{ resume: Resume, isFocused: boolean, isSoftwareMode: boolean }>();
defineEmits(['update:isSoftwareMode']);

const hoveredExp = ref<number | null>(null);

const reversedExperience = computed(() => {
  if (!props.resume?.experience) return [];
  return [...props.resume.experience].reverse();
});
</script>

<style scoped>
.physical-object { display: flex; flex-direction: column; align-items: center; }

/* The Floating Switch */
.floating-waybar {
  display: flex; justify-content: center; align-items: center;
  padding: 1em;
  width: 100%;
  z-index: 9999;
}

/* 
  =========================================
  THE GRID CROSSFADE FIX
  ========================================= 
*/
.crossfade-container {
  display: grid;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
}
.crossfade-panel {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  min-height: 0; 
  min-width: 0;
}

.screen-crossfade-enter-active { transition: opacity 0.4s ease; z-index: 2; }
.screen-crossfade-leave-active { transition: opacity 0.4s ease; z-index: 1; }
.screen-crossfade-enter-from, .screen-crossfade-leave-to { opacity: 0; }

.terminal-wrapper {
  padding: 1em; padding-top: 0; box-sizing: border-box;
}

/* 
  =========================================
  STATE 3: FULLSCREEN TERMINAL MODE
  (Expands symmetrically from the center)
  ========================================= 
*/
.software-mode .monitor-front { width: 100vw; }

.software-mode .monitor-body { 
  padding: 0; 
  border-radius: 6px; 
  
  /* Use transparent values so it smoothly interpolates with HW colors! */
  border-color: transparent; 
  background-color: transparent;
  box-shadow: 15px 15px 30px rgba(0,0,0,0); 
}

.software-mode .monitor-screen { height: 100dvh; border-radius: 6px; box-shadow: inset 0 0 0 transparent; }

/* STATE 1: TOP DOWN VIEW */
.monitor-topdown { display: flex; flex-direction: column; align-items: center; position: relative; transform: rotate(2deg); }
.top-screen-edge { width: 60vw; height: 2vw; background: linear-gradient(to bottom, #333, #111); border-radius: 4px; box-shadow: 0 15px 20px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.1); position: relative; z-index: 3; border-top: 1px solid #555; }
.vents-top { position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 14vw; height: .6vw; background-image: repeating-linear-gradient(90deg, #0a0a0a, #0a0a0a 2px, transparent 2px, transparent 6px); opacity: 0.8; }
.power-btn-top { position: absolute; top: 8px; right: 20px; width: 1.2vw; height: .3vw; background-color: #27c93f; border-radius: 2px; box-shadow: 0 0 4px #27c93f; }
.stand-neck { width: 6vw; height: 4.5vw; background: linear-gradient(to bottom, #222, #0a0a0a); box-shadow: 5px 15px 15px rgba(0,0,0,0.6); z-index: 2; margin-top: -5px; border-left: 2px solid #333; border-right: 2px solid #111; }
.stand-base { width: 15vw; height: 7vw; background: #1a1a1a; border-radius: 10px 10px 50px 50px; box-shadow: 0 15px 25px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.05); z-index: 1; margin-top: -15px; }

/* 
  =========================================
  STATE 2: FRONT PANEL
  ========================================= 
*/
.monitor-front { width: 75vw; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }

.monitor-body { 
  width: 100%; background-color: #1a1a1a; padding: 15px 15px 30px 15px; border-radius: 4px; 
  border-top: 1px solid #333; border-left: 1px solid #222; border-bottom: 4px solid #050505; border-right: 4px solid #050505; 
  box-shadow: 15px 15px 30px rgba(0,0,0,0.8); position: relative; z-index: 2; 
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); 
}
.power-led { position: absolute; bottom: 12px; right: 20px; width: 6px; height: 6px; border-radius: 50%; background-color: #27c93f; box-shadow: 0 0 5px #27c93f; }
.brand-logo { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); font-family: sans-serif; font-size: 60%; color: #444; letter-spacing: 2px; }

.monitor-screen { 
  background-image: url('@/assets/wallpaper/ascii.jpg'); background-size: cover; background-position: right bottom; background-repeat: no-repeat; background-color: var(--background-color); 
  border-radius: 2px; overflow: hidden; position: relative; box-shadow: inset 0 0 10px #000; 
  display: flex; flex-direction: column; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); 
}
.glass-glare { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 40%); pointer-events: none; z-index: 10; }

/* The PCB Content */
.physical-pcb { 
  margin: 1em; margin-top: 0; background-color: #141b18; background-image: radial-gradient(#2a3b33 1px, transparent 1px); background-size: 20px 20px; 
  padding: 30px; height: 100%; overflow-y: auto; position: relative; border-radius: 1em; border: 1px solid #efefef; 
}
.silkscreen-logo { position: absolute; top: 10px; right: 10px; color: #ffd166; font-family: monospace; font-weight: bold; font-size: 80%; }
.trace-timeline { display: flex; flex-direction: column; }
.pcb-node { display: flex; min-height: 80px; }
.pad-container { min-width: 6vw; display: flex; flex-direction: column; align-items: center; position: relative; }
.copper-pad { width: 24px; height: 24px; background-color: #c7a76c; border-radius: 50%; display: flex; justify-content: center; align-items: center; transition: all 0.2s ease; }
.active-pad { background-color: #f4a261; box-shadow: 0 0 10px #f4a261; }
.drill-hole { width: 10px; height: 10px; background-color: #0a0e0c; border-radius: 50%; display: flex; justify-content: center; align-items: center; }
.led { width: 6px; height: 6px; background-color: #330000; border-radius: 50%; transition: all 0.2s ease; }
.led-on { background-color: #ff3333; box-shadow: 0 0 8px #ff0000, inset 0 0 2px #fff; }
.copper-trace { width: 6px; flex-grow: 1; background-color: #8c4e3a; background-image: repeating-linear-gradient(45deg, #8c4e3a, #8c4e3a 10px, #75402f 10px, #75402f 20px); transition: all 0.2s ease; }
.active-trace { background-color: #e07a5f; }
.silkscreen-data { padding-left: 16px; padding-bottom: 24px; color: #a0a0a0; font-family: monospace; transition: all 0.2s ease; }
.active-silk { color: #ffd166; transform: translateX(5px); }
.silk-ref { font-weight: bold; border: 1px solid currentColor; padding: 2px 6px; display: inline-block; margin-bottom: 4px;}
.silk-title { font-weight: bold; margin-bottom: 4px;}
.silk-dates { font-size: 75%; opacity: 0.8; }
</style>