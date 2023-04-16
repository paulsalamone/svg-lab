<template>
  <div class="c-prompter">
    <form action="" @submit.prevent="handleSubmit">
      <textarea
        cols="50"
        rows="3"
        type="text"
        v-model="promptText"
        placeholder="instructions:"
      ></textarea>
      <!-- @keydown.enter.prevent="handleSubmit" -->
      <br />
      <o-button type="submit">submit</o-button>
      <o-button @click.prevent="handleClear">clear</o-button>
    </form>
    <p>loading: {{ loading }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Configuration, OpenAIApi } from "openai";

// SUBMISSION + API

const promptText = ref("");
const loading = ref(false);
const apiResponse = ref(null);
const apiResponseCleaned = ref(null);
const apiComment = ref(null);
const apiPrompt = ref(null);

const handleSubmit = () => {
  console.log("submit");
  loading.value = true;
  apiPrompt.value = promptText.value;
  console.log("apiPrompt.value: ", apiPrompt.value);

  async function generateResponse() {
    console.log(import.meta.env.VITE_API_KEY);

    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please return SVG code for the following instructions: ${promptText.value}`,
      temperature: 0.1,
      max_tokens: 500,
    });

    // RAW RESPONSE
    apiResponse.value = response.data.choices[0].text.trim();
    console.log("original response:", apiResponse.value);

    // GET SVG
    const svgRegex = /<svg[^>]*>[\s\S]*<\/svg>/i;
    const svgMatch = apiResponse.value.match(svgRegex);
    apiResponseCleaned.value = svgMatch ? svgMatch[0] : "";
    console.log("cleaned response:", apiResponseCleaned.value);

    // SET COMMENT & PROMPT
    apiComment.value = apiResponse.value.split("<svg")[0];

    // RESET THE FORM
    apiResponse.value = "";
    promptText.value = "";
    loading.value = false;
  }

  generateResponse(); // call the function to execute it
};

// CLEARING
const handleClear = () => {
  promptText.value = "";
  apiResponse.value = "";
  loading.value = false;
};
</script>
<style lang="scss" src="./index.scss">
</style>