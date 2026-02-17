<template>
  <FullScreenSection>
    <div ref="root" class="fun">
      <p class="fun__text">
        Ты умеешь делать день легче.<br />
        Даже когда он был не очень.
      </p>

      <p class="fun__hand script">“и это… чертовски красиво”</p>
    </div>

    <template #footer>
      <button class="button-primary fun__btn" type="button" @click="$emit('next')">Дальше</button>

      <!-- если вдруг захочешь back без кнопки — убери -->
      <!-- <button class="button-ghost fun__btn" type="button" @click="$emit('back')">Назад</button> -->
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';

  import { FullScreenSection } from '@/shared/ui/full-screen-section';

  defineOptions({
    name: 'ScreenFun',
  });

  defineEmits<{
    (e: 'next'): void;
    (e: 'back'): void;
  }>();

  const root = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (!root.value) return;

    const els = root.value.querySelectorAll('.fun__text, .fun__hand');
    gsap.set(els, { y: 10, opacity: 0 });

    gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });
</script>

<style lang="scss" scoped>
  @use './styles.scss' as *;
</style>
