/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React, { useState } from "https://esm.sh/react@18.2.0";

// Comprehensive disease prediction database
const DISEASE_SYMPTOMS = {
  "Diabetes": [
    { question: "Do you frequently feel thirsty?", weight: 0.8 },
    { question: "Do you urinate more than usual?", weight: 0.7 },
    { question: "Have you experienced unexplained weight loss?", weight: 0.6 },
    { question: "Do you have blurry vision?", weight: 0.5 },
  ],
  "Hypertension": [
    { question: "Do you often have headaches?", weight: 0.7 },
    { question: "Do you experience shortness of breath?", weight: 0.6 },
    { question: "Do you have chest pain?", weight: 0.8 },
    { question: "Are you over 40 years old?", weight: 0.5 },
  ],
  "Heart Disease": [
    { question: "Do you have chest discomfort?", weight: 0.9 },
    { question: "Do you experience shortness of breath?", weight: 0.7 },
    { question: "Do you have irregular heartbeats?", weight: 0.8 },
    { question: "Do you have a family history of heart disease?", weight: 0.6 },
  ],
  "Depression": [
    { question: "Do you feel persistently sad?", weight: 0.8 },
    { question: "Have you lost interest in activities you once enjoyed?", weight: 0.7 },
    { question: "Do you have trouble sleeping?", weight: 0.6 },
    { question: "Do you feel hopeless most of the time?", weight: 0.7 },
  ],
  "Thyroid Disorder": [
    { question: "Have you experienced unexplained weight changes?", weight: 0.7 },
    { question: "Do you feel constantly tired?", weight: 0.6 },
    { question: "Do you have temperature sensitivity?", weight: 0.5 },
    { question: "Have you noticed changes in your hair texture?", weight: 0.4 },
  ],
  "Arthritis": [
    { question: "Do you experience joint pain?", weight: 0.8 },
    { question: "Do your joints feel stiff, especially in the morning?", weight: 0.7 },
    { question: "Do you have swelling around your joints?", weight: 0.6 },
    { question: "Is the pain worse with movement?", weight: 0.5 },
  ],
  "Asthma": [
    { question: "Do you wheeze when breathing?", weight: 0.8 },
    { question: "Do you cough more at night?", weight: 0.7 },
    { question: "Do you have difficulty breathing during exercise?", weight: 0.6 },
    { question: "Do allergies trigger breathing problems?", weight: 0.5 },
  ],
  "Kidney Disease": [
    { question: "Do you have lower back pain?", weight: 0.7 },
    { question: "Do you notice changes in urination frequency?", weight: 0.8 },
    { question: "Do you have swelling in your feet or ankles?", weight: 0.6 },
    { question: "Do you feel constantly tired?", weight: 0.5 },
  ],
  "Liver Disease": [
    { question: "Do you have yellowing of the skin or eyes?", weight: 0.8 },
    { question: "Do you experience abdominal pain?", weight: 0.7 },
    { question: "Do you have dark urine?", weight: 0.6 },
    { question: "Do you bruise easily?", weight: 0.5 },
  ],
  "Alzheimer's": [
    { question: "Do you frequently forget recent conversations?", weight: 0.8 },
    { question: "Do you have trouble remembering familiar tasks?", weight: 0.7 },
    { question: "Do you get confused about time or place?", weight: 0.6 },
    { question: "Are you over 65 years old?", weight: 0.5 },
  ],
};

function DiseasePredictor() {
  const [currentDisease, setCurrentDisease] = useState(Object.keys(DISEASE_SYMPTOMS)[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [finalReport, setFinalReport] = useState(null);

  const currentDiseaseSymptoms = DISEASE_SYMPTOMS[currentDisease];

  const handleResponse = (isYes) => {
    const updatedResponses = {
      ...responses,
      [currentDisease]: {
        ...responses[currentDisease],
        [currentQuestionIndex]: {
          question: currentDiseaseSymptoms[currentQuestionIndex].question,
          answer: isYes,
          weight: currentDiseaseSymptoms[currentQuestionIndex].weight,
        },
      },
    };

    setResponses(updatedResponses);

    if (currentQuestionIndex < currentDiseaseSymptoms.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const nextDiseaseIndex = Object.keys(DISEASE_SYMPTOMS).indexOf(currentDisease) + 1;
      if (nextDiseaseIndex < Object.keys(DISEASE_SYMPTOMS).length) {
        setCurrentDisease(Object.keys(DISEASE_SYMPTOMS)[nextDiseaseIndex]);
        setCurrentQuestionIndex(0);
      } else {
        generateFinalReport(updatedResponses);
      }
    }
  };

  const generateFinalReport = (responses) => {
    const report = Object.keys(responses).map(disease => {
      const diseaseResponses = responses[disease];
      const positiveResponses = Object.values(diseaseResponses)
        .filter(response => response.answer)
        .reduce((total, response) => total + response.weight, 0);

      const totalWeight = currentDiseaseSymptoms.reduce((total, symptom) => total + symptom.weight, 0);
      const riskPercentage = (positiveResponses / totalWeight) * 100;

      return {
        disease,
        riskPercentage: riskPercentage.toFixed(2),
        risk: riskPercentage > 60 ? "High" : riskPercentage > 30 ? "Medium" : "Low",
      };
    });

    setFinalReport(report);
  };

  if (finalReport) {
    return (
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <h1>Disease Risk Assessment Report</h1>
        {finalReport.map(result => (
          <div key={result.disease} style={{ marginBottom: "15px" }}>
            <h2>{result.disease}</h2>
            <p>Risk Level: {result.risk}</p>
            <p>Risk Percentage: {result.riskPercentage}%</p>
          </div>
        ))}
        <p style={{ fontSize: "12px", color: "gray" }}>
          Note: This is a preliminary assessment. Always consult a healthcare professional for accurate diagnosis.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1>Disease Prediction Questionnaire</h1>
      <h2>{currentDisease}</h2>
      <p>{currentDiseaseSymptoms[currentQuestionIndex].question}</p>
      <div>
        <button onClick={() => handleResponse(true)} style={{ margin: "0 10px" }}>Yes</button>
        <button onClick={() => handleResponse(false)} style={{ margin: "0 10px" }}>No</button>
      </div>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "gray" }}>
        Progress: {Object.keys(DISEASE_SYMPTOMS).indexOf(currentDisease) + 1} / {Object.keys(DISEASE_SYMPTOMS).length}
        {" "}
        Diseases
      </p>
    </div>
  );
}

function client() {
  createRoot(document.getElementById("root")).render(<DiseasePredictor />);
}

if (typeof document !== "undefined") { client(); }

export default async function server(request: Request): Promise<Response> {
  return new Response(
    `
    <html>
      <head>
        <title>Disease Prediction Model</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            background-color: #f4f4f4; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://esm.town/v/std/catch"></script>
        <script type="module" src="${import.meta.url}"></script>
      </body>
    </html>
  `,
    {
      headers: { "Content-Type": "text/html" },
    },
  );
}
