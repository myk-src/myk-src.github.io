<script setup lang="ts">
import { ref, shallowRef, onMounted, nextTick, provide, defineAsyncComponent, inject, type Ref } from 'vue';
import HelpOutput from '@/components/HelpOutput.vue';
import ManualPage from '@/components/ManualPage.vue';
import resumeData from '@/data/resume.json';
import type { Resume } from '@/utils/types';
import { commands, type Command } from '@/utils/commands';
import { systemInfo } from '@/utils/system';
import { useFileSystem } from '@/composables/useFileSystem';
import { useTerminalInput } from '@/composables/useTerminalInput';
import { useCommandExecutor } from '@/composables/useCommandExecutor';

const AboutContent = defineAsyncComponent(() => import('@/components/AboutContent.vue'));
const ResumeContent = defineAsyncComponent(() => import('@/components/ResumeContent.vue'));
const SkillsContent = defineAsyncComponent(() => import('@/components/SkillsContent.vue'));
const ContactContent = defineAsyncComponent(() => import('@/components/ContactContent.vue'));
const ProjectsContent = defineAsyncComponent(() => import('@/components/ProjectsContent.vue'));

// System State
const view = ref('console');

const theme = inject('theme') as Ref<string>;

const user = systemInfo.get('user') + '@' + window.location.toString().split('/')[2];
const os = systemInfo.get('os');
const osShort = systemInfo.get('osAbbr');
const version = systemInfo.get('version');

// Reactive State
const commandsRan = ref<{ id: number, command: string, parameters: string[], path: string, output: string }[]>([]);
const bottomRef = ref<HTMLElement | null>(null);
const resumes = shallowRef<Resume[]>([]);

// UI Visibility State
const showHeader = ref(false);
const showHelpPrompt = ref(false);
const showUserInput = ref(false);


// Setup Composables
const fileSystem = useFileSystem();
const { currentPath } = fileSystem;
const { input, inputField, commandHistory, currentCommandIndex, suggestion, caretOffset, syncCursorPosition, handleKeyDown, focusInput } = useTerminalInput();
const { runCommand } = useCommandExecutor(view, theme, commandsRan, fileSystem, user);

function handleSubmit() {
  if (input.value.trim() !== '') {
    commandHistory.value.push(input.value);
    currentCommandIndex.value = -1; // Reset command history index
    const [command, ...parameters] = input.value.split(' ');
    runCommand(command, parameters);
  } else {
    input.value = ' ';
    runCommand('', []);
  }

  input.value = '';
  suggestion.value = '';

  if (view.value === 'console') {
    nextTick(() => {
      bottomRef.value?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

provide('resumes', resumes);

onMounted(() => {
  resumes.value = resumeData as Resume[];
  showHeader.value = true;
  setTimeout(() => {
    showHelpPrompt.value = true;
    setTimeout(() => {
      if (resumes.value && resumes.value.length > 0) {
        showUserInput.value = true;
      }
    }, 500); // .5 second delay for user input prompt
  }, 1000); // 1 second delay for help prompt
});
</script>

<template>
  <main>
    <span class="navbar">
      <span class="buttons">
        <button class="button close"></button>
        <button class="button minimize"></button>
        <button class="button maximize"></button>
      </span>
      <span class="title">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem"
          viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
            <path d="M2360 5049 c-154 -11 -357 -47 -516 -93 -902 -259 -1603 -1017 -1790
          -1934 -136 -669 -8 -1355 354 -1908 255 -390 580 -686 968 -886 141 -73 341
          -154 403 -164 58 -9 109 19 133 73 18 40 18 60 12 286 l-7 243 -86 -14 c-97
          -15 -256 -9 -386 13 -105 19 -211 71 -278 139 -53 53 -67 76 -136 229 -63 139
          -135 231 -232 297 -66 46 -121 106 -117 128 6 30 48 43 121 38 141 -10 288
          -113 393 -274 72 -110 143 -179 230 -222 62 -31 79 -35 169 -38 103 -4 207 12
          291 44 41 16 43 18 58 85 19 86 56 164 106 228 l39 49 -82 11 c-264 38 -452
          102 -627 215 -229 148 -365 379 -431 731 -20 109 -23 389 -5 492 29 167 98
          319 200 445 l45 55 -20 62 c-52 168 -42 372 28 574 18 50 22 52 103 48 118 -6
          371 -108 543 -218 l71 -46 56 11 c30 6 87 18 127 27 271 58 655 58 926 0 40
          -9 97 -21 127 -27 l55 -10 95 58 c226 137 484 230 575 206 26 -7 33 -17 53
          -75 43 -125 55 -210 50 -351 -4 -95 -11 -148 -26 -195 l-21 -64 44 -54 c89
          -109 155 -244 192 -389 22 -89 25 -417 4 -544 -32 -198 -114 -406 -210 -532
          -165 -217 -464 -366 -843 -418 l-87 -12 39 -49 c47 -60 85 -137 106 -221 14
          -52 17 -137 20 -503 5 -490 5 -489 72 -521 46 -21 83 -15 229 42 738 284 1320
          932 1533 1703 141 513 111 1108 -80 1601 -172 440 -475 842 -848 1122 -405
          303 -865 474 -1367 507 -175 12 -192 12 -375 0z" />
          </g>
        </svg>
        github.com/{{ systemInfo.get('owner') }}
      </span>
      <span class="blank"></span>
    </span>
    <div class="body" @click="focusInput">
      <template v-if="view === 'console'" class="content">
        <span id="headers" v-if="showHeader">{{ os }} ({{ osShort }}) {{ version }} </span>
        <br v-if="showHeader" />

        <pre>
  ███╗   ███╗██╗   ██╗██╗  ██╗     ██████╗    ███████╗   
  ████╗ ████║╚██╗ ██╔╝██║ ██╔╝    ██╔═══██╗   ██╔════╝   
  ██╔████╔██║ ╚████╔╝ █████╔╝     ██║   ██║   ███████╗   
  ██║╚██╔╝██║  ╚██╔╝  ██╔═██╗     ██║   ██║   ╚════██║   
  ██║ ╚═╝ ██║   ██║   ██║  ██╗    ╚██████╔╝██╗███████║██╗
  ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚═════╝ ╚═╝╚══════╝╚═╝ {{ version }}</pre>

        <span v-if="showHelpPrompt">Type `<code>man</code>` for a list of commands.</span><br v-if="showHelpPrompt" />
        <span v-if="showHelpPrompt">Type `<code>portfolio</code>` to view full portfolio.</span><br
          v-if="showHelpPrompt" />

        <div v-for="command in commandsRan" :key="command.id"> <span id="user">{{
          user.split('@')[0] }}</span><span id="ampersand">@</span><span id="machine">{{ user.split('@')[1]
            }}</span><span>:</span>
          <span id="path">{{ command.path.length === 1 ? "~" : "~/" + command.path.slice(1) }}</span>$
          <span class="code">{{ command.command + " " }}</span>
          <span class="code" v-for="(parameter, index) in command.parameters" :key="index"> {{ parameter + " " }}</span>
          <br />

          <HelpOutput v-if="command.output == 'man'" :commands="commands" />
          <ManualPage
            v-else-if="command.output.startsWith('man') && command.output.split(' ').length > 1 && commands.get(command.output.split(' ')[1] as Command)"
            :command="commands.get(command.output.split(' ')[1] as Command)!" />
          <span v-else-if="command.output === 'theme'">
            Current theme: <span id="headers">{{ theme }}</span><br />
            For list of themes, run <code>theme -l</code>.<br />
            To change themes, run <code>theme &lt;theme_name&gt;</code>.<br />
          </span>
          <pre class="error"
            v-else-if="command.command === 'theme' && command.parameters.length === 1 && command.output.includes('not found')">{{ command.output }}</pre>
          <pre v-else-if="command.command === 'theme' && command.parameters.length === 1">{{ command.output }}</pre>
          <pre
            v-else-if="['resume', 'about', 'projects', 'contact', 'skills', 'portfolio'].includes(command.command) && command.parameters.length < 1"></pre>
          <pre id="headers"
            v-else-if="['uname', 'whoami'].includes(command.command) && command.parameters.length < 1">{{ command.output }}</pre>
          <pre v-else-if="command.command === 'echo' && command.parameters.length > 0">{{ command.output }}</pre>
          <span v-else-if="command.command === 'echo' && command.parameters.length === 0">
            <span>echo</span> <span style="font-size: 75%;">echo</span> <span style="font-size: 50%;">echo</span> <span style="font-size: 25%;">echo</span> <br />
          </span>
          <pre
            v-else-if="['cat', 'less', 'wc'].includes(command.command) && !command.output.includes('directory') && !command.output.includes('Invalid')">{{ command.output }}</pre>
          <pre id="headers"
            v-else-if="command.command === 'pwd' && command.parameters.length < 1">{{ command.output }}</pre>
          <pre class="error" v-else v-html="command.output"></pre>
        </div>
      </template>
      <div v-else-if="view !== 'console' && view !== 'portfolio'" class="content">
        <div class="secondary-header">
          <span>{{ view }}(1)</span>
          <span id="headers">{{ view.charAt(0).toUpperCase() + view.slice(1) }}</span>
          <span>{{ view }}(1)</span>
        </div>
        <br />

        <AboutContent v-if="view === 'about'" />
        <ResumeContent v-else-if="view === 'resume'" />
        <ProjectsContent v-else-if="view === 'projects'" />
        <SkillsContent v-else-if="view === 'skills'" />
        <ContactContent v-else-if="view === 'contact'" />
      </div>
      <div v-else-if="view === 'portfolio'" class="content">
        <div class="secondary-header">
          <span>portfolio(1)</span>
          <span id="headers">Portfolio</span>
          <span>portfolio(1)</span>
        </div>
        <br />
        <div id="headers" style="text-align: center;">About Me</div>
        <AboutContent />
        <br />
        <div id="headers" style="text-align: center;">My Skills</div>
        <SkillsContent />
        <br />
        <div id="headers" style="text-align: center;">Projects Experience</div>
        <ProjectsContent />
        <br />
        <div id="headers" style="text-align: center;">My Resume</div>
        <ResumeContent />
        <br />
        <div id="headers" style="text-align: center;">Contact Me</div>
        <ContactContent />
      </div>

      <div v-if="showUserInput" :class="view === 'console' ? 'command-line-container' : 'input-line-container'">
        <span v-if="view === 'console'">
          <span id="user">{{ user.split('@')[0] }}</span><span id="ampersand">@</span><span id="machine">{{
            user.split('@')[1]
            }}</span><span>:</span>
          <span id="path">{{ currentPath.length === 1 ? "~" : "~/" + currentPath.slice(1) }}</span>$&nbsp;
        </span>
        <span v-else>:</span>
        <form @submit.prevent="handleSubmit" class="input-form">
          <span class="blinking-cursor" :style="{ left: caretOffset }"></span>
          <input ref="inputField" v-model="input" type="text" class="input-text" @keydown="handleKeyDown"
            @keyup="syncCursorPosition" @click="syncCursorPosition" @input="syncCursorPosition" />
          <span class="suggestion" v-if="suggestion" :style="{ left: input.length + 'ch' }">{{ suggestion.replace(input, '')
            }}</span>
        </form>
      </div>

      <div ref="bottomRef"></div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 90%;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
}

.navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 1px solid color-mix(in srgb, var(--border-color) 8%, transparent);
  border-radius: 16px 16px 0 0;
  border-bottom: none !important;
  color: #ffffff;
  background-color: color-mix(in srgb, var(--background-color) 65%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.title {
  display: flex;
  align-items: center;
}

svg {
  margin-right: .25rem;
}

.buttons,
.blank {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10px;
  margin: 0 5px;
}

.button {
  width: 5px;
  height: 11px;
  border-radius: 50%;
  border: none;
}

.button.close {
  background-color: #FF5C57;
}

.button.minimize {
  background-color: #FFBD2E;
  margin: 0 5px;
}

.button.maximize {
  background-color: #27C93F;
}

.body {
  flex-grow: 1;
  font-family: monospace;
  height: 100%;
  width: 100%;
  color: var(--text-color);
  overflow: scroll;
  padding: 10px;
  border-radius: 0 0 16px 16px;
  border: 1px solid color-mix(in srgb, var(--border-color) 8%, transparent);
  border-top: none !important;

  /* Firefox */
  scrollbar-width: none;

  /* Internet Explorer and Legacy Edge */
  -ms-overflow-style: none;

  background-color: color-mix(in srgb, var(--background-color) 50%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.content {
  padding: 1rem;
}

/* Chrome, Safari, and Opera */
.body::-webkit-scrollbar {
  display: none;
}

.secondary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

pre {
  line-height: normal;
}

.error {
  color: var(--error-color);
}

#headers {
  color: var(--header-color);
  text-decoration: none !important;
  font-style: normal !important;
  font-weight: bolder;
}

#user {
  color: var(--user-color);
  text-decoration: none !important;
  font-style: normal !important;
}

#ampersand {
  color: var(--ampersand-color);
  text-decoration: none !important;
  font-style: normal !important;
}

#machine {
  color: var(--machine-color);
  text-decoration: none !important;
  font-style: normal !important;
}

#path {
  color: var(--path-color);
  text-decoration: none !important;
  font-style: normal !important;
}

input {
  background-color: transparent;
  color: var(--input-color);
  border: none;
  font-family: monospace;
  padding: 0;
  margin: 0;
  outline: none;
}

.suggestion {
  color: var(--input-color);
  opacity: 0.5;
  position: absolute;
  left: 0;
  pointer-events: none;
  white-space: pre;
  font-family: monospace;
  line-height: normal;
}

.code {
  color: var(--input-color);
}

code {
  font-weight: bolder;
  color: var(--input-color)
}

.input-line-container {
  display: flex;
  width: 100%;
  position: sticky;
  bottom: 0;
  margin-bottom: -.75rem;
  padding-bottom: .75rem;
  padding-top: 0.75rem;
  z-index: 10;

  background-color: color-mix(in srgb, var(--background-color) 80%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.command-line-container {
  display: flex;
  width: 100%;

  background-color: transparent;
}

.input-form {
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-grow: 1;
}

.input-text {
  width: auto;
  flex-grow: 1;
  caret-color: transparent;
}

.blinking-cursor {
  display: block;
  width: 1ch;
  position: absolute;
  background-color: var(--input-color);
  animation: blink 1s linear infinite;
}

.input-form:not(:focus-within) .blinking-cursor {
  background-color: transparent !important;
  border: 1px solid var(--input-color);
}

@keyframes blink {

  from,
  to {
    background-color: transparent;
    border-color: transparent;
  }

  50% {
    background-color: var(--input-color);
    border-color: var(--input-color);
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
</style>
