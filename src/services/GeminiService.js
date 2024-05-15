const { GoogleGenerativeAI } = require("@google/generative-ai");
const { SystemMessage: systemMessage } = require("../../prompts");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const gemini = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction: systemMessage,
});
async function GenerateText(prompt) {
    const result = await gemini.generateContent(prompt);
    const response = await result.response;
    return response.text();
}
module.exports = { GenerateText };
