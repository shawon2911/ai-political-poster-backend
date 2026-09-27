import puppeteer from 'puppeteer';
import cloudinary from '../config/cloudinary';

export const renderHtmlToImage = async (htmlContent: string): Promise<string> => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // High Res Poster Viewport (1200 x 1600 px)
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' }); // 👈 Updated here

    // Capture screenshot as buffer
    const imageBuffer = (await page.screenshot({ type: 'png' })) as Buffer;

    await browser.close();

    // Upload poster PNG to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'generated_posters', format: 'png' },
        (error, result) => {
          if (result) resolve(result.secure_url);
          else reject(error);
        }
      );
      uploadStream.end(imageBuffer);
    });
  } catch (error) {
    if (browser) await browser.close();
    console.error('Puppeteer Render Error:', error);
    throw new Error('Failed to render poster image');
  }
};