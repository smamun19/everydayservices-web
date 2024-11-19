import { createSystem, defaultConfig } from '@chakra-ui/react';

const system = createSystem(defaultConfig, {
  theme: {
    keyframes: {
      pulseRing: {
        '0%': { transform: 'scale(0.33)' },
        '40%, 50%': { opacity: 0 },
        '100%': { opacity: 0 },
      },
      pulseRingScaled: {
        '0%': { transform: 'scale(0.33)' },
        '30%': { transform: 'scale(0.66)' },
        '40%, 50%': { opacity: 0 },
        '100%': { opacity: 0 },
      },
      pulseDot: {
        '0%': { transform: 'scale(0.9)' },
        '25%': { transform: 'scale(1.1)' },
        '50%': { transform: 'scale(0.9)' },
        '100%': { transform: 'scale(0.9)' },
      },
    },
    tokens: {
      animations: {
        pulseRing: {
          value: '2.25s pulseRing cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
          description: 'Pulse ring animation',
        },
        pulseRingScaled: {
          value: '2.25s pulseRingScaled cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
          description: 'Pulse ring scaled animation',
        },
        pulseDot: {
          value: '2.25s pulseDot cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
          description: 'Pulse dot animation',
        },
      },
      fonts: {
        body: { value: 'var(--font-inter)' },
        heading: { value: 'var(--font-work-sans)' },
      },
      colors: {
        discord: { value: '#7289da' },
      },
      shadows: {
        largeSoft: { value: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;' },
      },
    },
  },
  globalCss: {
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      minHeight: '100vh',
      fontSmooth: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
    '.body': {
      // todo check how to do this without breaking the site
      // height: '100%', // Push footer to bottom
      overflowY: 'scroll', // Always show scrollbar to avoid flickering
    },
    '#nprogress': {
      pointerEvents: 'none',
    },
    '#nprogress .bar': {
      background: 'green.200',
      position: 'fixed',
      zIndex: '1031',
      top: 0,
      left: 0,
      width: '100%',
      height: '2px',
    },
  },
});

export default system;
