<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps(["skills"]);

function remove(skill) {
  props.skills.splice(props.skills.indexOf(skill), 1);
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div v-for="skill in skills" :key="skill.slug" class="relative group p-2 bg-gray-800 rounded-lg">
      <Icon 
        :icon="`simple-icons:${skill.slug}`" 
        :style="{ color: `#${skill.hex}` }" 
        class="text-4xl"
      />
      
      <button
        @click="remove(skill)"
        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  </div>
</template>