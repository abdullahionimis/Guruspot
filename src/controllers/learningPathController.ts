import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getLearningPaths = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch learning paths' });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLearningPathById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLearningPath = async (req: Request, res: Response) => {
  try {
    const { title, description, skill_level } = req.body;

    const { data, error } = await supabase
      .from('learning_paths')
      .insert([{ title, description, skill_level }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: 'Failed to create learning path' });
    }

    res.status(201).json({ message: 'Learning path created successfully', data });
  } catch (error) {
    console.error('Error creating learning path:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLearningPath = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('learning_paths')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: 'Failed to update learning path' });
    }

    if (!data) {
       return res.status(404).json({ error: 'Learning path not found' });
    }

    res.status(200).json({ message: 'Learning path updated successfully', data });
  } catch (error) {
    console.error('Error updating learning path:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLearningPath = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('learning_paths')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: 'Failed to delete learning path' });
    }

    res.status(200).json({ message: 'Learning path deleted successfully' });
  } catch (error) {
    console.error('Error deleting learning path:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
