<script setup lang="ts">
definePage({
  meta: {
    layout: 'home',
  },
})

const playgroundStore = usePlaygroundStore()

const code = ref(playgroundStore.code)

function runCode() {
  if (!code.value)
    return

  const codeEl = document.createElement('script')

  codeEl.id = 'code'
  codeEl.type = 'module'
  codeEl.textContent = code.value

  const oldCodeEl = document.getElementById('code')

  oldCodeEl?.remove()

  console.clear()
  document.body.appendChild(codeEl)

  if (playgroundStore.code !== code.value)
    playgroundStore.code = code.value
}

function saveCode() {
  if (playgroundStore.code === code.value)
    return

  playgroundStore.code = code.value

  ElMessage.success('保存成功')
}

function clearCode() {
  if (!code.value)
    return

  code.value = ''
  playgroundStore.code = ''

  ElMessage.success('清空成功')
}
</script>

<template>
  <el-container class="layout-container-demo" style="height: 100%" text="gray-700 dark:gray-200">
    <el-header style="text-align: right; font-size: 12px">
      <el-row justify="space-between" align="middle" h-full>
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              @click="runCode"
            >
              <template #icon>
                <div i-carbon-play />
              </template>
              运行
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              plain
              @click="saveCode"
            >
              <template #icon>
                <div i-carbon-save />
              </template>
              保存
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              @click="clearCode"
            >
              <template #icon>
                <div i-carbon-trash-can />
              </template>
              清空
            </el-button>
          </el-col>
        </el-row>

        <div class="toolbar">
          <TNavBar />
        </div>
      </el-row>
    </el-header>

    <el-main>
      <el-scrollbar>
        <TEditor
          v-model="code"
          lang="javascript"
          h="[calc(100vh_-_60px)]"
          @keydown.ctrl.s.prevent="saveCode"
          @keydown.f5.prevent="runCode"
        />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
