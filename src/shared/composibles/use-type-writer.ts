import { onUnmounted, ref } from 'vue';

export const useTypewriter = (fullText: string, speed = 42) => {
  const text = ref('');
  let i = 0;
  let t: number | null = null;

  const start = () => {
    stop();
    text.value = '';
    i = 0;

    const tick = () => {
      i += 1;
      text.value = fullText.slice(0, i);

      if (i < fullText.length) {
        // чуть “живости” — рандом в пределах
        const jitter = Math.round(Math.random() * 20) - 10;
        t = window.setTimeout(tick, Math.max(18, speed + jitter));
      }
    };

    t = window.setTimeout(tick, 120);
  };

  const stop = () => {
    if (t) window.clearTimeout(t);
    t = null;
  };

  onUnmounted(stop);

  return { text, start, stop };
};
