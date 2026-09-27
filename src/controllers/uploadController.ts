import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No photo uploaded' });
      return;
    }

    // Convert image buffer to base64 string for Cloudinary stream upload
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'political_poster_uploads',
    });

    res.status(200).json({
      message: 'Photo uploaded successfully',
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo to Cloudinary', error });
  }
};