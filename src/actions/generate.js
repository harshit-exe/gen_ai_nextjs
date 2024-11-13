"use server"

import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
})

const DEFAULT_RESPONSES = {
  code: {
    code: "console.log('Hello World');",
    explanation: "A simple example",
    wordCount: 3,
    characterCount: 21
  },
  copywriting: {
    title: "Sample Title",
    sections: [{ heading: "Introduction", content: "Sample content" }],
    wordCount: 4,
    characterCount: 31
  },
  creative: {
    title: "Story Title",
    paragraphs: ["Once upon a time..."],
    wordCount: 4,
    characterCount: 19
  },
  analysis: {
    summary: "Sample summary",
    keyPoints: ["Key point 1"],
    sentiment: "Neutral",
    wordCount: 4,
    characterCount: 25
  },
  quotes: {
    quote: "Sample quote",
    author: "Unknown",
    wordCount: 2,
    characterCount: 12
  }
}

export async function generateContent(previousState, formData) {
  const prompt = formData.get("prompt")
  const model = formData.get("model")
  const task = formData.get("task")
  const tone = formData.get("tone")
  const style = formData.get("style")
  const complexity = formData.get("complexity")
  const audience = formData.get("audience")

  if (!prompt) {
    return { error: "Prompt is required." }
  }

  try {
    const systemPrompt = `You are an AI assistant specialized in ${task}. 
    Your task is to generate content based on the following parameters:
    - Task type: ${task}
    - Tone: ${tone || "neutral"}
    - Writing Style: ${style || "descriptive"}
    - Complexity Level: ${complexity || "3"}
    - Target Audience: ${audience || "general"}
    
    Provide a response in valid JSON format with the following structure:
    
    ${task === "code" ? `{
      "code": "the generated code",
      "explanation": "detailed explanation",
      "usage": "optional usage example",
      "wordCount": number,
      "characterCount": number
    }` : task === "copywriting" ? `{
      "title": "engaging title",
      "sections": [{"heading": "section heading", "content": "section content"}],
      "callToAction": "optional CTA",
      "wordCount": number,
      "characterCount": number
    }` : task === "creative" ? `{
      "title": "creative title",
      "paragraphs": ["paragraph 1", "paragraph 2"],
      "characters": ["optional character names"],
      "wordCount": number,
      "characterCount": number,
      "readingTime": number
    }` : task === "quotes" ? `{
      "quote": "generated quote",
      "author": "quote author",
      "context": "optional context",
      "tags": ["optional", "tags"],
      "wordCount": number,
      "characterCount": number
    }` : `{
      "summary": "content summary",
      "keyPoints": ["key point 1", "key point 2"],
      "sentiment": "content sentiment",
      "sentimentBreakdown": {"positive": number, "negative": number, "neutral": number},
      "wordCount": number,
      "characterCount": number
    }`}
    
    Ensure all text content is properly escaped for JSON. Do not include any text outside of the JSON object.`

    const { text } = await generateText({
      model: groq(model),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      maxTokens: 2000,
      topP: 0.9,
      presencePenalty: 0.6,
      frequencyPenalty: 0.6
    })

    console.log("Raw AI response:", text)

    // Function to extract JSON from text
    const extractJSON = (str) => {
      const jsonRegex = /\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}/g
      const matches = str.match(jsonRegex)
      return matches ? matches[matches.length - 1] : null
    }

    // Attempt to parse the response as JSON
    let content
    try {
      content = JSON.parse(text)
    } catch (error) {
      console.error("Failed to parse AI response:", error)
      
      // Attempt to extract JSON from the response
      const jsonStr = extractJSON(text)
      if (jsonStr) {
        try {
          content = JSON.parse(jsonStr)
        } catch (innerError) {
          console.error("Failed to extract JSON from response:", innerError)
        }
      }
      
      // If still unable to parse, fall back to default response
      if (!content) {
        content = DEFAULT_RESPONSES[task] || {}
        console.log("Using default response for task:", task)
      }
    }

    // Ensure the response has the required structure
    if (!content || typeof content !== 'object') {
      throw new Error("Invalid response format")
    }

    // Add missing required fields
    if (!content.wordCount) content.wordCount = 0
    if (!content.characterCount) content.characterCount = 0

    return { content: JSON.stringify(content) }
  } catch (error) {
    console.error("Error generating content:", error)
    return { 
      error: `Failed to generate ${task} content. Please try again. Error: ${error.message}` 
    }
  }
}