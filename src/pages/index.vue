<script setup lang="ts">
definePage({
  meta: {
    layout: 'home',
  },
})

const code = ref('')
</script>

<template>
  <div h-full>
    <TEditor
      v-model="code"
      lang="javascript"
      h="[calc(100vh_-_60px)]"
    />
  </div>
</template>
