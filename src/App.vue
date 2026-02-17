<template>
  <BasicLayout>
    <ScreenHost />
  </BasicLayout>
</template>

<script setup lang="ts">
  import { BasicLayout } from '@/shared/ui/basic-layout';
  import { ScreenHost } from '@/shared/ui/screen-host';

  defineOptions({
    name: 'App',
  });
</script>
