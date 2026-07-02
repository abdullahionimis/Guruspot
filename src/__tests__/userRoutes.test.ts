import request from 'supertest';
import app from '../server';

// Mock the Supabase client
jest.mock('../config/supabase', () => {
  return {
    supabase: {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      upsert: jest.fn().mockReturnThis(),
    },
  };
});

import { supabase } from '../config/supabase';

describe('User Routes', () => {
  const validToken = 'valid-token';
  const mockUser = { id: 'user-123', email: 'test@example.com' };
  const mockProfile = { id: 'user-123', full_name: 'Test User', email: 'test@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users/profile', () => {
    it('should return 401 if no token provided', async () => {
      const res = await request(app).get('/api/users/profile');
      expect(res.status).toBe(401);
    });

    it('should return the user profile if valid token is provided', async () => {
      // Mock auth.getUser
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      // Mock from('users').select('*').eq('id', ...).single()
      const mockSingle = jest.fn().mockResolvedValue({ data: mockProfile, error: null });
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(mockProfile);
    });
  });
});
