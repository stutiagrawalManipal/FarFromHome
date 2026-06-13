const express = require("express");
const router = express.Router();

const { analyzeEmergency } = require("../services/aiService");

router.post("/analyze", async (req, res) => {
  const result = await analyzeEmergency(req.body.description);

  res.send(result);
});

module.exports = router;
const axios = require("axios");

async function testAI() {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3.1:8b",
      prompt: `
You are an emergency triage officer.

Analyze:
"Road accident. One person unconscious and bleeding heavily."

Return ONLY JSON:

{
  "priorityScore": number,
  "severity": "Critical|High|Medium|Low",
  "emergencyType": "Medical|Crime|Fire|Disaster|Women Safety",
  "reasoning": "short reason"
}
`,
      stream: false
    }
  );

  console.log(response.data.response);
}

testAI();