/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // === PROING Premium Design Tokens ===
        midnight: {
          DEFAULT: '#070E1A',
          50:  '#0d1829',
          100: '#0a1322',
          200: '#070E1A',
        },
        navy: {
          DEFAULT: '#0F1F3D',
          50:  '#162845',
          100: '#0F1F3D',
          200: '#091429',
        },
        electric: {
          DEFAULT: '#3B7BFF',
          50:  '#EEF3FF',
          100: '#D5E2FF',
          200: '#A8C1FF',
          300: '#7AA0FF',
          400: '#4D80FF',
          500: '#3B7BFF',
          600: '#1A5CE8',
          700: '#1248CC',
          800: '#0D35A0',
          900: '#082378',
        },
        crimson: {
          DEFAULT: '#E53040',
          50:  '#FEF0F1',
          100: '#FDDDE0',
          200: '#FBAFB5',
          300: '#F7717B',
          400: '#F04252',
          500: '#E53040',
          600: '#C41E2D',
          700: '#A01525',
          800: '#7D0F1D',
          900: '#5A0A14',
        },
        surface: {
          DEFAULT: '#F4F6FA',
          50:  '#FFFFFF',
          100: '#F9FAFB',
          200: '#F4F6FA',
          300: '#EBEef5',
          400: '#DDE2ED',
        },
        // Legacy aliases
        primary: {
          50:  '#EEF3FF',
          100: '#D5E2FF',
          200: '#A8C1FF',
          300: '#7AA0FF',
          400: '#4D80FF',
          500: '#3B7BFF',
          600: '#1A5CE8',
          700: '#1248CC',
          800: '#0D35A0',
          900: '#082378',
        },
        secondary: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'glow-electric': '0 0 20px rgba(59,123,255,0.25)',
        'glow-crimson':  '0 0 20px rgba(229,48,64,0.25)',
        'card':          '0 1px 3px rgba(7,14,26,0.08), 0 4px 12px rgba(7,14,26,0.04)',
        'card-hover':    '0 4px 16px rgba(7,14,26,0.12), 0 1px 4px rgba(7,14,26,0.08)',
        'sidebar':       '4px 0 24px rgba(7,14,26,0.5)',
      },
      backgroundImage: {
        'gradient-midnight': 'linear-gradient(135deg, #070E1A 0%, #0F1F3D 100%)',
        'gradient-electric': 'linear-gradient(135deg, #3B7BFF 0%, #1A5CE8 100%)',
        'gradient-crimson':  'linear-gradient(135deg, #E53040 0%, #C41E2D 100%)',
        'mesh-dark': `
          radial-gradient(at 20% 30%, rgba(59,123,255,0.08) 0px, transparent 50%),
          radial-gradient(at 80% 70%, rgba(229,48,64,0.06) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(15,31,61,0.9) 0px, transparent 70%)
        `,
      },
      animation: {
        'fade-in':     'fadeIn 0.3s ease-out',
        'slide-up':    'slideUp 0.3s ease-out',
        'slide-in':    'slideIn 0.3s ease-out',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-8px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
    }
  },
  plugins: [],
}