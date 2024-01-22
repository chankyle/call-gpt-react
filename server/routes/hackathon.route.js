const config = require("../config/config.js");
const router = config.router;
const client = config.client;
const axios = require("axios");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let promptArray = [
  { role: "system", content: "You are a helpful assistant." },
  {
    role: "assistant",
    content:
      "Hello! I understand you're looking for a pair of AirPods, is that correct?",
  },
];

async function askGPT(prompt) {
  promptArray.push({ role: "user", content: prompt });
  console.log(promptArray);
  const completion = await openai.chat.completions.create({
    messages: promptArray,
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0];
}

// Client requests events
router.get("/ask-gpt/:prompt", async (req, res, next) => {
  //   let response = await askGPT(req.params.prompt);
  try {
    let response = await askGPT(req.params.prompt);
    console.log(response);
    return res.status(200).send(response.message.content);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
