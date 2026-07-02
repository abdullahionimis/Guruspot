import request from 'supertest';
import app from '../server';
import { supabase } from '../config/supabase';

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
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
    },
  };
});

describe('Community Post Routes', () => {
  const validToken = 'valid-token';
  const mockUser = { id: 'user-123', email: 'test@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
    
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
  });

  describe('POST /api/community-posts', () => {
    it('should validate inputs before creating', async () => {
      const res = await request(app)
        .post('/api/community-posts')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ title: 'A' }); // Too short, no content

      expect(res.status).toBe(400);
      expect(res.body.details).toBeDefined();
    });

    it('should create a community post', async () => {
      const mockPost = { id: 'post-1', user_id: 'user-123', title: 'Hello World', content: 'This is my first post!' };
      
      const mockSingle = jest.fn().mockResolvedValue({ data: mockPost, error: null });
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const res = await request(app)
        .post('/api/community-posts')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ title: 'Hello World', content: 'This is my first post!' });

      expect(res.status).toBe(201);
      expect(res.body.data).toEqual(mockPost);
    });
  });
});
