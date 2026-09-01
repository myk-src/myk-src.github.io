<template>
  <div class="timeline-container">
    <div v-for="(node, index) in timelineNodes" :key="index" class="timeline-segment">
      
      <div class="node-label top">
        <span class="headers">{{ node.topTitle }}</span>
        <span class="dates">{{ node.topDate }}</span>
      </div>

      <div class="node-track">
        <div class="track-line left" :class="node.leftLine"></div>
        <span class="track-char">{{ node.char }}</span>
        <div class="track-line right" :class="node.rightLine"></div>
        <span v-if="index === timelineNodes.length - 1" class="track-arrow">→</span>
      </div>

      <div class="node-label bottom">
        <span class="dates">{{ node.bottomDate }}</span>
        <span class="headers">{{ node.bottomTitle }}</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Resume, Experience } from '@/utils/types.js';

const props = defineProps<{
  resume: Resume
}>();

// Helpers
const exp = (index: number): Partial<Experience> => {
  return props.resume?.experience?.[index] || {};
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Present';
  return dateString.replace('-', '.').split('-')[0];
};

const formatJobTitle = (job: Partial<Experience>, company?: string) => {
  if (!job.role || !job.company) return '';
  
  let title = job.role.replace('Software Engineer', 'SWE').replace('Hardware Engineer', 'HWE');

  // if (job.type !== 'Full-Time') {
  //   title += ` ${job.type?.replace('Part-Time', '(PT)')}`;
  // } 

  return `${title} @ ${company || job.company}`;
};

// Node Mapping
const timelineNodes = computed(() => {
  if (!props.resume) return [];
  
  return [
    {
      topTitle: 'BS CS @ GT',
      topDate: '2022.08',
      bottomTitle: ' ',
      bottomDate: ' ',
      char: '╩',
      leftLine: 'fade-dashed',
      rightLine: 'dashed-fade'
    },
    {
      topTitle: formatJobTitle(exp(0)),
      topDate: formatDate(exp(0).start),
      bottomTitle: `SWE ${exp(0).type || ''} end`,
      bottomDate: formatDate(exp(0).end),
      char: '╬',
      leftLine: 'fade-dashed',
      rightLine: 'double'
    },
    {
      topTitle: formatJobTitle(exp(1)),
      topDate: formatDate(exp(1).start),
      bottomTitle: `SWE ${exp(1).type || ''} end`,
      bottomDate: formatDate(exp(1).end),
      char: '╬',
      leftLine: 'double',
      rightLine: 'double'
    },
    {
      topTitle: formatJobTitle(exp(2), 'GTRI'),
      topDate: formatDate(exp(2).start),
      bottomTitle: `R&D HWE ${exp(2).type?.replace('Part-Time', '(PT)') || ''} end`,
      bottomDate: formatDate(exp(2).end),
      char: '╬',
      leftLine: 'double',
      rightLine: 'double'
    },
    {
      topTitle: `Graduate BS CS`,
      topDate: formatDate(props.resume.education?.expected_grad_date),
      bottomTitle: ' ',
      bottomDate: ' ',
      char: '╩',
      leftLine: 'double',
      rightLine: 'double'
    },
    {
      topTitle: ' ',
      topDate: ' ',
      bottomTitle: formatJobTitle(exp(3)),
      bottomDate: formatDate(exp(3).start),
      char: '╦',
      leftLine: 'double',
      rightLine: 'dashed-fade'
    },
  ];
});
</script>

<style scoped>
@media (max-width: 767px) {
  .timeline-container {
    display: none !important;
  }
}
.timeline-container {
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
  align-items: center;
  justify-content: center;
}
.timeline-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 1px;
  max-width: 75vw;
}
.node-label {
  font-size: .75rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  height: 3rem;
}
.node-label.top { justify-content: flex-end; padding-bottom: 0.25vw; }
.node-label.bottom { justify-content: flex-start; padding-top: 0.25vw; }
.node-track {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  color: var(--text-color);
}
.track-char { 
  font-weight: bold; 
  font-size: 1.1rem; 
  z-index: 2;
}
.track-arrow {
  font-weight: bold;
  white-space: pre;
}
.track-line { 
  font-size: 1.1rem; 
  flex: 1; 
  overflow: hidden; 
  white-space: nowrap;
  display: flex;
}
.track-line.right { justify-content: flex-start; }
.track-line.left { justify-content: flex-end; }
.track-line::before {
  display: block;
}
.track-line.dotted::before { content: "........................................................................................................."; }
.track-line.double::before { content: "═════════════════════════════════════════════════════════════════════════════════════════════════════════"; }
.track-line.none { border-top: .2rem solid transparent; }
.track-line.fade-dashed::before {
  content: "─═─═─═─═─═";
  mask-image: linear-gradient(to left, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, black 50%, transparent 100%);
}
.track-line.dashed-fade::before {
  content: "─═─═─═─═─═";
  mask-image: linear-gradient(to right, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 50%, transparent 100%);
}
.headers { color: var(--header-color); }
.dates { color: var(--user-color); }
</style>