import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

export default {
  theme: {
    preset: definePreset(Aura, {
      semantic: {
        warning: {
          50: '{orange.50}',
          100: '{orange.100}',
          200: '{orange.200}',
          300: '{orange.300}',
          400: '{orange.400}',
          500: '{orange.500}',
          600: '{orange.600}',
          700: '{orange.700}',
          800: '{orange.800}',
          900: '{orange.900}',
          950: '{orange.950}'
        },
        error: {
          50: '{red.50}',
          100: '{red.100}',
          200: '{red.200}',
          300: '{red.300}',
          400: '{red.400}',
          500: '{red.500}',
          600: '{red.600}',
          700: '{red.700}',
          800: '{red.800}',
          900: '{red.900}',
          950: '{red.950}'
        },
        info: {
          50: '{cyan.50}',
          100: '{cyan.100}',
          200: '{cyan.200}',
          300: '{cyan.300}',
          400: '{cyan.400}',
          500: '{cyan.500}',
          600: '{cyan.600}',
          700: '{cyan.700}',
          800: '{cyan.800}',
          900: '{cyan.900}',
          950: '{cyan.950}'
        },
        success: {
          50: '{green.50}',
          100: '{green.100}',
          200: '{green.200}',
          300: '{green.300}',
          400: '{green.400}',
          500: '{green.500}',
          600: '{green.600}',
          700: '{green.700}',
          800: '{green.800}',
          900: '{green.900}',
          950: '{green.950}'
        },
        colorScheme: {
          light: {
            warning: {
              color: '{warning.500}',
              inverseColor: '#ffffff',
              hoverColor: '{warning.600}',
              activeColor: '{warning.600}'
            },
            error: {
              color: '{error.500}',
              inverseColor: '#ffffff',
              hoverColor: '{error.600}',
              activeColor: '{error.600}'
            },
            info: {
              color: '{info.500}',
              inverseColor: '#ffffff',
              hoverColor: '{info.600}',
              activeColor: '{info.600}'
            },
            success: {
              color: '{success.500}',
              inverseColor: '#ffffff',
              hoverColor: '{success.600}',
              activeColor: '{success.600}'
            }
          }
        }
      }
    }),
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
}
