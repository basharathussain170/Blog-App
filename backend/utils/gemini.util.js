import expressAsyncHandler from "express-async-handler";
import ai from "../config/gemini.config.js";

export const generateBlogDescription = expressAsyncHandler(
  async (inputTitle) => {
    let response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: inputTitle,
        },
      ],
      config: {
        maxOutputTokens: 2000,
        temperature: 0.8,
      },
    });

    return response;
  }
);
