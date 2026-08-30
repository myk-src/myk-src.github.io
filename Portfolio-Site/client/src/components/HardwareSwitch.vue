<template>
  <div class="dip-switch-wrapper">
    <!-- PCB Silkscreen Label -->
    <div class="silkscreen-text">SW1: UI_MODE</div>
    
    <!-- Physical Switch Body -->
    <div class="dip-switch-body" @click="toggle">
      
      <!-- ON/OFF or HW/SW Labels printed on the switch -->
      <div class="switch-labels">
        <span :class="{ active: !modelValue }">HW</span>
        <span :class="{ active: modelValue }">SW</span>
      </div>

      <!-- The black inset slot -->
      <div class="switch-slot">
        <!-- The white plastic actuator -->
        <div class="actuator" :class="{ 'is-software': modelValue }">
          <div class="actuator-ridges"></div>
        </div>
      </div>
      
    </div>
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
/* Container acting as the green PCB background */
.dip-switch-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: 'Space Mono', 'Courier New', monospace;
}

/* White PCB silkscreen text */
.silkscreen-text {
  color: #fff;
  font-size: 0.85rem;
  font-weight: bold;
  letter-spacing: 1px;
}

/* Classic red DIP switch casing */
.dip-switch-body {
  background: linear-gradient(145deg, #cc1111, #aa0000);
  border: 1px solid #770000;
  border-radius: 4px;
  padding: 6px 10px;
  width: 70px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.2);
  cursor: pointer;
  user-select: none;
}

/* Labels on the red casing */
.switch-labels {
  display: flex;
  justify-content: space-between;
  color: #ffcccc;
  font-size: 0.6rem;
  margin-bottom: 6px;
  font-weight: bold;
}

.switch-labels .active {
  color: #ffffff;
}

/* The black cutout where the switch slides */
.switch-slot {
  background-color: #111;
  height: 24px;
  border-radius: 2px;
  position: relative;
  box-shadow: inset 1px 1px 4px rgba(0,0,0,0.8);
  border-bottom: 1px solid #ff4444; /* Fake light reflection on the bottom edge */
}

/* The white plastic toggle switch */
.actuator {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 30px;
  height: 20px;
  background: linear-gradient(180deg, #ffffff, #d0d0d0);
  border-radius: 2px;
  box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  transition: transform 0.15s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Physical ridges on the plastic actuator */
.actuator-ridges {
  width: 2px;
  height: 10px;
  background-color: #aaa;
  box-shadow: -4px 0 0 #aaa, 4px 0 0 #aaa;
}

/* Slide to the right when in 'Software' (true) mode */
.actuator.is-software {
  transform: translateX(34px);
}
</style>