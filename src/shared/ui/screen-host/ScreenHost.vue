<template>
  <div class="screens">
    <div
      ref="setScreenEl(0)"
      class="screen"
      :class="{ active: currentIndex === 0, leaving: leavingIndex === 0 }"
    >
      <ScreenIntro :active="currentIndex === 0" @next="next" />
    </div>

    <div
      ref="setScreenEl(1)"
      class="screen"
      :class="{ active: currentIndex === 1, leaving: leavingIndex === 1 }"
    >
      <ScreenFun :active="currentIndex === 1" @next="next" @back="back" />
    </div>

    <div
      ref="setScreenEl(2)"
      class="screen"
      :class="{ active: currentIndex === 2, leaving: leavingIndex === 2 }"
    >
      <ScreenHonest :active="currentIndex === 2" @next="next" @back="back" />
    </div>

    <div
      ref="setScreenEl(3)"
      class="screen"
      :class="{ active: currentIndex === 3, leaving: leavingIndex === 3 }"
    >
      <ScreenDesire :active="currentIndex === 3" @next="next" />
    </div>

    <div
      ref="setScreenEl(4)"
      class="screen"
      :class="{ active: currentIndex === 4, leaving: leavingIndex === 4 }"
    >
      <ScreenFinal :active="currentIndex === 4" @close="reset" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import { gsap } from 'gsap';

  import { ScreenIntro, ScreenFun, ScreenHonest, ScreenDesire, ScreenFinal } from '@/screens';

  defineOptions({
    name: 'ScreenHost',
  });

  const MAX_INDEX = 4;

  const currentIndex = ref(0);
  const leavingIndex = ref<number | null>(null);
  const direction = ref<'next' | 'back'>('next');
  const isLocked = ref(false);

  const screenEls = ref<Array<HTMLElement | null>>([null, null, null, null, null]);

  const setScreenEl = (idx: number) => (el: Element | null) => {
    screenEls.value[idx] = el as HTMLElement | null;
  };

  const clampIndex = (value: number) => Math.min(Math.max(value, 0), MAX_INDEX);

  const goTo = async (value: number, dir: 'next' | 'back') => {
    if (isLocked.value) return;

    const nextValue = clampIndex(value);
    if (nextValue === currentIndex.value) return;

    const fromIdx = currentIndex.value;
    const toIdx = nextValue;

    direction.value = dir;
    isLocked.value = true;
    leavingIndex.value = fromIdx;
    currentIndex.value = toIdx;

    await nextTick();

    const fromEl = screenEls.value[fromIdx];
    const toEl = screenEls.value[toIdx];

    if (!fromEl || !toEl) {
      leavingIndex.value = null;
      isLocked.value = false;
      return;
    }

    const inY = direction.value === 'next' ? 14 : -14;
    const outY = direction.value === 'next' ? -12 : 12;

    gsap.killTweensOf([fromEl, toEl]);

    gsap.set(toEl, { opacity: 0, y: inY, filter: 'blur(4px)' });
    gsap.set(fromEl, { opacity: 1, y: 0, filter: 'blur(0px)' });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set([fromEl, toEl], { clearProps: 'transform,filter' });
        leavingIndex.value = null;
        isLocked.value = false;
      },
    });

    tl.to(fromEl, { opacity: 0, y: outY, filter: 'blur(3px)', duration: 0.42 }, 0);
    tl.to(toEl, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.52 }, 0.06);
  };

  const next = () => {
    goTo(currentIndex.value + 1, 'next');
  };

  const back = () => {
    goTo(currentIndex.value - 1, 'back');
  };

  const reset = () => {
    goTo(0, 'back');
  };
</script>

<style lang="scss" scoped>
  @use './styles.scss' as *;
</style>
