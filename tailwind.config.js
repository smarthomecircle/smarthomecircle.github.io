const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js', './lib/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        // Modern font stack like your IDE
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        // Enhanced typographic scale
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }], 
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.4' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      colors: {
        // Keep original teal + modern grays
        primary: colors.teal,
        accent: colors.blue,
        success: colors.emerald,
        warning: colors.amber,
        gray: colors.slate, // More modern gray palette
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Enhanced typography for better reading
            fontSize: '1.125rem', // 18px base for better readability
            lineHeight: '1.7',
            color: theme('colors.gray.700'),
            fontFamily: theme('fontFamily.sans').join(', '),
            
            // Improved heading styles
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h1: {
              fontSize: '2.25rem',
              lineHeight: '1.3',
              color: theme('colors.gray.900'),
              marginBottom: '2rem',
            },
            h2: {
              fontSize: '1.875rem', 
              lineHeight: '1.4',
              color: theme('colors.gray.900'),
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.5rem',
              lineHeight: '1.5', 
              color: theme('colors.gray.900'),
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            
            // Enhanced link styles
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'underline',
              textDecorationColor: theme('colors.primary.300'),
              textUnderlineOffset: '3px',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecorationColor: theme('colors.primary.500'),
              },
            },
            
            // Modern code styling
            code: {
              fontSize: '0.875rem',
              fontFamily: theme('fontFamily.mono').join(', '),
              color: theme('colors.primary.700'),
              backgroundColor: theme('colors.primary.50'),
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            
            // Enhanced pre/code block styling  
            pre: {
              fontSize: '0.875rem',
              fontFamily: theme('fontFamily.mono').join(', '),
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              borderRadius: '0.75rem',
              padding: '1.25rem',
              overflow: 'auto',
              border: `1px solid ${theme('colors.gray.800')}`,
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              padding: '0',
              fontWeight: 'normal',
            },
            
            // Enhanced blockquote
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              borderLeftWidth: '4px',
              backgroundColor: theme('colors.primary.50'),
              padding: '1rem 1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontStyle: 'italic',
              color: theme('colors.gray.700'),
            },
            
            // Better list styling
            'ul > li': {
              paddingLeft: '0.5rem',
            },
            'ol > li': {
              paddingLeft: '0.5rem',
            },
            'ul > li::marker': {
              color: theme('colors.primary.500'),
            },
            'ol > li::marker': {
              color: theme('colors.primary.500'),
              fontWeight: '600',
            },
            
            strong: { color: theme('colors.gray.900') },
            hr: { borderColor: theme('colors.gray.200') },
          },
        },
        // Enhanced dark mode
        dark: {
          css: {
            color: theme('colors.gray.300'),
            fontFamily: theme('fontFamily.sans').join(', '),
            
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.100'),
              fontFamily: theme('fontFamily.sans').join(', '),
            },
            
            a: {
              color: theme('colors.primary.400'),
              textDecorationColor: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.300'),
                textDecorationColor: theme('colors.primary.400'),
              },
            },
            
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.primary.900/20'),
            },
            
            pre: {
              backgroundColor: theme('colors.gray.900'),
              borderColor: theme('colors.gray.700'),
            },
            
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              backgroundColor: theme('colors.primary.900/10'),
              color: theme('colors.gray.300'),
            },
            
            'ul > li::marker': {
              color: theme('colors.primary.400'),
            },
            'ol > li::marker': {
              color: theme('colors.primary.400'),
            },
            
            strong: { color: theme('colors.gray.100') },
            hr: { borderColor: theme('colors.gray.700') },
            
            thead: {
              color: theme('colors.gray.100'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'),require('@tailwindcss/aspect-ratio'),],
}
