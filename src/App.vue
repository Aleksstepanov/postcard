<template>
  <BasicLayout>
    <ScreenIntro v-if="step === 0" @next="step = 1" />
    <div v-else>Следующий экран…</div>
  </BasicLayout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicLayout } from '@/shared/ui/basic-layout';
  import { ScreenIntro } from '@/screens/screen-intro';

  const step = ref(0);
</script>
