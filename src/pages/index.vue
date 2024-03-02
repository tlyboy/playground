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
  <el-container
    class="layout-container h-full text-gray-700 dark:text-gray-200"
    style="height: 100%"
  >
    <el-header>
      <el-row class="h-full" justify="space-between" align="middle">
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button type="primary" plain @click="runCode">
              <template #icon>
                <div class="i-carbon-play" />
              </template>
              运行
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain @click="saveCode">
              <template #icon>
                <div class="i-carbon-save" />
              </template>
              保存
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain @click="clearCode">
              <template #icon>
                <div class="i-carbon-trash-can" />
              </template>
              清空
            </el-button>
          </el-col>
        </el-row>

        <div class="toolbar">
          <NavBar />
        </div>
      </el-row>
    </el-header>

    <el-main>
      <el-scrollbar>
        <CodeEditor
          ref="editorRef"
          class="h-[calc(100vh-60px)]"
          v-model="code"
          lang="javascript"
        />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style scoped>
.layout-container .el-header {
  position: relative;
}

.layout-container .el-main {
  padding: 0;
}

.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
