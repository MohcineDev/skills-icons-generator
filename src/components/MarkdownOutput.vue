<script setup>
import { computed } from "vue";

const props = defineProps(["skills"]);

const markdown = computed(() => {
  return props.skills
    .map(
      s =>
        `<img src="https://cdn.simpleicons.org/${s.slug}" width="40" />`
    )
    .join("\n");
});

function copy() {
  navigator.clipboard.writeText(markdown.value);
  alert("Copied!");
}
</script>

<template>
  <div>
    <textarea :value="markdown" rows="6" readonly />
    <button @click="copy">Copy</button>
  </div>
</template>