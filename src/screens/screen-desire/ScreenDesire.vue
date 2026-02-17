<template>
  <FullScreenSection>
    <div ref="root" class="desire">
      <h2 class="desire__title">
        Мне нравится быть рядом с тобой.<br />
        <span class="desire__accent">И я хочу ещё.</span>
      </h2>

      <p class="desire__script script">очень</p>
    </div>

    <template #footer>
      <div ref="btnWrap">
        <ButtonPrimary @click="$emit('next')">Дальше</ButtonPrimary>
      </div>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue';
  import { gsap } from 'gsap';

  import { FullScreenSection } from '@/shared/ui/full-screen-section';
  import { ButtonPrimary } from '@/shared/ui/button-primary';

  defineOptions({ name: 'ScreenDesire' });

  const props = defineProps<{ active: boolean }>();

  defineEmits<{ (e: 'next'): void }>();

  const root = ref<HTMLElement | null>(null);
  const btnWrap = ref<HTMLElement | null>(null);

  const animateIn = () => {
    if (!root.value) return;

    const title = root.value.querySelector<HTMLElement>('.desire__title');
    const script = root.value.querySelector<HTMLElement>('.desire__script');

    const content = [title, script].filter(Boolean) as HTMLElement[];

    gsap.killTweensOf(content);
    if (btnWrap.value) gsap.killTweensOf(btnWrap.value);

    if (content.length) {
      gsap.set(content, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.55 }, 0);
      if (script) tl.to(script, { opacity: 1, y: 0, duration: 0.55 }, 0.18);
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
        if (root.value) {
          const title = root.value.querySelector<HTMLElement>('.desire__title');
          const script = root.value.querySelector<HTMLElement>('.desire__script');
          gsap.killTweensOf([title, script].filter(Boolean));
        }
        if (btnWrap.value) gsap.killTweensOf(btnWrap.value);
        return;
      }

      await nextTick();
      animateIn();
    },
    { immediate: true },
  );
</script>

<style scoped lang="scss">
  @use './styles.scss' as *;
</style>
