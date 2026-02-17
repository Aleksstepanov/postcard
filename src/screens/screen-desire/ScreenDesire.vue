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
      <ButtonPrimary ref="btnWrap" @click="$emit('next')"> Дальше </ButtonPrimary>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';

  import { FullScreenSection } from '@/shared/ui/full-screen-section';
  import { ButtonPrimary } from '@/shared/ui/button-primary';

  defineOptions({ name: 'ScreenDesire' });

  defineEmits<{ (e: 'next'): void }>();

  const root = ref<HTMLElement | null>(null);
  const btnWrap = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (!root.value) return;

    const title = root.value.querySelector('.desire__title');
    const script = root.value.querySelector('.desire__script');

    gsap.set([title, script], { opacity: 0, y: 10 });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to(title, { opacity: 1, y: 0, duration: 0.55 }, 0);
    tl.to(script, { opacity: 1, y: 0, duration: 0.55 }, 0.18);

    if (btnWrap.value) {
      gsap.fromTo(
        btnWrap.value,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, delay: 0.25, ease: 'power2.out' },
      );
    }
  });
</script>

<style scoped lang="scss">
  @use './styles.scss' as *;
</style>
