<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const diagnostics = [
  'Initializing CPU cache',
  'Checking BIOS checksum',
  'Testing RAM banks',
  'Loading device drivers',
  'Calibrating display output',
  'Verifying network stack',
  'Mounting user profile',
  'Ready for boot'
];

const currentIndex = ref(0);
const progress = ref(0);
const isBootComplete = ref(false);

const currentStatus = computed(() => diagnostics[currentIndex.value]);

onMounted(() => {
  const interval = window.setInterval(() => {
    if (isBootComplete.value) {
      return;
    }

    const nextIndex = currentIndex.value + 1;

    if (nextIndex >= diagnostics.length) {
      currentIndex.value = diagnostics.length - 1;
      progress.value = 100;
      isBootComplete.value = true;
      window.clearInterval(interval);
      return;
    }

    currentIndex.value = nextIndex;
    progress.value = Math.min(progress.value + 12, 100);
  }, 240);
});
</script>

<template>
  <div class="boot-screen">
    <div class="scanlines" aria-hidden="true" />

    <header class="boot-header">
      <span class="boot-tag">SYSTEM BOOT</span>
      <span class="boot-version">POST v2.4.7</span>
    </header>

    <div class="diagnostic-panel">
      <div class="panel-title">POST DIAGNOSTICS</div>

      <ul class="diagnostic-list">
        <li v-for="(item, index) in diagnostics" :key="item"
          :class="{ active: index === currentIndex, complete: (index < currentIndex || isBootComplete) }">
          <span class="indicator">{{ (index < currentIndex || isBootComplete) ? 'OK' : index === currentIndex ? '>>' : '--' }}</span>
              {{ item }}
        </li>
      </ul>
    </div>

    <div class="progress-wrap">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }" />
      </div>

      <div class="status-line">
        <span class="status-label">STATUS</span>
        <span class="status-text">{{ currentStatus }}</span>
        <span class="cursor">█</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boot-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem clamp(1.25rem, 4vw, 3rem);
  background:
    radial-gradient(circle at top, rgba(102, 153, 255, 0.14), transparent 38%),
    linear-gradient(180deg, #070b10 0%, #0f1724 100%);
  color: #e5f2ff;
  font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
  overflow: hidden;
  z-index: 10;
}

.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(to bottom,
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 3px);
  pointer-events: none;
}

.boot-header,
.diagnostic-panel,
.progress-wrap {
  position: relative;
  z-index: 1;
}

.boot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(136, 192, 255, 0.35);
  letter-spacing: 0.2em;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.boot-tag {
  color: #7ee7d6;
  font-weight: 700;
}

.boot-version {
  color: #dbeafe;
  opacity: 0.8;
}

.diagnostic-panel {
  width: min(100%, 820px);
  margin: 0 auto;
  padding: 1.3rem 1.2rem;
  background: rgba(15, 23, 36, 0.86);
  border: 1px solid rgba(126, 231, 214, 0.25);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.12), 0 0 30px rgba(14, 165, 233, 0.12);
}

.panel-title {
  margin-bottom: 1rem;
  color: #8ae7d1;
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.diagnostic-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.diagnostic-list li {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.28rem 0.2rem;
  color: rgba(224, 238, 255, 0.75);
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
}

.diagnostic-list li.active {
  color: #f8fbff;
  border-left-color: #7ee7d6;
  text-shadow: 0 0 10px rgba(126, 231, 214, 0.5);
}

.diagnostic-list li.complete {
  color: #a7f3d0;
}

.indicator {
  display: inline-block;
  width: 2.2rem;
  color: #7ee7d6;
  font-weight: 700;
}

.progress-wrap {
  width: min(100%, 820px);
  margin: 0 auto;
}

.progress-bar {
  position: relative;
  height: 18px;
  border: 1px solid rgba(126, 231, 214, 0.45);
  border-radius: 999px;
  background: rgba(15, 23, 36, 0.9);
  overflow: hidden;
  box-shadow: inset 0 0 12px rgba(59, 130, 246, 0.15);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #22d3ee 0%, #7ee7d6 50%, #a7f3d0 100%);
  box-shadow: 0 0 18px rgba(45, 212, 191, 0.9);
  transition: width 0.3s ease;
}

.status-line {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: #cfe8ff;
}

.status-label {
  color: #a5b4fc;
}

.status-text {
  flex: 1;
  color: #f8fbff;
}

.cursor {
  color: #7ee7d6;
  animation: blink 0.9s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .boot-screen {
    padding-top: 2.25rem;
    padding-bottom: 2.25rem;
  }

  .boot-header,
  .status-line {
    letter-spacing: 0.08em;
  }

  .diagnostic-panel {
    padding: 1rem 0.8rem;
  }

  .diagnostic-list li {
    gap: 0.55rem;
    font-size: 0.8rem;
  }
}
</style>
