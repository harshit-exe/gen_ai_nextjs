import { Button } from "@/components/ui/button"
import { Code2, FileText, Quote, Wand2, Zap } from 'lucide-react'

const ICONS = {
  Code2,
  FileText,
  Quote,
  Wand2,
  Zap,
}

export function TaskSelector({ tasks, selectedTask, onSelectTask }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {Object.entries(tasks).map(([key, task]) => {
        const IconComponent = ICONS[task.icon]
        return (
          <Button
            key={key}
            type="button"
            onClick={() => onSelectTask(key)}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all transform hover:scale-105 h-full ${
              selectedTask === key
                ? `bg-gradient-to-br ${task.color} text-white shadow-lg`
                : 'bg-white hover:bg-gray-50 text-black'
            }`}
          >
            <div className="mb-4">
              <IconComponent className="w-8 h-8" />
            </div>
            <span className="font-medium text-center">{task.label}</span>
          </Button>
        )
      })}
    </div>
  )
}