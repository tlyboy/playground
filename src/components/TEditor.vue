<script setup lang="ts">
import * as monaco from 'monaco-editor'
import vitesseDark from 'theme-vitesse/themes/vitesse-dark.json'
import vitesseLight from 'theme-vitesse/themes/vitesse-light.json'
import * as prettier from 'prettier/standalone'
import prettierPluginBabel from 'prettier/plugins/babel'
import prettierPluginEstree from 'prettier/plugins/estree'
import prettierPluginHtml from 'prettier/plugins/html'

monaco.editor.defineTheme('vitesse-dark', vitesseDark as any)
monaco.editor.defineTheme('vitesse-light', vitesseLight as any)

monaco.languages.registerDocumentFormattingEditProvider('javascript', {
  async provideDocumentFormattingEdits(model) {
    const text = await prettier.format(model.getValue(), {
      parser: 'babel',
      plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
      semi: false,
      singleQuote: true,
    })

    return [
      {
        range: model.getFullModelRange(),
        text,
      },
    ]
  },
})

const editorRef = ref()

async function formatCode() {
  const editor = editorRef.value.$editor as monaco.editor.IStandaloneCodeEditor

  editor.getAction('editor.action.formatDocument')?.run()
}

const { modelValue } = defineModels<{
  modelValue: string
}>()
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
    @keydown.ctrl.s.prevent="formatCode"
  />
</template>
