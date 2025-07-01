
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TransformationOptionsState } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will be caught by the App component and displayed to the user.
  // In a real production app, you might want to handle this more gracefully or ensure
  // the build process checks for API_KEY.
  console.error("API_KEY is not set. Please ensure the API_KEY environment variable is configured.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "NO_API_KEY_FALLBACK" }); // Fallback to avoid crash if undefined, error handled in App.tsx

function getIntensityDescription(intensity: number): string {
  if (intensity <= 33) return 'subtle';
  if (intensity <= 66) return 'moderate';
  return 'significant';
}

function constructPrompt(
  inputText: string,
  options: TransformationOptionsState,
  intensity: number
): string {
  const intensityDesc = getIntensityDescription(intensity);
  let transformationsList = [];

  if (options.synonymReplacement) {
    transformationsList.push("- Vary word choices by using contextually appropriate synonyms.");
  }
  if (options.sentenceStructureVariation) {
    transformationsList.push("- Diversify sentence structures and lengths. Combine short sentences or break down long ones where it improves flow and readability.");
  }
  if (options.contractionInsertion) {
    transformationsList.push("- Introduce contractions (e.g., \"don't\" for \"do not\", \"it's\" for \"it is\") to make the tone more conversational and less formal, where appropriate.");
  }
  if (options.aiTropesReduction) {
    transformationsList.push("- Identify and rephrase common AI-like phrases, clichés, or overly formal constructions (e.g., \"delve into,\" \"tapestry of,\" \"it is important to note that,\" \"in conclusion\" used rigidly). Aim for more natural and engaging language.");
  }

  const transformationsPrompt = transformationsList.length > 0 
    ? `Apply the following transformations with ${intensityDesc} intensity:\n${transformationsList.join("\n")}`
    : "Rewrite the text to sound more human, focusing on natural flow and readability.";

  return `
You are an expert text humanizer. Your task is to rewrite the provided AI-generated text to make it sound more natural, engaging, and human-like. Avoid robotic phrasing and predictable sentence structures.
${transformationsPrompt}

Please ensure the core meaning and information of the original text are preserved.
The output should ONLY be the rewritten text, with no additional commentary or explanations from you.

Original text:
---
${inputText}
---

Rewritten text:
  `.trim();
}

export const humanizeText = async (
  inputText: string,
  options: TransformationOptionsState,
  intensity: number
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = constructPrompt(inputText, options, intensity);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
    });
    
    const rewrittenText = response.text;
    if (typeof rewrittenText === 'string') {
      return rewrittenText.trim();
    }
    throw new Error("Unexpected response format from Gemini API.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to humanize text: ${error.message}`);
    }
    throw new Error("Failed to humanize text due to an unknown error.");
  }
};
