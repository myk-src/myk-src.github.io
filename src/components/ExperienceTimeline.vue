<template>
  <div class="timeline-container">
    <div v-for="(node, index) in timelineNodes" :key="index" class="timeline-segment">
      
      <div class="node-label top">
        <span class="headers">{{ node.topTitle }}</span>
        <span class="dates">{{ node.topDate }}</span>
      </div>

      <div class="node-track">
        <div class="track-line" :class="node.leftLine"></div>
        <span class="track-char">{{ node.char }}</span>
        <div class="track-line" :class="node.rightLine"></div>
        <span v-if="index === timelineNodes.length - 1" class="track-char">→</span>
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
      bottomTitle: '',
      bottomDate: '',
      char: '╩',
      leftLine: 'fade-dashed',
      rightLine: 'dotted'
    },
    {
      topTitle: formatJobTitle(exp(0)),
      topDate: formatDate(exp(0).start),
      bottomTitle: `SWE ${exp(0).type || ''} end`,
      bottomDate: formatDate(exp(0).end),
      char: '╬',
      leftLine: 'double',
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
      bottomTitle: '',
      bottomDate: '',
      char: '╩',
      leftLine: 'double',
      rightLine: 'double'
    },
    {
      topTitle: '',
      topDate: '',
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
.timeline-container {
  display: flex;
  width: 100%;
  margin: 2rem 0;
  overflow-x: auto;
  scrollbar-width: thin;
}
.timeline-segment {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 160px;
}
.node-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 3.5rem;
  white-space: nowrap;
}
.node-label.top { justify-content: flex-end; padding-bottom: 0.25rem; }
.node-label.bottom { justify-content: flex-start; padding-top: 0.25rem; }
.node-track {
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--text-color);
}
.track-char { font-weight: bold; font-size: 1rem; line-height: 1; }
.track-line { flex-grow: 1; height: 0; margin: 0; }
.track-line.double { border-top: .2rem double var(--text-color); }
.track-line.dotted { border-top: .2rem dotted var(--text-color); }
.track-line.none { border-top: .2rem solid transparent; }
.track-line.fade-dashed {
  border-top: .2rem dotted var(--text-color);
  mask-image: linear-gradient(to left, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, black 50%, transparent 100%);
}
.track-line.dashed-fade {
  border-top: .2rem dotted var(--text-color);
  mask-image: linear-gradient(to right, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 50%, transparent 100%);
}
.headers { color: var(--header-color); }
.dates { color: var(--user-color); }
</style>