<template>
  <div class="c-prompter">
    <textarea
      cols="50"
      rows="3"
      type="text"
      v-model="promptText"
      placeholder="instructions:"
      @keydown.enter.prevent="handleSubmit"
    ></textarea>
    <br />
    <o-button type="submit">submit</o-button>
    <!-- <o-button @click.prevent="handleClear">clear</o-button> -->
    <p>loading: {{ store.loading }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Configuration, OpenAIApi } from "openai";
// icons: https://pictogrammers.com/library/mdi/
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiContentSave } from "@mdi/js";
import { usePromptStore } from "../../../stores/prompt";
const store = usePromptStore();

// SUBMISSION + API
const promptText = ref("");

const serverMessages = ref([]);

const handleSubmit = async () => {
  store.setLoading(true);

  store.setResponses({
    role: "user",
    content: promptText.value,
  });

  async function generateResponse() {
    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    serverMessages.value.push({
      role: "user",
      content: `${promptText.value}. Please respond with a block of SVG code. Please do not include any additional commentary before or after the SVG code. Every response should start with "<svg" and end with "</svg>". Do not add any characters before or after these SVG tags. Please make sure the SVG viebox is not taller than 400px. Please give it a 1px grey border.`,
    });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...serverMessages.value],
    });
    console.log(completion.data.choices[0].message);

    serverMessages.value.unshift(completion.data.choices[0].message);
    // store.serverMessages.value.unshift(completion.data.choices[0].message);

    store.setResponses(completion.data.choices[0].message);

    // store.responses.value.unshift(completion.data.choices[0].message);

    store.formattedResponses.value.unshift({
      prompt: promptText.value,
      code: completion.data.choices[0].message.content,
    });
  }

  await generateResponse();
  promptText.value = "";
  store.setLoading(false);
};

// ICONS / UTILITIES
const path = ref(mdiContentSave);
</script>
<style lang="scss" src="./index.scss">
</style>