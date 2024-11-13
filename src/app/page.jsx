"use client"

import { useState } from "react"
import { generateContent } from "@/actions/generate"
import { useActionState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AdvancedOptions } from "@/components/AdvancedOptions"
import { PromptInput } from "@/components/PromptInput"
import { TaskSelector } from "@/components/TaskSelector"
import { ResultDisplay } from "@/components/ResultDisplay"
import { Footer } from "@/components/Footer"
export const TASKS = {
  code: {
    icon: "Code2",
    label: "Code Generation",
    description: "Generate code snippets and solutions",
    model: "llama3-70b-8192",
    placeholder: "Describe the code you want to generate...",
    color: "from-purple-500 to-indigo-600",
  },
  copywriting: {
    icon: "FileText",
    label: "Copywriting",
    description: "Create marketing copy and content",
    model: "llama-3.1-70b-versatile",
    placeholder: "Describe the content you need...",
    color: "from-green-500 to-teal-600",
  },
  quotes: {
    icon: "Quote",
    label: "Quote Generation",
    description: "Generate inspirational quotes",
    model: "mixtral-8x7b-32768",
    placeholder: "Describe the type of quote you want...",
    color: "from-yellow-500 to-orange-600",
  },
  creative: {
    icon: "Wand2",
    label: "Creative Writing",
    description: "Stories and creative content",
    model: "gemma-7b-it",
    placeholder: "Describe what you want to create...",
    color: "from-pink-500 to-rose-600",
  },
  analysis: {
    icon: "Zap",
    label: "Text Analysis",
    description: "Analyze and summarize text",
    model: "llama-3.1-70b-versatile",
    placeholder: "Paste the text you want to analyze...",
    color: "from-blue-500 to-cyan-600",
  }
}

export default function AIContentForge() {
  const [selectedTask, setSelectedTask] = useState("code")
  const [advancedMode, setAdvancedMode] = useState(false)
  const [state, action, isPending] = useActionState(generateContent, {
    content: null,
    error: null
  })

  const task = TASKS[selectedTask]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold p-4 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          ThinkMate AI
          </h1>
          <p className="text-xl text-gray-600">Craft your ideas into reality with AI-powered precision</p>
        </header>

        <Card className="mb-12">
          <CardContent className="p-8">
            <form action={action} className="space-y-8">
              <TaskSelector
                tasks={TASKS}
                selectedTask={selectedTask}
                onSelectTask={setSelectedTask}
              />

              <input type="hidden" name="model" value={task.model} />
              <input type="hidden" name="task" value={selectedTask} />
              
              <PromptInput task={task} />

              <AdvancedOptions
                advancedMode={advancedMode}
                setAdvancedMode={setAdvancedMode}
                isPending={isPending}
                task={task}
              />
            </form>
          </CardContent>
        </Card>

        <ResultDisplay state={state} selectedTask={selectedTask} />

        <Footer />
      </div>
    </div>
  )
}