import { runViewTransition } from '@/lib/utils/run-view-transition';
import '@/styles/view-transitions.css';

const createPreset =
  (name: string) =>
  async (
    button?: HTMLElement,
    duration = 420,
    enableFade = false,
    disableAnimateOld = false,
    callback?: () => void
  ) => {
    await runViewTransition(name, disableAnimateOld, (root) => {
      root.style.setProperty('--vt-duration', `${duration}ms`);
      root.style.setProperty('--anim-fade', enableFade ? '0' : '1');
      callback?.();
    });
  };

export const presets = {
  ripple: async (
    button: HTMLButtonElement,
    duration = 420,
    enableFade = false,
    disableAnimateOld = false,
    callback?: () => void
  ) => {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    await runViewTransition('tripple', disableAnimateOld, (root) => {
      root.style.setProperty('--vt-x', `${x}px`);
      root.style.setProperty('--vt-y', `${y}px`);
      root.style.setProperty('--vt-r', `${maxRadius}px`);
      root.style.setProperty('--vt-duration', `${duration}ms`);
      root.style.setProperty('--anim-fade', enableFade ? '0' : '1');
      callback?.();
    });
  },

  fade: createPreset('tfade'),
  'slide-up': createPreset('tslideup'),
  'slide-down': createPreset('tslidedown'),
  'slide-left': createPreset('tslideleft'),
  'slide-right': createPreset('tslideright'),
  scale: createPreset('tscale'),
  'rotate-simple': createPreset('trotate-simple'),
  'rotate-expand': createPreset('trotate-expand'),
  'rotate-spring': createPreset('trotate-spring'),
  pulse: createPreset('tpulse'),
  skew: createPreset('tskew'),
  bounce: createPreset('tbounce'),
  'flip-x': createPreset('tflipx'),
  'flip-y': createPreset('tflipy'),
  'curtain-left': createPreset('curtain-left'),
  'curtain-right': createPreset('curtain-right'),
  'curtain-up': createPreset('curtain-up'),
  'curtain-down': createPreset('curtain-down'),
  'zoom-reveal': createPreset('zoom-reveal'),
  parallax: createPreset('parallax'),
  morph: createPreset('morph'),
  'reveal-split': createPreset('reveal-split'),
  elevate: createPreset('elevate'),
  dip: createPreset('dip'),
  'perspective-door': createPreset('perspective-door'),
  'spring-slide': createPreset('spring-slide'),
  'snap-reveal': createPreset('snap-reveal'),
  'blur-zoom': createPreset('blur-zoom'),
  lens: createPreset('lens'),
  'fade-through-color': createPreset('fade-through-color'),
  'cube-rotate': createPreset('cube-rotate'),
  'page-turn': createPreset('page-turn'),
};

export type PresetName = keyof typeof presets;
