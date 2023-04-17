<template>
  <div>
    <h2>output</h2>
    <p>{{ store.loading }}</p>
    <p>{{ store.responses }}</p>
  </div>
</template>

<script setup>
import { usePromptStore } from "../../../stores/prompt";
const store = usePromptStore();
</script>
<style lang="scss" src="./index.scss">
</style>