<script setup lang="ts">
import { getHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'
import type * as Monaco from 'monaco-editor'
import * as prettier from 'prettier/standalone'
import prettierPluginBabel from 'prettier/plugins/babel'
import prettierPluginEstree from 'prettier/plugins/estree'
import prettierPluginHtml from 'prettier/plugins/html'

definePage({
  meta: {
    layout: 'home',
  },
})

const monaco = useMonaco()!

const editorRef = ref()
let editor: Monaco.editor.IStandaloneCodeEditor

const playgroundStore = usePlaygroundStore()

const code = ref(playgroundStore.code)

onMounted(async () => {
  const highlighter = await getHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: ['javascript'],
  })

  monaco.languages.register({ id: 'javascript' })

  shikiToMonaco(highlighter, monaco)

  monaco.languages.registerDocumentFormattingEditProvider('javascript', {
    async provideDocumentFormattingEdits(model) {
      const text = await prettier.format(model.getValue(), {
        parser: 'babel',
        plugins: [
          prettierPluginBabel,
          prettierPluginEstree,
          prettierPluginHtml,
        ],
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

  editor = editorRef.value!.$editor

  editor.addCommand(monaco.KeyCode.F5, () => {
    runCode()
  })

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    saveCode()
  })
})

function runCode() {
  const oldCodeEl = document.getElementById('code')

  oldCodeEl?.remove()

  const codeEl = document.createElement('script')

  codeEl.id = 'code'
  codeEl.type = 'module'
  codeEl.textContent = code.value

  document.body.appendChild(codeEl)
}

async function saveCode() {
  try {
    await editor.getAction('editor.action.formatDocument')?.run()
  } catch (error) {
    console.error(error)
  }

  if (playgroundStore.code === code.value) return

  playgroundStore.code = code.value

  ElMessage.success('保存成功')
}

function clearCode() {
  if (!code.value) return

  code.value = ''

  if (playgroundStore.code) playgroundStore.code = ''

  ElMessage.success('清空成功')
}
</script>

<template>
  <ElContainer
    class="layout-container h-full text-gray-700 dark:text-gray-200"
    style="height: 100%"
  >
    <ElHeader class="flex items-center justify-between">
      <ElRow :gutter="10">
        <ElCol :span="1.5">
          <ElButton type="primary" plain @click="runCode">
            <template #icon>
              <div class="i-carbon-play"></div>
            </template>
            运行
          </ElButton>
        </ElCol>
        <ElCol :span="1.5">
          <ElButton type="success" plain @click="saveCode">
            <template #icon>
              <div class="i-carbon-save"></div>
            </template>
            保存
          </ElButton>
        </ElCol>
        <ElCol :span="1.5">
          <ElButton type="danger" plain @click="clearCode">
            <template #icon>
              <div class="i-carbon-trash-can"></div>
            </template>
            清空
          </ElButton>
        </ElCol>
      </ElRow>

      <NavBar />
    </ElHeader>

    <ElMain>
      <ElScrollbar>
        <MonacoEditor
          ref="editorRef"
          class="h-[calc(100vh-60px)]"
          v-model="code"
          lang="javascript"
          :options="{
            automaticLayout: true,
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
      </ElScrollbar>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.layout-container .el-header {
  position: relative;
  color: var(--el-text-color-primary);
}

.layout-container .el-main {
  padding: 0;
}
</style>
