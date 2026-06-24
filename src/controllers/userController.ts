import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { supabase } from '../config/supabase';

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {

    const userId = req.user.id;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {

      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const userEmail = req.user.email;

    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: userEmail,
        ...updates,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase Upsert Error:', error);
      return res.status(400).json({ error: 'Failed to update profile' });
    }

    res.status(200).json({ message: 'Profile updated successfully', data });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
