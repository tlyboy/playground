<script setup lang="ts">
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

const playgroundStore = usePlaygroundStore()

const code = ref(playgroundStore.code)

const monaco = useMonaco()!

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

let editor: Monaco.editor.IStandaloneCodeEditor
const editorRef = ref()

onMounted(() => {
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
      <div class="w-[calc(100%-76px)]">
        <div class="truncate">🎮 Playground</div>
      </div>

      <NavBar />
    </ElHeader>

    <ElMain>
      <ElScrollbar>
        <div class="app-container">
          <ElRow :gutter="10" class="mb8">
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

          <CodeEditor
            ref="editorRef"
            class="h-[calc(100vh-80px)]"
            v-model="code"
            lang="javascript"
          />
        </div>
      </ElScrollbar>
    </ElMain>
  </ElContainer>
</template>

<style>
.layout-container .el-header {
  position: relative;
  color: var(--el-text-color-primary);
  border-bottom: 1px solid var(--el-color-info-light-7);
}

.layout-container .el-main {
  padding: 0;
}
</style>
