<template>
  <button
    class="btn"
    :class="[`btn--${size}`, { 'btn--full': fullWidth }]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  import type { TButtonPrimaryProps } from './types';

  defineOptions({ name: 'ButtonPrimary' });

  withDefaults(defineProps<TButtonPrimaryProps>(), {
    type: 'button',
    disabled: false,
    fullWidth: false,
    size: 'lg',
  });
</script>

<style scoped lang="scss">
  @use './styles.scss' as *;
</style>
