require('dotenv').config();
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { main } = require('./LLM');
const { examplesarray } = require('./trainingarray');
const { formatstring } = require('./prompt')
const { fetchAllDataAndWriteToFile } = require('./emailfetch');
const { firebaseConfig } = require('./firebase')
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = process.env.COLLECTIONNAME;
let combinedReviewsHtml;
let styledParagraph;
let outputtext;
let emails;
//LLM API
const examples = examplesarray.map(e => "\nMood: " + e[0] + "\nAlbum: " + e[1] + "\nArtist: " + e[2] + "\nBPM: " + e[3]).join('')

////////////////////////////////////////////////////////////////////////
// SCRAPING BOT BEGINs//

async function pup() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://pitchfork.com/reviews/albums/", { timeout: 160000 });
    const reviewsPage1 = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("#reviews > div.reviews-page__contents > div > div.clearfix > div > div.container-fluid > div > div > a")).map(linkElement => {
        const href = linkElement.getAttribute("href");
        const title = linkElement.querySelector("div.review__title > ul > li").textContent;
        return { title, href };
      });
    });
    await page.goto("https://pitchfork.com/reviews/albums/?page=2", { timeout: 80000 });
    const reviewsPage2 = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("#reviews > div.reviews-page__contents > div > div.clearfix > div > div.container-fluid > div > div > a")).map(linkElement => {
        const href = linkElement.getAttribute("href");
        const title = linkElement.querySelector("div.review__title > ul > li").textContent;
        return { title, href };
      });
    });
    await page.goto("https://www.stereogum.com/category/music/", { timeout: 190000 });
    const reviewPage3 = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('div.article-card__content > p > a')).map(linkElement => {
        const href = linkElement.getAttribute("href");
        const title = linkElement.textContent.trim();
        return { title, href };
      });
    });
    await page.goto("https://consequence.net/category/music/", { timeout: 80000 });

    const reviewPage4 = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('body > div.body > div > div.wrap > div > div.non-fixed-content > section:nth-child(2) > div > div > div> h3')).map(x => x.textContent.trim());
    });
    const allReviews1 = reviewsPage1.concat(reviewsPage2);
    const allReviews = allReviews1.concat(reviewPage3);
    const pitchforkReviewsHtml = `<h2>Pitchfork Reviews</h2>\n<ul>${reviewsPage1.map(review => `<li>${review}</li>`).join('\n')}</ul>`;
    const stereogumReviewsHtml = `<h2>Stereogum Reviews</h2>\n<ul>${reviewPage3.map(review => `<li><a href="${review.href}" target="_blank">${review.title}</a></li>`).join('\n')}</ul>`;
    const consofsoundReviewsHtml = `<h2>Consequence of Sound Reviews</h2>\n<p>${reviewPage4.join('</p><p>')}</p>`;

    const combinedReviewsHtml = `

    <html>
<head>
<style>body{font-family:'Arial',sans-serif;background-color:#f8f8f8;color:#333;margin:20px;display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}h2{color:#ff6f61;border-bottom:2px solid #ff6f61;padding-bottom:5px;margin-bottom:15px}ul{list-style-type:none;padding:0}li{background-color:#f8f8f8;border:1px solid #ddd;margin-bottom:10px;padding:15px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,.1);transition:transform 0.3s ease-in-out}li:hover{transform:scale(1.05);box-shadow:0 4px 8px rgba(0,0,0,.2)}a{text-decoration:none;color:#4285f4;font-weight:700}p{margin-bottom:20px;line-height:1.6}</style>
</head>
<body>
  <p><strong>Good Morning! Here are the latest reviews that you can now go through with a single click!</strong></p>
  <div class="reviews-container">
    <h2>Pitchfork Reviews</h2>
    <ul>
      ${reviewsPage1.map(review => `
        <li>
          <a href="https://pitchfork.com${review.href}" target="_blank">${review.title}</a>
        </li>`).join('\n')}
      ${reviewsPage2.map(review => `
        <li>
          <a href="https://pitchfork.com${review.href}" target="_blank">${review.title}</a>
        </li>`).join('\n')}
    </ul>

    <h2>Stereogum Reviews</h2>
    <ul>
      ${reviewPage3.map(review => `
        <li>
          <a href="${review.href}" target="_blank">${review.title}</a>
        </li>`).join('\n')}
    </ul>

    <h2>Consequence of Sound Reviews</h2>
    <div class="consequence-reviews">
      ${reviewPage4.map(review => `<p>${review}</p>`).join('\n')}
    </div>
  </div>
</body>
</html>
`;
    await fs.writeFile("combined_reviews.html", combinedReviewsHtml);
    await main();
    await sendMail();
    await browser.close();
  } catch (error) {
    console.error('Error in pup:', error);
  }
}
// SCRAPING BOT ENDs//
////////////////////////////////////////////////////////////////////////
async function sendMail() {
  try {
    const filePath = 'combined_reviews.html';
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: {
        name: 'Espy',
        address: process.env.MAIL
      },
      bcc: emails,
      subject: "Your Daily Review Roundup!",
      text: "VerBoss + Espy",
      html: fileContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent!');
  } catch (error) {
    console.error('Error in sendMail:', error);
  }
}
async function run() {
  emails = await fetchAllDataAndWriteToFile();

  await pup();
}


//entry point
run();

