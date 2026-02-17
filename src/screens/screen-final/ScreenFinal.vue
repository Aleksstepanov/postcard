<template>
  <FullScreenSection>
    <div ref="root" class="final">
      <p class="final__kicker">Вот и всё.</p>

      <h2 class="final__title">
        Я просто хотел,<br />
        <span class="final__accent">чтобы ты это знала.</span>
      </h2>

      <p class="final__note">Без лишних слов.</p>

      <Transition name="reveal">
        <p v-if="isRevealed" class="final__secret script">“ты важна”</p>
      </Transition>
    </div>

    <template #footer>
      <div ref="footer" class="final__footer">
        <ButtonPrimary v-if="!isRevealed" @click="reveal">Ок</ButtonPrimary>
        <ButtonPrimary v-else @click="$emit('close')">Закрыть</ButtonPrimary>
      </div>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue';
  import { gsap } from 'gsap';

  import { FullScreenSection } from '@/shared/ui/full-screen-section';
  import { ButtonPrimary } from '@/shared/ui/button-primary';

  defineOptions({ name: 'ScreenFinal' });

  const props = defineProps<{ active: boolean }>();

  defineEmits<{ (e: 'close'): void }>();

  const isRevealed = ref(false);

  const root = ref<HTMLElement | null>(null);
  const footer = ref<HTMLElement | null>(null);

  const reveal = () => {
    isRevealed.value = true;
  };

  const animateIn = () => {
    if (!root.value) return;

    const els = Array.from(
      root.value.querySelectorAll<HTMLElement>('.final__kicker, .final__title, .final__note'),
    );

    gsap.killTweensOf(els);
    if (footer.value) gsap.killTweensOf(footer.value);

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

    if (footer.value) {
      gsap.fromTo(
        footer.value,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, delay: 0.2, ease: 'power2.out' },
      );
    }
  };

  watch(
    () => props.active,
    async (isActive) => {
      if (!isActive) {
        // важный момент: при уходе сбрасываем, чтобы при возврате финал снова был “первый раз”
        isRevealed.value = false;

        if (root.value) {
          const els = Array.from(
            root.value.querySelectorAll<HTMLElement>('.final__kicker, .final__title, .final__note'),
          );
          gsap.killTweensOf(els);
        }
        if (footer.value) gsap.killTweensOf(footer.value);

        return;
      }

      await nextTick();
      animateIn();
    },
    { immediate: true },
  );
</script>

<style scoped lang="scss">
  @use '@/shared/styles/colors.scss' as c;

  .final {
    max-width: 720px;
    margin: 0 auto;
    padding: clamp(42px, 9vh, 92px) 16px 0;
    text-align: center;
    overflow-x: clip;
  }

  .final__kicker {
    margin: 0 0 10px;
    font-size: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.75;
  }

  .final__title {
    margin: 0 0 12px;
    font-size: clamp(28px, 4.4vw, 46px);
    line-height: 1.08;
    font-weight: 650;
    color: c.get-color(gray);
  }

  .final__accent {
    color: c.get-color(orange);
  }

  .final__note {
    margin: 0;
    opacity: 0.8;
  }

  .final__secret {
    margin: 18px 0 0;
    font-size: 32px;
    line-height: 1.05;
    color: c.get-color(orange);
  }

  .script {
    font-family: 'Marck Script', 'Inter', cursive;
  }

  .final__footer {
    width: 100%;
    display: grid;
    place-items: center;
  }

  .reveal-enter-active,
  .reveal-leave-active {
    transition:
      opacity 0.35s ease,
      transform 0.35s ease,
      filter 0.35s ease;
  }
  .reveal-enter-from,
  .reveal-leave-to {
    opacity: 0;
    transform: translateY(8px);
    filter: blur(2px);
  }
</style>
