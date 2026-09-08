<template>
  <div class="waybar-wrapper" @click.stop>
    
    <!-- Left: Workspaces -->
    <div class="wb-module workspaces">
      <span class="ws" :class="{ active: !modelValue }"  @click="emit('update:modelValue', false)">1: PCB</span>
      <span class="ws" :class="{ active: modelValue }" @click="emit('update:modelValue', true)">2: &gt;_</span>
    </div>

    <!-- Center: Window Title -->
    <div class="wb-module title">
      <span>~/portfolio/terminal</span>
    </div>

    <!-- Right: Stats & Toggle -->
    <div class="wb-right">
      <div class="wb-module stats">
        <span>MEM 14%</span>
        <span>CPU 4%</span>
      </div>
      
      <div class="wb-module mode-toggle" @click="toggle" title="Switch UI Mode">
        <span class="toggle-pill" :class="{ active: !modelValue }">HW</span>
        <span class="toggle-pill" :class="{ active: modelValue }">SW</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, required: true }
})
const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
.waybar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 6px;
  
  background-color: color-mix(in srgb, var(--background-color) 65%, rgba(0,0,0,0.5));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border: 1px solid color-mix(in srgb, var(--border-color) 8%, rgba(255,255,255,0.1));
  border-radius: 16px; 
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  
  font-family: 'Space Mono', 'Fira Code', monospace;
  font-size: 85%;
  color: var(--text-color, #cdd6f4);
  user-select: none;
}

.wb-module {
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.wb-right { display: flex; gap: 8px; }
.workspaces { gap: 8px; }
.ws {
  color: #6c7086; font-weight: bold; padding: 2px 6px; border-radius: 8px; transition: all 0.2s ease;
}
.ws:hover { background-color: rgba(255, 255, 255, 0.1); color: var(--header-color, #89b4fa); }
.ws.active {
  background-color: rgba(255, 255, 255, 0.1); color: var(--header-color, #89b4fa); 
}
.title { color: var(--path-color, #a6e3a1); font-weight: 500; letter-spacing: 0.5px; }
.stats { gap: 12px; color: var(--user-color, #f9e2af); font-size: 75%; }
.mode-toggle { gap: 4px; padding: 4px; cursor: pointer; background-color: rgba(0, 0, 0, 0.3); transition: background-color 0.2s ease; }
.mode-toggle:hover { background-color: rgba(255, 255, 255, 0.15); }
.toggle-pill { padding: 2px 10px; border-radius: 8px; font-weight: bold; color: #6c7086; font-size: 75%; transition: all 0.3s ease; }

.toggle-pill.active {
  background-color: var(--text-color, #89dceb); 
  color: var(--background-color, #11111b); 
  box-shadow: 0 0 8px rgba(255,255,255, 0.2);
}

@media (max-width: 600px) {
  .title, .stats { display: none; }
  .waybar-wrapper { justify-content: space-between; }
}
</style>