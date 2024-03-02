<template>
  <nav class="flex justify-center gap-2 text-xl">
    <button
      class="icon-btn i-carbon-sun dark:i-carbon-moon"
      title="切换深色模式"
      @click="toggleDark"
    />

    <a
      class="icon-btn i-carbon-logo-github"
      href="https://github.com/tlyboy/playground"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
    />
  </nav>
</template>
