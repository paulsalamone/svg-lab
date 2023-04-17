// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //   runtimeConfig: {
  //     VITE_API_KEY: "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",
  //   },
  ssr: false,
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/style/index.scss";`,
        },
      },
    },
  },
});
