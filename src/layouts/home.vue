<template>
  <el-container class="layout-container-demo" style="height: 100%" text="gray-700 dark:gray-200">
    <el-header style="text-align: right; font-size: 12px">
      <div class="toolbar">
        <TNavBar />
      </div>
    </el-header>

    <el-main>
      <el-scrollbar>
        <RouterView />
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
