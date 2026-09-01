<template>
  <div class="boot-screen" @click="triggerReboot" tabindex="0" ref="panicScreen" @keydown="triggerReboot">
    <!-- CRT Scanlines from Boot Sequence -->
    <div class="scanlines" aria-hidden="true" />

    <!-- OS Header -->
    <header class="boot-header" :class="{ 'fade-out': isRebooting }">
      <span class="boot-tag error-tag">SYSTEM FAILURE</span>
      <span class="boot-version">ERR v4.0.4</span>
    </header>

    <!-- Error Output Panel -->
    <div class="diagnostic-panel error-panel" :class="{ 'fade-out': isRebooting }">
      <div class="panel-title error-title">KERNEL PANIC - NOT SYNCING</div>
      
      <pre class="panic-text">
[    0.832714] BUG: unable to handle kernel paging request at 0000000000000404
[    0.832718] IP: [&lt;ffffffff81000404&gt;] route_not_found+0x0/0x10
[    0.832722] PGD 0 
[    0.832724] Oops: 0000 [#1] SMP 
[    0.832727] Modules linked in: web_server vue_router github_pages
[    0.832731] CPU: 0 PID: 1 Comm: init Not tainted {{ systemInfo.get('os') }} {{ systemInfo.get('version') }}
[    0.832734] Hardware name: {{ systemInfo.get('host') }}
[    0.832739] RIP: 0010:[&lt;ffffffff81000404&gt;] route_not_found+0x0/0x10
[    0.832751] CR2: 0000000000000404 CR3: 000000011a58c000 
[    0.832765] Stack:
[    0.832767]  ffff88011a7afd98 ffffffff81177693 0000000000000404
[    0.832771]  0000000000000000 ffff88011a7afeb8 ffffffff81177fe8
[    0.832785] Call Trace:
[    0.832788]  [&lt;ffffffff81177693&gt;] ? resolve_url+0x43/0x60
[    0.832791]  [&lt;ffffffff81177fe8&gt;] ? load_page+0x318/0x450
[    0.832794]  [&lt;ffffffff8167f924&gt;] ? panic+0xc9/0x1e8
[    0.832805] ---[ end trace 4044044044044040 ]---
[    0.832815] ERROR 404: PAGE NOT FOUND
      </pre>

      <div class="status-line">
        <span class="status-label">ACTION</span>
        <span class="status-text">Press any key to reboot into user space</span>
        <span class="cursor" v-if="!isRebooting">█</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { systemInfo } from '@/utils/system';

const emit = defineEmits(['reboot']);
const panicScreen = ref<HTMLElement | null>(null);
const isRebooting = ref(false);

onMounted(() => {
  panicScreen.value?.focus();
});

const triggerReboot = () => {
  if (isRebooting.value) return; 

  isRebooting.value = true;

  setTimeout(() => {
    emit('reboot');
  }, 1000); 
};
</script>

<style scoped>
/* Base screen matching BootSequence */
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
  cursor: pointer;
  outline: none;
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
.diagnostic-panel {
  position: relative;
  z-index: 1;
  transition: opacity 0.8s ease-in-out;
}

.fade-out {
  opacity: 0;
}

.boot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 99, 103, 0.35); /* Tinted red for error */
  letter-spacing: 0.2em;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.error-tag {
  color: #ff6b6b; /* Red error tag */
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
  border: 1px solid rgba(255, 99, 103, 0.25); /* Tinted red border */
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.12), 0 0 30px rgba(255, 60, 60, 0.08); /* Reddish glow */
}

.error-title {
  margin-bottom: 1rem;
  color: #ff6b6b;
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  animation: pulse-title 2s infinite;
}

.panic-text {
  margin: 0;
  padding: 0 0 1.5rem 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: rgba(224, 238, 255, 0.75);
  font-size: 0.8rem;
  line-height: 1.4;
  border-bottom: 1px dashed rgba(255, 99, 103, 0.3);
}

.status-line {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: #cfe8ff;
}

.status-label {
  color: #ff6b6b;
}

.status-text {
  flex: 1;
  color: #f8fbff;
}

.cursor {
  color: #7ee7d6; /* Keep the cursor teal so it bridges back to the boot sequence */
  animation: blink 0.9s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

@keyframes pulse-title {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@media (max-width: 640px) {
  .boot-screen { padding-top: 2.25rem; padding-bottom: 2.25rem; }
  .boot-header, .status-line { letter-spacing: 0.08em; }
  .diagnostic-panel { padding: 1rem 0.8rem; }
  .panic-text { font-size: 0.7rem; }
}
</style>