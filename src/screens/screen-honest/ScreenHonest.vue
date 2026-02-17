<template>
  <FullScreenSection>
    <div ref="root" class="honest">
      <h2 class="honest__title">Можно чуть-чуть честно?</h2>

      <label class="honest__label" for="honestWord">
        Напиши одно слово, которое тебе приятно слышать
      </label>

      <div class="honest__field">
        <input
          id="honestWord"
          v-model="rawValue"
          class="honest__input"
          type="text"
          inputmode="text"
          autocomplete="off"
          autocapitalize="sentences"
          spellcheck="false"
          :placeholder="placeholder"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />

        <p v-if="prettyValue" class="honest__preview script">“{{ prettyValue }}”</p>

        <p v-else class="honest__hint">Не переживай — можно любое. Одно. 🙂</p>
      </div>
    </div>

    <template #footer>
      <div ref="btnWrap" class="honest__footer">
        <ButtonPrimary :disabled="!canGoNext" @click="$emit('next')"> Дальше </ButtonPrimary>
      </div>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
  import { FullScreenSection } from '@/shared/ui/full-screen-section';
  import { ButtonPrimary } from '@/shared/ui/button-primary';
  import gsap from 'gsap';

  defineOptions({ name: 'ScreenHonest' });

  const props = defineProps<{ active: boolean }>();

  defineEmits<{
    (e: 'next'): void;
  }>();

  const placeholders = ['солнышко', 'красотка', 'умница', 'моя', 'смешная'];

  const rawValue = ref('');
  const isFocused = ref(false);
  const btnWrap = ref<HTMLButtonElement | null>(null);
  const root = ref<HTMLElement | null>(null);

  const idx = ref(0);
  let timer: number | null = null;

  const placeholder = computed(() => {
    if (isFocused.value && rawValue.value.trim().length > 0) return '';
    return placeholders[idx.value % placeholders.length];
  });

  const prettyValue = computed(() => rawValue.value.trim());

  const canGoNext = computed(() => prettyValue.value.length > 0);

  onMounted(() => {
    timer = window.setInterval(() => {
      if (isFocused.value && rawValue.value.trim().length > 0) return;
      idx.value += 1;
    }, 1800);

    if (root.value) {
      const els = root.value.querySelectorAll('.intro__kicker, .intro__title, .intro__note');

      gsap.set(els, { y: 10, opacity: 0 });
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });

      if (btnWrap.value) {
        gsap.fromTo(
          btnWrap.value,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, delay: 0.25, ease: 'power2.out' },
        );
      }
    }
  });

  onUnmounted(() => {
    if (timer) window.clearInterval(timer);
    rawValue.value = '';
  });

  watch(
    () => props.active,
    (isActive) => {
      if (!isActive) {
        if (timer) window.clearInterval(timer);
        rawValue.value = '';
      }
    },
    { immediate: true },
  );
</script>

<style scoped lang="scss">
  @use './styles.scss' as *;
</style>
