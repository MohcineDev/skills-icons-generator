<script setup>
import { ref, computed } from "vue";
import Fuse from "fuse.js";
import { icons } from "../data/icons";

const search = ref("");
const selected = defineModel();

const fuse = new Fuse(icons, {
  keys: ["name"],
  threshold: 0.4,
});

const results = computed(() => {
  if (!search.value) return [];
  return fuse.search(search.value).map(r => r.item);
});

function addSkill(skill) {
  if (!selected.value.find(s => s.slug === skill.slug)) {
    selected.value.push(skill);
  }
  search.value = "";
}
</script>

<template>
  <div class="relative">
    <input
      v-model="search"
      placeholder="Search skills..."
      class="w-full p-3 rounded bg-gray-800 border border-gray-700"
    />

    <ul
      v-if="results.length"
      class="absolute w-full bg-gray-800 border border-gray-700 mt-1 rounded max-h-40 overflow-y-auto"
    >
      <li
        v-for="skill in results"
        :key="skill.slug"
        @click="addSkill(skill)"
        class="p-2 hover:bg-gray-700 cursor-pointer"
      >
        {{ skill.name }}
      </li>
    </ul>
  </div>
</template>