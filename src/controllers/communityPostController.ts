import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const getCommunityPosts = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*, user:users(id, full_name, avatar_url)')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch community posts' });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching community posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCommunityPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('community_posts')
      .select('*, user:users(id, full_name, avatar_url)')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Community post not found' });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching community post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCommunityPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, content, tags } = req.body;

    const { data, error } = await supabase
      .from('community_posts')
      .insert([{ user_id: userId, title, content, tags }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: 'Failed to create community post' });
    }

    res.status(201).json({ message: 'Community post created successfully', data });
  } catch (error) {
    console.error('Error creating community post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCommunityPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updates = req.body;

    // Check if the post exists and belongs to the user
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({ error: 'Community post not found' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'Forbidden. You can only update your own posts.' });
    }

    const { data, error } = await supabase
      .from('community_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: 'Failed to update community post' });
    }

    res.status(200).json({ message: 'Community post updated successfully', data });
  } catch (error) {
    console.error('Error updating community post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCommunityPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Check if the post exists and belongs to the user
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({ error: 'Community post not found' });
    }

    if (post.user_id !== userId) {
      // Allow admin deletion? For now just owner.
      // We could check if req.user is admin, but let's keep it simple.
      return res.status(403).json({ error: 'Forbidden. You can only delete your own posts.' });
    }

    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: 'Failed to delete community post' });
    }

    res.status(200).json({ message: 'Community post deleted successfully' });
  } catch (error) {
    console.error('Error deleting community post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
