import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'

export function PromptInput({ task }) {
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedFile({
          name: file.name,
          content: e.target.result
        })
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-lg font-semibold">Prompt</Label>
        <Textarea
          id="prompt"
          name="prompt"
          placeholder={task.placeholder}
          className="min-h-[150px] bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      {(task.label === "Creative Writing" || task.label === "Copywriting") && (
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-lg font-semibold">Upload Document (Optional)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
            <span className="text-sm text-gray-500">
              {uploadedFile ? uploadedFile.name : "No file chosen"}
            </span>
          </div>
          {uploadedFile && (
            <input type="hidden" name="uploadedContent" value={uploadedFile.content} />
          )}
        </div>
      )}
    </div>
  )
}