import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSignInSchema, createSignUpSchema } from '../../app/utils/authSchemas';

describe('authSchemas', () => {
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockT.mockImplementation((key: string) => key);
  });

  describe('createSignInSchema', () => {
    it('should create a schema with email and password fields', () => {
      const schema = createSignInSchema(mockT);

      expect(schema).toBeDefined();
      expect(schema.shape).toHaveProperty('email');
      expect(schema.shape).toHaveProperty('password');
    });

    it('should validate valid email and password', () => {
      const schema = createSignInSchema(mockT);
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const schema = createSignInSchema(mockT);
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty email', () => {
      const schema = createSignInSchema(mockT);
      const invalidData = {
        email: '',
        password: 'password123',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const schema = createSignInSchema(mockT);
      const invalidData = {
        email: 'test@example.com',
        password: '',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject password shorter than 6 characters', () => {
      const schema = createSignInSchema(mockT);
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should use translation function for error messages', () => {
      createSignInSchema(mockT);

      expect(mockT).toHaveBeenCalledWith('auth.validation.emailRequired');
      expect(mockT).toHaveBeenCalledWith('auth.validation.emailInvalid');
      expect(mockT).toHaveBeenCalledWith('auth.validation.passwordRequired');
      expect(mockT).toHaveBeenCalledWith('auth.validation.passwordMin');
    });
  });

  describe('createSignUpSchema', () => {
    it('should create a schema with name, email and password fields', () => {
      const schema = createSignUpSchema(mockT);

      expect(schema).toBeDefined();
      expect(schema.shape).toHaveProperty('name');
      expect(schema.shape).toHaveProperty('email');
      expect(schema.shape).toHaveProperty('password');
    });

    it('should validate valid sign up data', () => {
      const schema = createSignUpSchema(mockT);
      const validData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const schema = createSignUpSchema(mockT);
      const invalidData = {
        name: '',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject name shorter than 2 characters', () => {
      const schema = createSignUpSchema(mockT);
      const invalidData = {
        name: 'A',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should inherit email and password validation from sign in schema', () => {
      const schema = createSignUpSchema(mockT);
      const invalidEmailData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };

      const invalidPasswordData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: '123',
      };

      expect(schema.safeParse(invalidEmailData).success).toBe(false);
      expect(schema.safeParse(invalidPasswordData).success).toBe(false);
    });

    it('should use translation function for name validation messages', () => {
      createSignUpSchema(mockT);

      expect(mockT).toHaveBeenCalledWith('auth.validation.nameRequired');
      expect(mockT).toHaveBeenCalledWith('auth.validation.nameMin');
    });

    it('should accept valid name with multiple words', () => {
      const schema = createSignUpSchema(mockT);
      const validData = {
        name: 'John William Doe',
        email: 'test@example.com',
        password: 'password123',
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});