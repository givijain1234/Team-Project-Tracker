import { GoogleGenAI, Type } from "@google/genai";
import { ProjectStatus } from "../types";

// Initialize Gemini client only if API key is present
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateSampleProjects = async (): Promise<Array<{ name: string; owner: string; status: ProjectStatus }>> => {
  if (!ai) {
    console.warn("Gemini API Key is missing. Returning empty list.");
    return [];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 3 realistic, modern software development or marketing team projects. Include a project name, an owner name (full name), and a status.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "The name of the project" },
              owner: { type: Type.STRING, description: "The full name of the project owner" },
              status: { 
                type: Type.STRING, 
                enum: [ProjectStatus.NOT_STARTED, ProjectStatus.IN_PROGRESS, ProjectStatus.DONE],
                description: "The current status of the project"
              },
            },
            required: ["name", "owner", "status"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to generate projects via Gemini:", error);
    return [];
  }
};