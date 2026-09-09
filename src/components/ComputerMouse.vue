<template>
  <section class="physical-object computer-mouse" :class="{ 'focused': isFocused }">

    <!-- Main Mouse Body -->
    <div class="mouse-body">
      
      <!-- Left & Right Click Panels -->
      <div class="mouse-btn left-click"></div>
      <div class="mouse-btn right-click"></div>
      
      <!-- Center Divider -->
      <div class="center-channel">
        <div class="scroll-wheel">
          <!-- Creates the ridged texture on the wheel -->
          <div class="wheel-texture"></div>
        </div>
        <div class="dpi-button"></div>
      </div>

      <!-- Ergonomic Palm Rest -->
      <div class="palm-rest">
        <div class="led-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 14 12 4 20 14" />
            <polyline points="4 20 12 10 20 20" />
          </svg>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ isFocused: boolean }>();
</script>

<style scoped>
.physical-object { 
  width: 140px; 
  height: 240px; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  position: relative;
}

/* Mouse Base / Shell */
.mouse-body {
  width: 100%;
  height: 100%;
  background: #1e1e20; /* Dark matte finish */
  border-radius: 50px 50px 65px 65px; /* Wider at the palm, narrower at the front */
  box-shadow: 
    15px 25px 25px rgba(0,0,0,0.7), 
    inset -5px -10px 15px rgba(0,0,0,0.6), 
    inset 5px 5px 15px rgba(255,255,255,0.05);
  border: 1px solid #111;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

/* Click Panels */
.mouse-btn {
  position: absolute;
  top: 0;
  width: 48%;
  height: 45%;
  background: linear-gradient(to bottom, #252629, #1c1d1f);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.05);
  transition: all 0.1s ease;
}
.mouse-btn:active {
  background: linear-gradient(to bottom, #1c1d1f, #151618);
  box-shadow: inset 0 4px 6px rgba(0,0,0,0.4);
}
.left-click { left: 0; border-radius: 50px 0 0 10px; border-right: 1px solid #111; border-bottom: 2px solid #111; }
.right-click { right: 0; border-radius: 0 50px 10px 0; border-left: 1px solid #111; border-bottom: 2px solid #111; }

/* Center channel housing the wheel and DPI button */
.center-channel {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 80px;
  background: #0a0a0a;
  border-radius: 10px;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  gap: 15px;
  z-index: 3;
}

/* Rubberized Scroll Wheel */
.scroll-wheel {
  width: 12px;
  height: 32px;
  background: #111;
  border-radius: 6px;
  box-shadow: 0 4px 5px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.2);
  border: 1px solid #000;
  position: relative;
  overflow: hidden;
}
.wheel-texture {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(to bottom, transparent, transparent 2px, #000 2px, #000 4px);
  opacity: 0.7;
}

/* DPI Cycle Button */
.dpi-button {
  width: 10px;
  height: 12px;
  background: #2a2c30;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1);
  border: 1px solid #000;
}
.dpi-button:active {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
}

/* Palm Rest & Logo */
.palm-rest {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,0.02);
}

/* Subtle glowing tech logo */
.led-logo {
  width: 30px;
  height: 30px;
  color: #27c93f; /* Tied to the monitor power LED color */
  opacity: 0.8;
  filter: drop-shadow(0 0 5px rgba(39, 201, 63, 0.6));
  margin-top: 20px;
}
.led-logo svg {
  width: 100%;
  height: 100%;
}
</style>