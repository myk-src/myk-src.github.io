<template>
  <div class="switch-container">
    <transition name="fade" mode="out-in">
      
      <!-- ==============================================
           HARDWARE MODE: Physical PCB & DIP Switch 
           ============================================== -->
      <div v-if="!modelValue" key="hw" class="hw-switch-wrapper" @click="toggle">
        <div class="silkscreen-text">SW1: UI_MODE</div>
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

      <!-- ==============================================
           SOFTWARE MODE: Modern OS Digital Toggle 
           ============================================== -->
      <div v-else key="sw" class="os-switch-wrapper" @click="toggle">
        <span class="os-label">UI Mode</span>
        <div class="os-toggle">
          <div class="os-knob"></div>
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
  TRANSITION ANIMATIONS
  ========================================= 
*/
.switch-container {
  display: inline-block;
  min-height: 80px; /* Prevents layout jumps during crossfade */
  display: flex;
  align-items: center;
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
  SOFTWARE MODE STYLES (OS Digital UI)
  ========================================= 
*/
.os-switch-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  /* Uses the system's native font for that authentic OS feel */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  cursor: pointer;
  user-select: none;
}

.os-label {
  font-weight: 500;
  color: #e0e0e0;
  font-size: 0.95rem;
}

/* The pill-shaped track */
.os-toggle {
  width: 48px;
  height: 28px;
  background-color: #34c759; /* Classic digital UI 'active' green */
  border-radius: 30px;
  position: relative;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
}

/* The white circular slider button */
.os-knob {
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  /* Positioned to the right because Software mode = TRUE */
  right: 2px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}
</style>