import { Request, Response } from 'express';
import { Template } from '../models/Template';

// Get all active templates (Optionally filter by occasion)
export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { occasion } = req.query;
    const filter: any = { isActive: true };

    if (occasion) {
      filter.occasionType = occasion;
    }

    const templates = await Template.find(filter);
    res.status(200).json({ success: true, count: templates.length, templates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates', error });
  }
};

// Get template details by ID
export const getTemplateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }
    res.status(200).json({ success: true, template });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching template details', error });
  }
};