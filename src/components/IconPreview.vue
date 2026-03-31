<script setup>
defineProps(["skills"]);
</script>

<template>
  <div style="display:flex; gap:10px; flex-wrap:wrap;">
    <img
      v-for="skill in skills"
      :key="skill.slug"
      :src="`https://cdn.simpleicons.org/${skill.slug}`"
      width="40"
    />
  </div>
</template>