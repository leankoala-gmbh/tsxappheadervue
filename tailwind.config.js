const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  safelist: ['navigation__link--active', 'navigation__link'],
  theme: {

    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      },
      lineHeight: {
        'leading-3': '12px',
        'leading-4': '16px',
        'leading-5': '20px',
        'leading-6': '24px',
        'leading-7': '28px',
        'leading-8': '32px',
        'leading-9': '36px',
        'leading-10': '40px',
        'leading-none': '1',
        'leading-tight': '1.25',
        'leading-snug': '1.375',
        'leading-normal': '1.5',
        'leading-relaxed': '1.625',
        'leading-loose': '2'
      },
      fontSize: {
        'xss': '10px',
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px',
        '7xl': '80px'
      },
      spacing: {
        0: '0px',
        'px': '1px',
        '0.5': '2px',
        1: '4px',
        '1.5': '6px',
        2: '8px',
        '2.5': '10px',
        3: '12px',
        '3.5': '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px'
      },
      colors: {
        app: {
          text:  'var(--tsxahText)',
          background: 'var(--tsxahBackground)',
          dots: 'var(--tsxahDots)',
          logo: 'var(--tsxahLogo)',
          chevron: 'var(--tsxahChevron)',
          hover: 'var(--tsxahSubtleHover)'
        },
        nav: {
          borderHover: 'var(--tsxahNavBorderHover)',
          borderActive: 'var(--tsxahNavBorderActive)'
        },
        dropdown: {
          text: 'var(--tsxahDDText)',
          background: 'var(--tsxahDDBackground)',
          hoverBackground: 'var(--tsxahDDHoverBackground)',
          hoverText: 'var(--tsxahDDHoverText)',
          activeBackground: 'var(--tsxahDDActiveBackground)',
          activeText: 'var(--tsxahDDActiveText)',
          divider: 'var(--tsxahDivider)',
          icon: 'var(--tsxahDDIcon)',
          info: 'var(--tsxahDDInfo)'
        },
        primary: {
          hover: 'var(--tsxahPrimaryHover)',
          DEFAULT: 'var(--tsxahPrimary)'
        },
        secondary: {
          hover: 'var(--tsxahSecondaryHover)',
          DEFAULT: 'var(--tsxahSecondary)'
        },
        trans: {
          'black-08': 'rgba(0,0,0,.8)'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ]
}
