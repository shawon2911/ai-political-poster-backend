import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Template } from './models/Template';

dotenv.config();

const initialTemplates = [
  {
    title: 'মহান বিজয় দিবস - ক্লাসিক লাল-সবুজ',
    occasionType: 'bijoy_dibosh',
    thumbnailUrl: 'https://res.cloudinary.com/zt73t39n/image/upload/v1790495842/images.jpg',
    layoutConfig: {
      baseBgColor: '#006a4e', // জাতীয় পতাকার সবুজ
      accentColor: '#f42a41', // জাতীয় পতাকার লাল
      bannerText: 'সবাইকে মহান বিজয় দিবসের শুভেচ্ছা',
      photoCount: 3,
      headerFontFamily: 'Kalpurush',
    },
    isActive: true,
  },
  {
    title: 'জাতীয় শোক ও স্মরণ সভা - গাম্ভীর্যপূর্ণ থিম',
    occasionType: 'shok',
    thumbnailUrl: 'https://res.cloudinary.com/zt73t39n/image/upload/v1790495841/%E0%A6%B6%E0%A7%8B%E0%A6%95-1.jpg',
    layoutConfig: {
      baseBgColor: '#1a1a1a', // কালো থিম
      accentColor: '#ffffff', // সাদা টেক্সট
      bannerText: 'গভীর শ্রদ্ধায় স্মরণ করি',
      photoCount: 2,
      headerFontFamily: 'Kalpurush',
    },
    isActive: true,
  },
  {
    title: 'নির্বাচনী প্রচার ও মতবিনিময় - পোস্টার থিম',
    occasionType: 'election',
    thumbnailUrl: 'https://res.cloudinary.com/zt73t39n/image/upload/v1790495849/7d2f914e0644619c7d829e4b4a8ba507.jpg',
    layoutConfig: {
      baseBgColor: '#004085', // রয়্যাল ব্লু
      accentColor: '#ffc107', // সোনালী হলুদ
      bannerText: 'আসন্ন নির্বাচনে আপনার মূল্যবান ভোট প্রত্যাশী',
      photoCount: 1,
      headerFontFamily: 'Kalpurush',
    },
    isActive: true,
  },
];

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Database connected for seeding...');

    // Clear existing templates to avoid duplicates
    await Template.deleteMany({});
    console.log('Existing templates cleared.');

    // Insert new seed templates
    const createdTemplates = await Template.insertMany(initialTemplates);
    console.log(`Successfully seeded ${createdTemplates.length} templates!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
};

seedTemplates();