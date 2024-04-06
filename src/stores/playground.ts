export const usePlaygroundStore = defineStore(
  'playground',
  () => {
    const code = ref('')

    return {
      code,
    }
  },
  {
    persist: true,
  },
)
