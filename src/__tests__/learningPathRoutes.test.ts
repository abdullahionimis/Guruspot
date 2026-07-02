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

describe('Learning Path Routes', () => {
  const validToken = 'valid-token';
  const mockUser = { id: 'admin-123', email: 'admin@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default auth mock
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
  });

  describe('GET /api/learning-paths', () => {
    it('should fetch all learning paths', async () => {
      const mockPaths = [{ id: 'path-1', title: 'React Basics' }];
      
      const mockOrder = jest.fn().mockResolvedValue({ data: mockPaths, error: null });
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: mockOrder,
        }),
      });

      const res = await request(app)
        .get('/api/learning-paths')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(mockPaths);
    });
  });

  describe('POST /api/learning-paths', () => {
    it('should reject non-admin users', async () => {
      // Mock requireAdmin checking the user profile
      const mockSingle = jest.fn().mockResolvedValue({ data: { is_admin: false }, error: null });
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const res = await request(app)
        .post('/api/learning-paths')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ title: 'New Path' });

      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/Forbidden/);
    });

    it('should create a learning path for admins', async () => {
      const mockPath = { id: 'new-path', title: 'Advanced TS' };

      // Mock admin check
      const mockAdminSingle = jest.fn().mockResolvedValue({ data: { is_admin: true }, error: null });
      
      // Mock insert returning data
      const mockInsertSingle = jest.fn().mockResolvedValue({ data: mockPath, error: null });

      (supabase.from as jest.Mock).mockImplementation((table) => {
        if (table === 'users') {
          return {
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                single: mockAdminSingle,
              }),
            }),
          };
        }
        if (table === 'learning_paths') {
          return {
            insert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                single: mockInsertSingle,
              }),
            }),
          };
        }
      });

      const res = await request(app)
        .post('/api/learning-paths')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ title: 'Advanced TS', skill_level: 'advanced' });

      expect(res.status).toBe(201);
      expect(res.body.data).toEqual(mockPath);
    });
  });
});
