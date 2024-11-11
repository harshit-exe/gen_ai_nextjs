"use server";

import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";

import { z } from "zod";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
});

const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
    items : z.string(),
  }),
});

const model = groq("llama3-70b-8192");




export const generateRecipies = async (previousState,formdata) => {
    const goal = formdata.get("goal")
  try {

    const { object } = await generateObject({
      model,
      schema: recipeSchema,
      prompt: `This Fitness goal is ${goal},Give me one randome recipe and explain how to make it detail`,
    });

    console.log(object);
    

    return object.recipe

  } catch (error) {
    console.log(error);
  }
};





