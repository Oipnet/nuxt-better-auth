import { describe, it, expect, vi, beforeEach } from 'vitest'
import { z } from 'zod'
import { useAuthForm } from '../../app/composables/useAuthForm'

// Mock vee-validate
const mockHandleSubmit = vi.fn()
const mockUseField = vi.fn()
const mockUseForm = vi.fn()

vi.mock('vee-validate', () => ({
  useForm: () => mockUseForm(),
  useField: (...args: any[]) => mockUseField(...args)
}))

vi.mock('@vee-validate/zod', () => ({
  toTypedSchema: vi.fn(schema => schema)
}))

describe('useAuthForm', () => {
  const testSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
  })

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseForm.mockReturnValue({
      handleSubmit: mockHandleSubmit
    })

    mockUseField.mockImplementation((fieldName: string) => {
      if (fieldName === 'email') {
        return {
          value: 'test@example.com',
          errorMessage: null
        }
      }
      if (fieldName === 'password') {
        return {
          value: 'password123',
          errorMessage: null
        }
      }
      return {
        value: undefined,
        errorMessage: null
      }
    })
  })

  it('should initialize form with schema', () => {
    const { handleSubmit, email, password } = useAuthForm({
      schema: testSchema
    })

    expect(handleSubmit).toBe(mockHandleSubmit)
    expect(email).toBe('test@example.com')
    expect(password).toBe('password123')
  })

  it('should provide email and password fields with error messages', () => {
    mockUseField.mockImplementation((fieldName: string) => {
      if (fieldName === 'email') {
        return {
          value: '',
          errorMessage: 'Email is required'
        }
      }
      if (fieldName === 'password') {
        return {
          value: '',
          errorMessage: 'Password is required'
        }
      }
      return {
        value: undefined,
        errorMessage: null
      }
    })

    const { emailError, passwordError } = useAuthForm({
      schema: testSchema
    })

    expect(emailError).toBe('Email is required')
    expect(passwordError).toBe('Password is required')
  })

  it('should call useField with correct parameters for email', () => {
    useAuthForm({ schema: testSchema })

    expect(mockUseField).toHaveBeenCalledWith('email', undefined, {
      validateOnValueUpdate: true
    })
  })

  it('should call useField with correct parameters for password', () => {
    useAuthForm({ schema: testSchema })

    expect(mockUseField).toHaveBeenCalledWith('password', undefined, {
      validateOnValueUpdate: true
    })
  })

  it('should provide registerField function', () => {
    const { registerField } = useAuthForm({
      schema: testSchema
    })

    expect(typeof registerField).toBe('function')

    // Test registerField usage
    registerField('name')
    expect(mockUseField).toHaveBeenCalledWith('name')
  })

  it('should work with different schema types', () => {
    const simpleSchema = z.object({
      email: z.string(),
      password: z.string()
    })

    const result = useAuthForm({
      schema: simpleSchema
    })

    expect(result).toHaveProperty('handleSubmit')
    expect(result).toHaveProperty('email')
    expect(result).toHaveProperty('password')
    expect(result).toHaveProperty('emailError')
    expect(result).toHaveProperty('passwordError')
    expect(result).toHaveProperty('registerField')
  })

  it('should handle initial values parameter', () => {
    const initialValues = {
      email: 'initial@example.com',
      password: 'initialpass'
    }

    useAuthForm({
      schema: testSchema,
      initialValues
    })

    // Verify that the form is initialized (toTypedSchema should be called)
    expect(mockUseForm).toHaveBeenCalled()
  })
})
