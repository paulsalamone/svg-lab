<template>
  <div>
    <h1>projects</h1>
    <p>results: {{ results ? results.length : null }}</p>
    <p v-for="(result, index) of results" :key="result.id">
      {{ result.text }}
    </p>
    <!-- <p>{{ results[0].text }}</p>
    <p>{{ results[1].text }}</p>
    <p>{{ results[2].text }}</p> -->
  </div>
</template>

<script setup >
import { ref } from "vue";
const client = useSupabaseClient();
const results = ref(null);

const { data: notes } = await useAsyncData("notes", async () => {
  const rawResults = await client.from("notes").select("*").order("created_at");
  results.value = rawResults.data;
  return client.from("notes").select("*").order("created_at");
});

console.log("notes:", notes.value);
</script> 