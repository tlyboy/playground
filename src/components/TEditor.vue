<script setup lang="ts">
import * as monaco from 'monaco-editor'
import vitesseDark from 'theme-vitesse/themes/vitesse-dark.json'
import vitesseLight from 'theme-vitesse/themes/vitesse-light.json'

monaco.editor.defineTheme('vitesse-dark', vitesseDark as any)
monaco.editor.defineTheme('vitesse-light', vitesseLight as any)

const { modelValue } = defineModels<{
  modelValue: string
}>()
</script>

<template>
  <TMonacoEditor
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
