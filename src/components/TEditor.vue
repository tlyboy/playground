<script setup lang="ts">
import type * as Monaco from 'monaco-editor'
import vitesseDark from 'theme-vitesse/themes/vitesse-dark.json'
import vitesseLight from 'theme-vitesse/themes/vitesse-light.json'

const { modelValue } = defineModels<{
  modelValue: string
}>()

const monaco = useMonaco()!

monaco.editor.defineTheme('vitesse-dark', vitesseDark as any)
monaco.editor.defineTheme('vitesse-light', vitesseLight as any)

let editor: Monaco.editor.IStandaloneCodeEditor
const editorRef = ref()

defineExpose({
  /**
   * Monaco editor instance
   */
  $editor: editorRef,
})

onMounted(() => {
  editor = editorRef.value!.$editor
  editorRef.value = editor
})

onUnmounted(() => {
  editor?.dispose()
})
</script>

<template>
  <TMonacoEditor
    ref="editorRef"
    v-model="modelValue"
    v-bind="$attrs"
    :options="{
      theme: isDark ? 'vitesse-dark' : 'vitesse-light',
      bracketPairColorization: {
        enabled: true,
      },
      cursorSmoothCaretAnimation: 'on',
      detectIndentation: false,
      fontFamily: `'FiraCode Nerd Font', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
      fontLigatures: true,
      fontSize: 16,
      guides: {
        bracketPairs: 'active',
      },
      inlineSuggest: {
        enabled: true,
      },
      smoothScrolling: true,
      tabSize: 2,
      unicodeHighlight: {
        ambiguousCharacters: false,
        invisibleCharacters: false,
      },
    }"
  />
</template>
