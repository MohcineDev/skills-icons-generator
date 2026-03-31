<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { icons } from "./data/icons";
import SkillInput from "./components/SkillInput.vue";
import IconPreview from "./components/IconPreview.vue";
import MarkdownOutput from "./components/MarkdownOutput.vue";

const router = useRouter();
const selectedSkills = ref([]);

// ✅ State -> URL (Still updates the address bar so you can share the link)
watch(selectedSkills, (newList) => {
  const path = newList.map(s => s.slug).join("+");
  router.replace(path ? `/${path}` : "/");
}, { deep: true });

const currentUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '');
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12 font-sans">
    <div class="max-w-3xl mx-auto space-y-8">
      <header class="text-center">
        <h1 class="text-4xl font-black text-blue-500">⚡ Skill Mapper</h1>
        <p class="text-gray-400 mt-2">Use the search bar below to add icons to your stack</p>
      </header>

      <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl">
        <SkillInput v-model="selectedSkills" :iconList="icons" />
      </div>

      <div v-if="selectedSkills.length > 0" class="space-y-8">
        <div class="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <IconPreview :skills="selectedSkills" />
        </div>
        
        <div class="space-y-2">
          <h2 class="text-sm font-bold uppercase tracking-wider text-gray-500">README Code</h2>
          <MarkdownOutput :skills="selectedSkills" />
        </div>
      </div>

      <footer v-if="selectedSkills.length > 0" class="text-center opacity-50 text-xs pt-10">
        <p class="mb-2">SHAREABLE LINK</p>
        <code class="bg-black/30 px-3 py-1 rounded text-blue-400">{{ currentUrl }}</code>
      </footer>
    </div>
  </div>
</template>