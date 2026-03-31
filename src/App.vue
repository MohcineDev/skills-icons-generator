<script setup>
import { ref } from "vue";
import SkillInput from "./components/SkillInput.vue";
import IconPreview from "./components/IconPreview.vue";
import MarkdownOutput from "./components/MarkdownOutput.vue";

const skills = ref([]);
</script>

<template>
  <div style="max-width:700px; margin:auto;">
    <h1>GitHub Skills Generator</h1>

    <SkillInput v-model="skills" />

    <h2>Preview</h2>
    <IconPreview :skills="skills" />

    <h2>Markdown</h2>
    <MarkdownOutput :skills="skills" />
  </div>
</template>