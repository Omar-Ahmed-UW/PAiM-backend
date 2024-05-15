const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
}).getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction: "",
});
async function generateText(prompt: string) {
    const response = await this.gemini.generateContent(prompt).response.text();
    return response;
}
module.exports = { generateText };
