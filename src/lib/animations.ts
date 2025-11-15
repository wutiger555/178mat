/**
 * GSAP 和 Lenis 動畫工具函數
 * 統一管理所有動畫效果
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// 註冊 GSAP 插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis 平滑滾動實例
 */
let lenisInstance: Lenis | null = null;

/**
 * 初始化 Lenis 平滑滾動
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // 整合 Lenis 和 GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

/**
 * 獲取 Lenis 實例
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * 銷毀 Lenis 實例
 */
export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

/**
 * 滾動到指定位置
 */
export function scrollTo(target: string | number | HTMLElement, options?: any) {
  lenisInstance?.scrollTo(target, options);
}

/**
 * 滾動觸發淡入動畫
 */
export function fadeInUp(element: string | HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    duration = 1,
    y = 50,
    stagger = 0,
    delay = 0,
  } = options;

  return gsap.from(element, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y,
    duration,
    stagger,
    delay,
    ease: 'power3.out',
  });
}

/**
 * 滾動觸發視差效果
 */
export function parallax(element: string | HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top bottom',
    end = 'bottom top',
    yPercent = -20,
  } = options;

  return gsap.to(element, {
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
    yPercent,
    ease: 'none',
  });
}

/**
 * 數字計數動畫
 */
export function countUp(element: HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    duration = 2,
    endValue,
    startValue = 0,
  } = options;

  const obj = { value: startValue };

  return gsap.to(obj, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none reverse',
    },
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
}

/**
 * 滾動觸發縮放淡入
 */
export function scaleIn(element: string | HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    duration = 1,
    scale = 0.8,
    stagger = 0,
  } = options;

  return gsap.from(element, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale,
    duration,
    stagger,
    ease: 'back.out(1.7)',
  });
}

/**
 * 滾動觸發從左進入
 */
export function slideInLeft(element: string | HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    duration = 1,
    x = -100,
    stagger = 0,
  } = options;

  return gsap.from(element, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x,
    duration,
    stagger,
    ease: 'power3.out',
  });
}

/**
 * 滾動觸發從右進入
 */
export function slideInRight(element: string | HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    duration = 1,
    x = 100,
    stagger = 0,
  } = options;

  return gsap.from(element, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x,
    duration,
    stagger,
    ease: 'power3.out',
  });
}

/**
 * 滾動觸發進度條動畫
 */
export function progressBar(element: string | HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    duration = 1.5,
    width = '100%',
    delay = 0,
  } = options;

  return gsap.fromTo(
    element,
    { width: '0%' },
    {
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none reverse',
      },
      width,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
}

/**
 * 滾動觸發文字分割動畫
 */
export function splitText(element: string | HTMLElement, options: any = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    duration = 0.8,
    stagger = 0.03,
  } = options;

  // 將文字分割成字元
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const text = el.textContent || '';
  const chars = text.split('');

  el.innerHTML = chars
    .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  return gsap.from(`${element} span`, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 20,
    rotateX: -90,
    duration,
    stagger,
    ease: 'back.out(1.7)',
  });
}

/**
 * Hover 時的傾斜效果
 */
export function tiltOnHover(element: HTMLElement) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.05,
      rotationY: 5,
      rotationX: -5,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
}

/**
 * 固定導航欄動畫
 */
export function stickyNav(navElement: string | HTMLElement) {
  const showAnim = gsap
    .from(navElement, {
      yPercent: -100,
      paused: true,
      duration: 0.2,
    })
    .progress(1);

  ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
      if (self.direction === -1) {
        showAnim.play();
      } else {
        showAnim.reverse();
      }
    },
  });
}

/**
 * 頁面載入動畫
 */
export function pageLoadAnimation() {
  const tl = gsap.timeline();

  tl.from('.page-loader', {
    opacity: 0,
    duration: 0.3,
  })
    .to('.page-loader', {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
    })
    .from('.page-content', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3');

  return tl;
}

/**
 * 重新整理所有 ScrollTriggers
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * 清除所有 ScrollTriggers
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
