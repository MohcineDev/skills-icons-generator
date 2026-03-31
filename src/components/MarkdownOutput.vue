<script setup>
import { computed } from "vue";

const props = defineProps(["skills"]);

const markdown = computed(() =>
  props.skills
    .map(s => {
      const iconUrl = `https://api.iconify.design/simple-icons:${s.slug}.svg?color=%23${s.hex}`;
      return `<img src="${iconUrl}" width="40" height="40" alt="${s.name}" />`;
    })
    .join(" ")
);

function copy() {
  navigator.clipboard.writeText(markdown.value);
}
</script>

<template>
  <div>
    <textarea
      :value="markdown"
      rows="6"
      class="w-full p-2 bg-gray-900 border border-gray-700 rounded"
      readonly
    />
    <button
      @click="copy"
      class="mt-2 px-4 py-2 bg-blue-600 rounded"
    >
      Copy
    </button>
  </div>
</template>