import { vi } from 'vitest'

// Mock des modules Nuxt couramment utilisés
vi.mock('#imports', () => ({
  useI18n: () => ({
    t: (key: string) => key // Mock simple pour les traductions
  }),
  useLocalePath: () => (path: string) => path,
  useRouter: () => ({
    push: vi.fn()
  })
}))

// Configuration globale pour les tests
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))
