import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
// import { Configuration, OpenAIApi } from 'openai'

export const usePromptStore = defineStore('PromptStore', () => {
    // LOADING
    const loading = ref(false)
    const setLoading = (bool) => {
        console.log("store set loading: ", bool)
        loading.value = bool
    }

    // RESPONSES
    const formattedResponses = ref([]);
    const responses = ref([]);
    const setResponses = (response) => {

        console.log("store set responses: ", response)
        responses.value.unshift(response)
        console.log("responses: ", responses.value)
    }

    // MESSAGES
    const serverMessages = ref([]);
    const setServerMessages = (message) => {
        console.log("store set serverMessages: ", message)
        serverMessages.value.unshift(message)
        console.log("serverMessages: ", serverMessages.value)
    }


    const currentMessages = ref([])
    const setCurrentMessages = (messages) => {
        currentMessages.value.unshift(messages)
    }


    return {
        loading, currentMessages, setLoading, setCurrentMessages, setServerMessages, serverMessages, formattedResponses, responses, setResponses
    }
})