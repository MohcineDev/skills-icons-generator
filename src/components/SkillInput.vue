<script setup>
import { ref, computed } from "vue";
import Fuse from "fuse.js";

const props = defineProps(['iconList']);
const search = ref("");
const selected = defineModel();

// Search configuration
const fuse = new Fuse(props.iconList, {
  keys: ["name", "searchTerms"],
  threshold: 0.3, // Lower is stricter, 0.3 is good for accuracy
});

const results = computed(() => {
  if (!search.value) return [];
  return fuse.search(search.value).map(r => r.item).slice(0, 8); // Show top 8
});

function addSkill(skill) {
  if (!selected.value.find(s => s.slug === skill.slug)) {
    selected.value.push(skill);
  }
  search.value = ""; // Clear input after adding
}
</script>

<template>
  <div class="relative">
    <input
      v-model="search"
      type="text"
      placeholder="Search icons (e.g. Photoshop, VS Code, Vue...)"
      class="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none transition-all"
    />

    <ul v-if="results.length" class="absolute w-full z-50 bg-gray-800 border border-gray-700 mt-2 rounded-lg shadow-2xl overflow-hidden">
      <li
        v-for="skill in results"
        :key="skill.slug"
        @click="addSkill(skill)"
        class="p-3 hover:bg-blue-600 flex items-center justify-between cursor-pointer transition-colors"
      >
        <span class="font-medium">{{ skill.name }}</span>
        <span class="text-xs opacity-50">{{ skill.slug }}</span>
      </li>
    </ul>
  </div>
</template>