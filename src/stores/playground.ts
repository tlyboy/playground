import { defineStore } from 'pinia'

export const usePlaygroundStore = defineStore('playground', () => {
  const code = ref('')

  function runCode(value: string) {
    if (value) {
      const codeEl = document.createElement('script')

      codeEl.id = 'code'
      codeEl.type = 'module'
      codeEl.textContent = value

      const oldCodeEl = document.getElementById('code')

      oldCodeEl?.remove()

      console.clear()
      document.body.appendChild(codeEl)
    }
  }

  function saveCode(value: string) {
    if (value !== code.value) {
      code.value = value
      ElMessage.success('保存成功')
    }
  }

  function clearCode(value: string) {
    if (value) {
      code.value = ''
      ElMessage.success('清空成功')
    }
  }

  return {
    code,
    runCode,
    saveCode,
    clearCode,
  }
}, {
  persist: true,
})
