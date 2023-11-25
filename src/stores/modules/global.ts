import { defineStore } from "pinia";
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const loading = ref(false)
  
  function setLoadingStatus(val: any) {
    loading.value = val
  }

  return {
    loading,
    setLoadingStatus
  }
})