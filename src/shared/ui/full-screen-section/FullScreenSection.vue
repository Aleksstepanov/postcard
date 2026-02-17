<template>
  <section class="section">
    <div class="section__body">
      <slot />
    </div>

    <footer class="section__footer" :class="footerClass">
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'FullScreenSection',
  });
  defineProps<{ footerClass?: string }>();
</script>
<style lang="scss" scoped>
  @use './styles.scss' as *;
</style>
