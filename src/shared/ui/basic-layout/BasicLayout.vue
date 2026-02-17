<template>
  <main class="base-layout">
    <div class="base-layout__content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'BasicLayout',
  });
</script>
<style lang="scss" scoped>
  @use './styles.scss' as *;
</style>
