<template>
  <div>
    <h1>projects</h1>
    <o-button @click.prevent="handleAdd">add</o-button>

    <p v-for="(result, index) of results" :key="index">
      {{ result.text }} -
      <span @click.prevent="handleDelete(result.id)">delete</span>
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

// IMPORTANT: ENABLE RLS!!!!!

const { data: notes } = await useAsyncData("notes", async () => {
  const rawResults = await client.from("notes").select("*").order("created_at");
  results.value = rawResults.data;
  return client.from("notes").select("*").order("created_at");
});

// ADDING

const handleAdd = async () => {
  await client
    .from("notes")
    .insert({ text: `new text ${Math.random() * 10000}` });

  results.value = [
    ...results.value,
    { text: `new text ${Math.random() * 10000}` },
  ];
};

// DELETING
const handleDelete = async (id) => {
  await client.from("notes").delete().match({ id });

  results.value = results.value.filter((result) => result.id !== id);
};

// client.from("notes").insert({ text: `new text ${Math.random() * 10000}` });
console.log("notes:", notes.value);
</script> 