import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

// 👈 export কি-ওয়ার্ড আছে কিনা খেয়াল করো
export interface ILayoutSuggestion {
  enhancedHeadline: string;
  subSlogan: string;
  primaryColor: string;
  secondaryColor: string;
  footerBgColor: string;
  posterMood: string;
}

export const generatePosterLayoutConfig = async (
  occasion: string,
  userHeadline: string,
  partyName: string,
  designation: string
): Promise<ILayoutSuggestion> => {
  try {
    const prompt = `
    Act as an expert Bangladeshi political poster graphic designer.
    Analyze the following details for a political poster:
    - Occasion: ${occasion}
    - User Headline Idea: "${userHeadline}"
    - Party/Organization: "${partyName}"
    - Person Designation: "${designation}"

    Return a JSON object ONLY with the following properties:
    {
      "enhancedHeadline": "A polished, highly impactful Bangladeshi political headline in Bengali script",
      "subSlogan": "A short matching political slogan or greeting line in Bengali script",
      "primaryColor": "Hex color code matching the occasion (e.g. green/red for Bijoy Dibosh, dark charcoal for Shok, deep blue/green for campaign)",
      "secondaryColor": "Hex accent color matching the primary color (e.g. gold, yellow, white)",
      "footerBgColor": "Hex dark background color for footer section",
      "posterMood": "A 2-word description of visual mood"
    }
    DO NOT output markdown ticks or extra explanations, output raw JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const rawText = response.text || '';
    const jsonString = rawText.replace(/```json|```/g, '').trim();
    const layoutConfig: ILayoutSuggestion = JSON.parse(jsonString);

    return layoutConfig;
  } catch (error) {
    console.error('Gemini Service Error:', error);
    return {
      enhancedHeadline: userHeadline || 'শুভেচ্ছাান্তে',
      subSlogan: 'সকলকে শুভেচ্ছা ও অভিনন্দন',
      primaryColor: '#006a4e',
      secondaryColor: '#f42a41',
      footerBgColor: '#004d38',
      posterMood: 'patriotic',
    };
  }
};