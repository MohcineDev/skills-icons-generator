<script setup>
import { ref, computed } from "vue";
import { icons } from "../data/icons";

const search = ref("");
const selected = defineModel();

const filtered = computed(() =>
  icons.filter(i =>
    i.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

function addSkill(skill) {
  if (!selected.value.find(s => s.slug === skill.slug)) {
    selected.value.push(skill);
  }
}
</script>

<template>
  <div>
    <input v-model="search" placeholder="Search skills..." />

    <ul v-if="search">
      <li v-for="skill in filtered" :key="skill.slug" @click="addSkill(skill)">
        {{ skill.name }}
      </li>
    </ul>
  </div>
</template>