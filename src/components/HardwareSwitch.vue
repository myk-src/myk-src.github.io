<template>
  <div class="switch-container">
    <transition name="fade" mode="out-in">
      
      <!--==============================================
          HARDWARE MODE: Physical PCB & DIP Switch 
          ==============================================-->
      <div v-if="!modelValue" key="hw" class="hw-switch-wrapper" @click="toggle">
        <div class="silkscreen-text">DIP_SW1: UI_MODE</div>
        <div class="silkscreen-outline">
          <div class="dip-switch-body">
            <div class="switch-labels">
              <span class="active">HW</span>
              <span>SW</span>
            </div>
            <div class="switch-slot">
              <div class="actuator">
                <div class="actuator-ridges"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--==============================================
          SOFTWARE MODE: Riced Linux Waybar
          ==============================================-->
      <div v-else key="sw" class="waybar-wrapper">
        
        <!-- Left: Workspaces -->
        <div class="wb-module workspaces">
          <span class="ws">1</span>
          <span class="ws">2</span>
          <span class="ws active">&gt;_</span>
        </div>

        <!-- Center: Window Title (Hidden on tiny screens) -->
        <div class="wb-module title">
          <span>~/portfolio/terminal</span>
        </div>

        <!-- Right: Stats & Toggle -->
        <div class="wb-right">
          <div class="wb-module stats">
            <span>MEM 14%</span>
            <span>CPU 4%</span>
          </div>
          
          <!-- The actual toggle button disguised as a Waybar module -->
          <div class="wb-module mode-toggle" @click="toggle" title="Switch to Hardware Mode">
            <span class="toggle-pill">HW</span>
            <span class="toggle-pill active">SW</span>
          </div>
        </div>

      </div>

    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
/* 
  =========================================
  TRANSITION ANIMATIONS & CONTAINER
  ========================================= 
*/
.switch-container {
  /* Spans full width so the waybar can stretch out naturally */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 
  =========================================
  HARDWARE MODE STYLES (Physical PCB)
  ========================================= 
*/
.hw-switch-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  background-color: #0b5e25; 
  border-radius: 6px;
  border: 1px solid #063815;
  box-shadow: 3px 3px 8px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.1);
  font-family: 'Space Mono', 'Courier New', monospace;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.hw-switch-wrapper::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    radial-gradient(circle at 10px 10px, #d4af37 2px, #000 2.5px, transparent 3.5px),
    radial-gradient(circle at calc(100% - 10px) 10px, #d4af37 2px, #000 2.5px, transparent 3.5px),
    radial-gradient(circle at 10px calc(100% - 10px), #d4af37 2px, #000 2.5px, transparent 3.5px),
    radial-gradient(circle at calc(100% - 10px) calc(100% - 10px), #d4af37 2px, #000 2.5px, transparent 3.5px),
    linear-gradient(45deg, transparent 48%, #107c31 49%, #107c31 51%, transparent 52%),
    linear-gradient(-45deg, transparent 68%, #107c31 69%, #107c31 71%, transparent 72%);
  pointer-events: none;
  z-index: 0;
}

.silkscreen-text, .silkscreen-outline { position: relative; z-index: 1; }
.silkscreen-text { color: #fff; font-size: 0.85rem; font-weight: bold; letter-spacing: 1px; }
.silkscreen-outline { border: 2px solid rgba(255, 255, 255, 0.8); padding: 4px; border-radius: 2px; }

.dip-switch-body {
  background: linear-gradient(145deg, #cc1111, #aa0000);
  border: 1px solid #770000;
  border-radius: 4px;
  padding: 6px 10px;
  width: 70px;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.3);
  user-select: none;
}

.switch-labels { display: flex; justify-content: space-between; color: #ffcccc; font-size: 0.6rem; margin-bottom: 6px; font-weight: bold; }
.switch-labels .active { color: #ffffff; }

.switch-slot {
  background-color: #111; width: 100%; height: 24px; border-radius: 2px;
  box-shadow: inset 1px 1px 4px rgba(0,0,0,0.8); border-bottom: 1px solid #ff4444; 
  box-sizing: border-box; padding: 2px; display: flex;
}

.actuator {
  height: 100%; width: 50%; 
  background: linear-gradient(180deg, #ffffff, #d0d0d0);
  border-radius: 2px; box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}

.actuator-ridges { width: 2px; height: 10px; background-color: #aaa; box-shadow: -4px 0 0 #aaa, 4px 0 0 #aaa; }


/* 
  =========================================
  SOFTWARE MODE STYLES (Linux Waybar)
  ========================================= 
*/
.waybar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 6px;
  
  /* Semi-transparent frosted glass backdrop */
  background-color: color-mix(in srgb, var(--background-color) 65%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border: 1px solid color-mix(in srgb, var(--border-color) 8%, transparent);
  border-radius: 16px; /* Pill-shaped floating bar */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  
  font-family: 'Space Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #cdd6f4;
  user-select: none;
}

/* Individual Pill Modules */
.wb-module {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.wb-right {
  display: flex;
  gap: 8px;
}

/* Workspaces Module */
.workspaces {
  gap: 8px;
}

.ws {
  color: #6c7086;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.ws.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #89b4fa; /* Blue accent */
}

/* Window Title Module */
.title {
  color: #a6e3a1; /* Green accent */
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Stats Module */
.stats {
  gap: 12px;
  color: #f9e2af; /* Yellow accent */
  font-size: 0.75rem;
}

/* The actual Toggle Module */
.mode-toggle {
  gap: 4px;
  padding: 4px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s ease;
}

.mode-toggle:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.toggle-pill {
  padding: 2px 10px;
  border-radius: 8px;
  font-weight: bold;
  color: #6c7086;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}

.toggle-pill.active {
  background-color: #89dceb; /* Cyan active color */
  color: #11111b; /* Dark text for contrast */
  box-shadow: 0 0 8px rgba(137, 220, 235, 0.4);
}

/* Responsive adjustments for mobile */
@media (max-width: 600px) {
  .title, .stats {
    display: none; /* Hide non-essential modules on small screens */
  }
  .waybar-wrapper {
    justify-content: space-between;
  }
}
</style>