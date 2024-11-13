import { Github, Linkedin, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-16 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://github.com/harshit-exe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors duration-200">
          <Github className="w-6 h-6" />
          <span className="sr-only">GitHub</span>
        </a>
        <a href="https://linkedin.com/in/harshit1218" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors duration-200">
          <Linkedin className="w-6 h-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a href="https://instagram.com/harshit1218" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors duration-200">
          <Instagram className="w-6 h-6" />
          <span className="sr-only">Instagram</span>
        </a>
        <a href="https://twitter.com/harshit1218" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors duration-200">
          <Twitter className="w-6 h-6" />
          <span className="sr-only">Twitter</span>
        </a>
      </div>
      <div className="text-gray-600 text-sm">
        <span className="font-semibold">ThinkMate AI</span> - Empowering Creativity
      </div>
      <div className="text-gray-500 text-xs mt-2">
        Crafted with ❤️ by the ThinkMate Team
      </div>
    </footer>
  )
}