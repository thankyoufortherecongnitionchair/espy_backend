const dotenv = require('dotenv');
const { GoogleAuth } = require("google-auth-library");
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;
const { examplesarray } = require('./trainingarray');
const fs = require('fs').promises;
const { formatstring } = require('./prompt')
const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
async function main() {
  const result = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    //topP: 0.95,
    topK: 400,
    prompt: {
      context: "Answers must be unique and use largest range possible. Include no bold text in answer",
      examples: [{
        input: {
          content: `
            Use ${formatstring} for format, generate 5 albums under each mood. Ensure the albums are unique. Provide clear separations for each line and mood category.`
        },
        output: {
          content: `
            ${formatstring}
            `,
        },
      },
      ],
      messages: [{
        content: `
  
          Similar in format to ${formatstring}, generate 5 albums for each mood. Provide clear separations for each line and mood category.`
      }],
    }
  });
  //LLM ouput
  const outputtext = result[0].candidates[0].content;

  //Filtering Out LLM Output and arranging into html
  const regex = /Mood: (\w+)\s*([\s\S]*?)(?=(?:Mood:|$))/g;
  let match;
  const albumsByMood = [];

  while ((match = regex.exec(outputtext)) !== null) {
    const mood = match[1];
    const albums = match[2].trim().split('\n\n');
    albumsByMood.push({ mood, albums });
  }
  let htmlContent = '';
  albumsByMood.forEach(({ mood, albums }) => {
    const albumsList = albums.map(album => ` ${album}`).join('<br>');
    htmlContent += `
        <h2>${mood}</h2>
        
        <ul>
          ${albumsList}
        </ul><br />
        
      `;
  });

  const styledParagraph = `
      <div style="font-size: 16px; color: #333; margin-bottom: 20px; line-height: 1.6;">
        ${htmlContent}
      </div>
    `;


  await fs.appendFile("combined_reviews.html", styledParagraph);
}


module.exports = { main };
