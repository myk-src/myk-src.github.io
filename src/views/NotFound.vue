<template>
  <!-- Swapped the direct reboot call for triggerReboot -->
  <div class="kernel-panic" @click="triggerReboot" tabindex="0" ref="panicScreen" @keydown="triggerReboot">
    <!-- Added a dynamic class that applies the fade-out effect -->
    <pre :class="{ 'fade-out': isRebooting }">
[    0.832714] BUG: unable to handle kernel paging request at 0000000000000404
[    0.832718] IP: [&lt;ffffffff81000404&gt;] route_not_found+0x0/0x10
[    0.832722] PGD 0 
[    0.832724] Oops: 0000 [#1] SMP 
[    0.832727] Modules linked in: web_server vue_router github_pages
[    0.832731] CPU: 0 PID: 1 Comm: init Not tainted MYK.O.S v2026.9
[    0.832734] Hardware name: MYK Custom Architecture
[    0.832736] task: ffff88011a7b0000 ti: ffff88011a7ac000 task.ti: ffff88011a7ac000
[    0.832739] RIP: 0010:[&lt;ffffffff81000404&gt;]  [&lt;ffffffff81000404&gt;] route_not_found+0x0/0x10
[    0.832742] RSP: 0018:ffff88011a7afd78  EFLAGS: 00010246
[    0.832744] RAX: 0000000000000000 RBX: ffff88011a7afdd8 RCX: 0000000000000404
[    0.832746] RDX: 0000000000000000 RSI: 0000000000000000 RDI: 0000000000000000
[    0.832749] CS:  0010 DS: 0000 ES: 0000 CR0: 000000008005003b
[    0.832751] CR2: 0000000000000404 CR3: 000000011a58c000 CR4: 00000000000406f0
[    0.832765] Stack:
[    0.832767]  ffff88011a7afd98 ffffffff81177693 0000000000000404 ffff88011a7afdd8
[    0.832771]  0000000000000000 ffff88011a7afeb8 ffffffff81177fe8 0000000000000000
[    0.832774]  ffffffff81c3c900 ffffffff81c3c900 ffff88011a7b0000 ffff88011a7aff08
[    0.832785] Call Trace:
[    0.832788]  [&lt;ffffffff81177693&gt;] ? resolve_url+0x43/0x60
[    0.832791]  [&lt;ffffffff81177fe8&gt;] ? load_page+0x318/0x450
[    0.832794]  [&lt;ffffffff8167f924&gt;] ? panic+0xc9/0x1e8
[    0.832796] Code: Bad RIP value.
[    0.832799] RIP  [&lt;ffffffff81000404&gt;] route_not_found+0x0/0x10
[    0.832801]  RSP &lt;ffff88011a7afd78&gt;
[    0.832802] CR2: 0000000000000404
[    0.832805] ---[ end trace 4044044044044040 ]---
[    0.832807] Kernel panic - not syncing: Fatal exception in interrupt
[    0.832810] Kernel Offset: disabled
[    0.832812] 
[    0.832815] ERROR 404: PAGE NOT FOUND
[    0.832817] Press any key to reboot into user space... <span class="blink" v-if="!isRebooting">_</span>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const emit = defineEmits(['reboot']);
const panicScreen = ref<HTMLElement | null>(null);
const isRebooting = ref(false); // Track the fading state

// Automatically focus the div so keyboard events are captured instantly
onMounted(() => {
  panicScreen.value?.focus();
});

const triggerReboot = () => {
  // Prevent multiple clicks from restarting the timer
  if (isRebooting.value) return; 

  // 1. Trigger the CSS fade-out animation
  isRebooting.value = true;

  // 2. Wait for the screen to go fully black, then emit the reboot
  setTimeout(() => {
    emit('reboot');
  }, 1200); // 1.2 seconds allows the 1s CSS transition to finish fully
};
</script>

<style scoped>
.kernel-panic {
  background-color: #000000;
  color: #aaaaaa;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.2;
  height: 100%;
  width: 100vw;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  /* Add a smooth transition to the opacity */
  transition: opacity 1s ease-in-out; 
}

/* When this class is applied, the text fades into the black background */
.fade-out {
  opacity: 0;
}

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>