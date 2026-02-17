<template>
  <FullScreenSection>
    <div ref="root" class="intro">
      <p class="intro__kicker">У меня к тебе один вопрос</p>

      <h1 class="intro__title">
        Ты вообще понимаешь,<br />
        <span class="intro__accent">что ты со мной делаешь?</span>
      </h1>

      <p class="intro__note script">{{ text }}</p>
    </div>

    <template #footer>
      <div ref="btnWrap">
        <ButtonPrimary class="button-primary intro__btn" type="button" @click="$emit('next')">
          Показать
        </ButtonPrimary>
      </div>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { nextTick, onUnmounted, ref, watch } from 'vue';
  import { gsap } from 'gsap';

  import { FullScreenSection } from '@/shared/ui/full-screen-section';
  import { ButtonPrimary } from '@/shared/ui/button-primary';
  import { useTypewriter } from '@/shared/composibles';

  defineOptions({ name: 'ScreenIntro' });

  const props = defineProps<{ active: boolean }>();

  defineEmits<{ (e: 'next'): void }>();

  const full = '…и да, это не случайно 😌';
  const { text, start, stop } = useTypewriter(full, 80);

  const root = ref<HTMLElement | null>(null);
  const btnWrap = ref<HTMLElement | null>(null);

  const animateIn = () => {
    if (!root.value) return;

    const els = Array.from(
      root.value.querySelectorAll<HTMLElement>('.intro__kicker, .intro__title, .intro__note'),
    );

    gsap.killTweensOf(els);
    if (btnWrap.value) gsap.killTweensOf(btnWrap.value);

    if (els.length) {
      gsap.set(els, { y: 10, opacity: 0 });
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }

    if (btnWrap.value) {
      gsap.fromTo(
        btnWrap.value,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, delay: 0.25, ease: 'power2.out' },
      );
    }
  };

  watch(
    () => props.active,
    async (isActive) => {
      if (!isActive) {
        stop();
        return;
      }

      await nextTick();
      animateIn();

      stop();
      start();
    },
    { immediate: true },
  );

  onUnmounted(() => {
    stop();
  });
</script>

<style lang="scss" scoped>
  @use './styles.scss' as *;
</style>
