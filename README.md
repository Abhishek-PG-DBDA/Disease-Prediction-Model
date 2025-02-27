# Disease Prediction Model

## Overview
This is a **React-based Disease Prediction Model** that presents users with a series of health-related questions and calculates the likelihood of having specific diseases based on their responses.

## Features
- Provides a **questionnaire-based disease assessment**.
- Supports **multiple diseases**, including Diabetes, Hypertension, Heart Disease, Depression, and more.
- Uses **weighted responses** to generate a **risk assessment report**.
- Displays **Low, Medium, or High** risk levels based on user responses.
- Fully functional in a **browser environment**.

## Technologies Used
- **React 18.2.0**
- **ES Modules (ESM.sh)**
- **TypeScript (TSX)**
- **HTML & CSS**
- **React Hooks (useState)**

## How It Works
1. Users answer **Yes/No** questions related to symptoms.
2. Each question has a **weight** that contributes to the final risk calculation.
3. Once all questions are answered, the system generates a **risk assessment report**.
4. The report provides a **percentage-based risk level** (Low, Medium, or High) for each disease.

## Installation & Usage
1. Copy the provided TypeScript code into a file (e.g., `disease_predictor.js`).
2. Ensure your project includes a root `div` in the HTML:
   ```html
   <div id="root"></div>
   ```
3. Use a module-based environment to run the code (e.g., a modern browser with ES module support).

## Running in a Browser
This script is designed to work **without a traditional build step**. Simply load it in a web server that supports **ESM imports**.

## Demo link 
- https://www.val.town/v/abhishekprojects/superLimePig

## Risk Disclaimer
- This model **does not provide medical advice**.
- Always **consult a healthcare professional** for accurate diagnosis.

## License
This project is open-source and free to use.
