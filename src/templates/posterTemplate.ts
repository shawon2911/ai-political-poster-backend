export const generateHtmlPoster = (data: {
  headline: string;
  subSlogan: string;
  name: string;
  designation: string;
  partyName: string;
  location: string;
  photoUrls: string[];
  primaryColor: string;
  secondaryColor: string;
  footerBgColor: string;
}): string => {
  const leaderPhotosHtml = data.photoUrls
    .map(
      (url) =>
        `<div class="photo-card"><img src="${url}" alt="Leader Photo" /></div>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html lang="bn">
  <head>
    <meta charset="UTF-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700;900&display=swap');
      
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px;
        height: 1600px;
        font-family: 'Noto Sans Bengali', sans-serif;
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      }
      
      /* Top Header Banner */
      .header-bar {
        background-color: ${data.primaryColor};
        color: white;
        padding: 40px;
        text-align: center;
        border-bottom: 12px solid ${data.secondaryColor};
      }
      .banner-title {
        font-size: 56px;
        font-weight: 900;
        margin-bottom: 10px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      .sub-slogan {
        font-size: 32px;
        color: ${data.secondaryColor};
        font-weight: 700;
      }

      /* Photo Grid Section */
      .photos-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        padding: 40px;
        flex-grow: 1;
      }
      .photo-card {
        width: 320px;
        height: 420px;
        border-radius: 20px;
        border: 8px solid white;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        background: #ddd;
      }
      .photo-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Middle Headline */
      .headline-section {
        text-align: center;
        padding: 20px 40px;
      }
      .main-headline {
        font-size: 68px;
        font-weight: 900;
        color: ${data.primaryColor};
        line-height: 1.2;
      }

      /* Footer Section (প্রচারে) */
      .footer-section {
        background-color: ${data.footerBgColor};
        color: white;
        padding: 40px;
        text-align: center;
        border-top: 8px solid ${data.secondaryColor};
      }
      .credit-tag {
        font-size: 28px;
        background: ${data.secondaryColor};
        color: #1e293b;
        display: inline-block;
        padding: 6px 24px;
        border-radius: 50px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .user-name {
        font-size: 52px;
        font-weight: 900;
        margin-bottom: 5px;
      }
      .user-details {
        font-size: 30px;
        opacity: 0.9;
      }
    </style>
  </head>
  <body>
    <div class="header-bar">
      <div class="banner-title">${data.partyName}</div>
      <div class="sub-slogan">${data.subSlogan}</div>
    </div>

    <div class="photos-container">
      ${leaderPhotosHtml}
    </div>

    <div class="headline-section">
      <div class="main-headline">${data.headline}</div>
    </div>

    <div class="footer-section">
      <div class="credit-tag">প্রচারে</div>
      <div class="user-name">${data.name}</div>
      <div class="user-details">${data.designation} | ${data.location}</div>
    </div>
  </body>
  </html>
  `;
};