<template>
  <!-- Only render on non-touch devices -->
  <div class="cursor-wrapper">
    <!-- The exact precision dot -->
    <div 
      class="cursor-dot" 
      :style="{ transform: `translate3d(${mouseX}px, ${mouseY}px, 0)` }"
    ></div>
    
    <!-- The smooth trailing ring -->
    <div 
      class="cursor-ring" 
      :class="{ 'is-hovering': isHovering }"
      :style="{ transform: `translate3d(${ringX}px, ${ringY}px, 0)` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const mouseX = ref(-100);
const mouseY = ref(-100);
const ringX = ref(-100);
const ringY = ref(-100);
const isHovering = ref(false);

let animationFrameId: number;

const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;

  // Check if we are hovering over something clickable to animate the ring
  const target = e.target as HTMLElement;
  const isClickable = target.closest('a, button, input, .hw-switch-wrapper, .mode-toggle, .kernel-panic');
  isHovering.value = !!isClickable;
};

// Smooth easing loop for the outer ring
const renderLoop = () => {
  // Easing factor: 0.2 means it moves 20% of the distance per frame
  ringX.value += (mouseX.value - ringX.value) * 0.2;
  ringY.value += (mouseY.value - ringY.value) * 0.2;
  
  animationFrameId = requestAnimationFrame(renderLoop);
};

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition);
  renderLoop();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition);
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
/* Only show the custom cursor on devices with a real mouse */
@media (pointer: fine) {
  .cursor-wrapper {
    position: fixed;
    inset: 0;
    pointer-events: none; /* Crucial: lets clicks pass through to the app */
    z-index: 9999;
  }

  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px; /* Center the dot exactly on the mouse coordinates */
    background-color: var(--user-color); /* Ties into your active theme! */
    border-radius: 50%;
    pointer-events: none;
    transition: background-color 0.3s ease;
    will-change: transform;
  }

  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    margin: -16px 0 0 -16px; /* Center the ring */
    border: 1px solid color-mix(in srgb, var(--user-color) 60%, transparent);
    background-color: color-mix(in srgb, var(--user-color) 10%, transparent);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
    
    /* Smooth transitions for hover state */
    transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  }

  /* When hovering over buttons/links, scale the ring up and fill it slightly */
  .cursor-ring.is-hovering {
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    background-color: color-mix(in srgb, var(--user-color) 20%, transparent);
    border-color: color-mix(in srgb, var(--user-color) 90%, transparent);
  }
}
</style>