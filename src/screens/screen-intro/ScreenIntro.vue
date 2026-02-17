<template>
  <FullScreenSection>
    <div ref="root" class="intro">
      <p class="intro__kicker">У меня к тебе один вопрос</p>

      <h1 class="intro__title">
        Ты вообще понимаешь,<br />
        <span class="intro__accent">что ты со мной делаешь?</span>
      </h1>

      <p class="intro__note script">…и да, это немного хитро 😌</p>
    </div>

    <template #footer>
      <button ref="btn" class="button-primary intro__btn" type="button" @click="$emit('next')">
        Показать
      </button>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import { FullScreenSection } from '@/shared/ui/full-screen-section';

  defineOptions({ name: 'ScreenIntro' });

  defineEmits<{ (e: 'next'): void }>();

  const root = ref<HTMLElement | null>(null);
  const btn = ref<HTMLButtonElement | null>(null);

  onMounted(() => {
    if (!root.value) return;

    const els = root.value.querySelectorAll('.intro__kicker, .intro__title, .intro__note');

    gsap.set(els, { y: 10, opacity: 0 });
    gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    });

    if (btn.value) {
      gsap.fromTo(
        btn.value,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, delay: 0.25, ease: 'power2.out' },
      );
    }
  });
</script>

<style lang="scss" scoped>
  @use './styles.scss' as *;
</style>
