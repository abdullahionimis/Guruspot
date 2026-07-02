import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import { supabase } from '../config/supabase';

export const requireAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. No user found.' });
    }

    const { data: profile, error } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      return res.status(403).json({ error: 'Forbidden. Could not verify admin status.' });
    }

    if (!profile.is_admin) {
      return res.status(403).json({ error: 'Forbidden. Admin access required.' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: 'Internal server error during admin verification' });
  }
};
