import axios from "axios";

async function testAI() {
    const prompt = `
You are an emergency triage officer.

Analyze the emergency report.

Priority Score Rules:

0-25 = Low
26-50 = Medium
51-75 = High
76-100 = Critical

Examples:

Report: "Minor traffic jam"
Output:
{
  "priorityScore": 20,
  "severity": "Low"
}

Report: "House on fire with people trapped"
Output:
{
  "priorityScore": 95,
  "severity": "Critical"
}

Return ONLY valid JSON.

{
  "priorityScore": number,
  "severity": "Critical|High|Medium|Low",
  "emergencyType": "Medical|Crime|Fire|Disaster|Women Safety",
  "reasoning": "short reason"
}

Emergency Report:
Road accident. One person unconscious and bleeding heavily.
`;
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3.1:8b",
      prompt,
      stream: false,
    }
  );

  console.log(response.data.response);
}

testAI(); 