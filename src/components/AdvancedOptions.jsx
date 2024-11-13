import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion, AnimatePresence } from "framer-motion"

export function AdvancedOptions({ advancedMode, setAdvancedMode, isPending, task }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="advanced-mode"
            checked={advancedMode}
            onCheckedChange={setAdvancedMode}
          />
          <Label htmlFor="advanced-mode" className="font-medium">Advanced Mode</Label>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className={`bg-gradient-to-r ${task.color} text-white hover:opacity-90 transition-all duration-200 px-8 py-3 rounded-full text-lg font-semibold`}
        >
          {isPending ? (
            <>
              <span className="animate-spin mr-2">⚙️</span>
              Forging...
            </>
          ) : (
            <>Forge Content</>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {advancedMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tone" className="font-medium">Tone</Label>
                <Select name="tone" defaultValue="neutral">
                  <SelectTrigger id="tone" className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="style" className="font-medium">Writing Style</Label>
                <Select name="style" defaultValue="descriptive">
                  <SelectTrigger id="style" className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="descriptive">Descriptive</SelectItem>
                    <SelectItem value="narrative">Narrative</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="expository">Expository</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="complexity" className="font-medium">Complexity Level</Label>
              <Slider
                id="complexity"
                name="complexity"
                min={1}
                max={5}
                step={1}
                defaultValue={[3]}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Target Audience</Label>
              <RadioGroup defaultValue="general" name="audience" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general">General</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expert" id="expert" />
                  <Label htmlFor="expert">Expert</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner</Label>
                </div>
              </RadioGroup>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}