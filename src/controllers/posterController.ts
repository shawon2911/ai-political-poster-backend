import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Poster } from '../models/Poster';
import { Template } from '../models/Template';
import { generatePosterLayoutConfig } from '../services/geminiService';
import { generateHtmlPoster } from '../templates/posterTemplate';
import { renderHtmlToImage } from '../services/renderService';

// 1. Create and Generate Poster
export const createPoster = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { templateId, name, designation, partyName, location, headlineText, uploadedPhotoUrls } = req.body;

    if (!templateId || !name || !designation || !partyName || !headlineText) {
      res.status(400).json({ message: 'All required poster fields must be provided' });
      return;
    }

    const template = await Template.findById(templateId);
    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    // Create initial DB record with pending status
    const posterDoc = await Poster.create({
      userId,
      templateId,
      formData: { name, designation, partyName, location, headlineText },
      uploadedPhotoUrls: uploadedPhotoUrls || [],
      status: 'generating',
    });

    // Step A: Get Gemini AI Layout Suggestions
    const aiConfig = await generatePosterLayoutConfig(
      template.occasionType,
      headlineText,
      partyName,
      designation
    );

    // Step B: Build HTML Template
    const htmlPoster = generateHtmlPoster({
      headline: aiConfig.enhancedHeadline,
      subSlogan: aiConfig.subSlogan,
      name,
      designation,
      partyName,
      location,
      photoUrls: uploadedPhotoUrls || [],
      primaryColor: aiConfig.primaryColor,
      secondaryColor: aiConfig.secondaryColor,
      footerBgColor: aiConfig.footerBgColor,
    });

    // Step C: Render HTML to PNG Image
    const generatedImageUrl = await renderHtmlToImage(htmlPoster);

    // Update Poster record as completed
    posterDoc.generatedImageUrl = generatedImageUrl;
    posterDoc.status = 'completed';
    await posterDoc.save();

    res.status(201).json({
      success: true,
      message: 'Poster generated successfully!',
      poster: posterDoc,
    });
  } catch (error) {
    console.error('Poster Generation Error:', error);
    res.status(500).json({ message: 'Poster generation failed', error });
  }
};

// 2. Get User Posters History
export const getUserPosters = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const posters = await Poster.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posters.length, posters });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user posters', error });
  }
};

// 3. Get Single Poster by ID
export const getPosterById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const poster = await Poster.findById(req.params.id);
    if (!poster) {
      res.status(404).json({ message: 'Poster not found' });
      return;
    }
    res.status(200).json({ success: true, poster });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching poster details', error });
  }
};