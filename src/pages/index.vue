<script setup lang="ts">
definePage({
  meta: {
    layout: 'home',
  },
})

const playgroundStore = usePlaygroundStore()

const code = ref(playgroundStore.code)

function clearCode(value: string) {
  playgroundStore.clearCode(value)
  code.value = ''
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
              @click="playgroundStore.runCode(code)"
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
              @click="playgroundStore.saveCode(code)"
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
              @click="clearCode(code)"
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
          @keydown.ctrl.s.prevent="playgroundStore.saveCode(code)"
          @keydown.f5.prevent="playgroundStore.runCode"
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
