<template>
  <FullScreenSection>
    <div class="final">
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
      <div class="final__footer">
        <ButtonPrimary v-if="!isRevealed" @click="reveal"> Ок </ButtonPrimary>

        <ButtonPrimary v-else @click="$emit('close')"> Закрыть </ButtonPrimary>
      </div>
    </template>
  </FullScreenSection>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { FullScreenSection } from '@/shared/ui/full-screen-section';
  import { ButtonPrimary } from '@/shared/ui/button-primary';

  defineOptions({ name: 'ScreenFinal' });

  defineEmits<{ (e: 'close'): void }>();

  const isRevealed = ref(false);

  const reveal = () => {
    isRevealed.value = true;
  };
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
