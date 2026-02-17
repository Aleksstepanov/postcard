<template>
  <section class="section">
    <div class="section__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="section__footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'FullScreenSection',
  });
</script>
<style lang="scss" scoped>
  @use './styles.scss' as *;
</style>
