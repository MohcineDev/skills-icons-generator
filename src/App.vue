<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import rawData from "./data/simple-icons.json";
import SkillInput from "./components/SkillInput.vue";
import MarkdownOutput from "./components/MarkdownOutput.vue";

const route = useRoute();
const router = useRouter();
const selectedSkills = ref([]);

 const allIcons = rawData.map((icon) => ({
  name: icon.title,
  slug: icon.title
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9]/g, ""),
  hex: icon.hex,
}));

function syncUrlToState() {
  const param = route.params.skills;
  if (!param) {
    selectedSkills.value = [];
    return;
  }

  const slugsFromUrl = param.split("+").map(s => s.toLowerCase().trim());
  
  selectedSkills.value = allIcons.filter(icon => {
    const matchesSearchTerm = icon.searchTerms?.includes(part); 
    
    return slugsFromUrl.some(part => 
      (icon.searchTerms && icon.searchTerms.includes(part)) || 
      icon.slug === part || 
      icon.name.toLowerCase() === part
    );
  });
}

watch(
  selectedSkills,
  (newList) => {
    const path = newList.map(s => s.slug).join("+");
    router.replace(path ? `/${path}` : "/");
  },
  { deep: true }
);
 
onMounted(syncUrlToState);
watch(() => route.params.skills, syncUrlToState);
 
 const currentUrl = computed(() => {
  return typeof window !== 'undefined' ? window.location.href : '';
});
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12">
    <div class="max-w-3xl mx-auto space-y-10">
      
      <header class="text-center space-y-2">
        <h1 class="text-4xl font-black tracking-tight">
          <span class="text-blue-500">⚡</span> Skill Icon Mapper
        </h1>
        <p class="text-gray-400">Generate colored icons for your GitHub profile.</p>
      </header>

      <section class="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <label class="block text-sm font-medium mb-2 text-gray-300">Search or type skills:</label>
        <SkillInput v-model="selectedSkills" :iconList="allIcons" />
      </section>

      <section v-if="selectedSkills.length > 0" class="space-y-4">
        <h2 class="text-lg font-semibold flex items-center gap-2">
          Preview
          <span class="text-xs font-normal bg-gray-700 px-2 py-0.5 rounded text-gray-400">
            {{ selectedSkills.length }} selected
          </span>
        </h2>
        <div class="bg-gray-800 p-8 rounded-xl border border-gray-700 flex flex-wrap justify-center gap-8">
          <div 
            v-for="skill in selectedSkills" 
            :key="skill.slug"
            class="flex flex-col items-center gap-3 group relative"
          >
            <Icon 
              :icon="`simple-icons:${skill.slug}`" 
              :style="{ color: `#${skill.hex}` }"
              class="text-5xl transition-transform group-hover:scale-110"
            />
            <span class="text-[10px] uppercase tracking-widest font-bold text-gray-500">
              {{ skill.name }}
            </span>
            
            <button 
              @click="selectedSkills = selectedSkills.filter(s => s.slug !== skill.slug)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      </section>

      <section v-if="selectedSkills.length > 0" class="space-y-4">
        <h2 class="text-lg font-semibold">README Markdown</h2>
        <MarkdownOutput :skills="selectedSkills" />
      </section>

      <footer class="text-center pt-10 border-t border-gray-800">
        <p class="text-xs text-gray-500 mb-2 uppercase tracking-widest">Shareable URL</p>
        <code class="bg-black/30 px-4 py-2 rounded text-blue-400 text-sm break-all">
          {{ currentUrl }}
        </code>
      </footer>
      
    </div>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>