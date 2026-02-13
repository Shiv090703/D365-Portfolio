import { GoogleGenAI } from "@google/genai";

export const ensureApiKey = async (): Promise<boolean> => {
  const win = window as any;
  if (typeof win.aistudio !== 'undefined') {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      try {
        await win.aistudio.openSelectKey();
        return await win.aistudio.hasSelectedApiKey();
      } catch (e) {
        console.error("Key selection failed", e);
        return false;
      }
    }
    return true;
  }
  // Fallback for dev environments if process.env is populated but no window.aistudio
  return !!process.env.API_KEY;
};

export const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const editImage = async (base64Image: string, prompt: string, mimeType: string = 'image/png'): Promise<string> => {
  const ai = getAIClient();
  const model = 'gemini-2.5-flash-image';

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};

export const generateVideo = async (
  prompt: string, 
  base64Image?: string, 
  aspectRatio: '16:9' | '9:16' = '16:9'
): Promise<string> => {
  // Ensure user has selected a key for Veo
  const hasKey = await ensureApiKey();
  if (!hasKey) throw new Error("API Key selection required for Veo models.");

  // IMPORTANT: Create new client to pick up the potentially newly selected key
  const ai = getAIClient();
  const model = 'veo-3.1-fast-generate-preview';

  try {
    let operation;
    
    if (base64Image) {
        operation = await ai.models.generateVideos({
            model,
            prompt: prompt || 'Animate this image', 
            image: {
                imageBytes: base64Image,
                mimeType: 'image/png' // Assuming PNG for simplicity in this demo
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio
            }
        });
    } else {
        operation = await ai.models.generateVideos({
            model,
            prompt,
            config: {
                numberOfVideos: 1,
                resolution: '1080p',
                aspectRatio
            }
        });
    }

    // Polling loop
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
        operation = await ai.operations.getVideosOperation({ operation });
    }

    if (operation.error) {
        throw new Error(operation.error.message);
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("No video URI returned");

    // Fetch the actual video bytes using the key
    const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
    if (!response.ok) throw new Error("Failed to download generated video");
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
};