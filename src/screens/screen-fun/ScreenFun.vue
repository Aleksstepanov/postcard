<template>
  <FullScreenSection>
    <div ref="root" class="fun">
      <p class="fun__text">
        Ты умеешь делать день легче.<br />
        Даже когда он был не очень.
      </p>

      <p class="fun__hand script">{{ text }}</p>
    </div>

    <template #footer>
      <div ref="btnWrap">
        <ButtonPrimary class="button-primary fun__btn" type="button" @click="$emit('next')">
          Дальше
        </ButtonPrimary>
      </div>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { nextTick, onUnmounted, ref, watch } from 'vue';
  import { gsap } from 'gsap';

  import { ButtonPrimary } from '@/shared/ui/button-primary';
  import { FullScreenSection } from '@/shared/ui/full-screen-section';
  import { useTypewriter } from '@/shared/composibles';

  defineOptions({ name: 'ScreenFun' });

  const props = defineProps<{ active: boolean }>();

  defineEmits<{
    (e: 'next'): void;
  }>();

  const full = '“и это… чертовски красиво”';
  const { text, start, stop } = useTypewriter(full, 80);

  const root = ref<HTMLElement | null>(null);
  const btnWrap = ref<HTMLElement | null>(null);

  const animateIn = () => {
    if (!root.value) return;

    const els = Array.from(root.value.querySelectorAll<HTMLElement>('.fun__text, .fun__hand'));

    gsap.killTweensOf(els);
    if (btnWrap.value) gsap.killTweensOf(btnWrap.value);

    if (els.length) {
      gsap.set(els, { y: 10, opacity: 0 });
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
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
