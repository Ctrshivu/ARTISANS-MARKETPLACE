"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, X, Heart, Share2 } from "lucide-react"

interface StorySlide {
  year: string
  title: string
  description: string
  image: string
}

interface ArtisanStoryModalProps {
  isOpen: boolean
  onClose: () => void
  artisan: {
    name: string
    location: string
    specialty: string
    image: string
    story: StorySlide[]
  }
}

export default function ArtisanStoryModal({ isOpen, onClose, artisan }: ArtisanStoryModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Auto-advance slides when playing
  useEffect(() => {
    if (!isPlaying || !isOpen) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => {
            const next = current + 1
            if (next >= artisan.story.length) {
              setIsPlaying(false)
              return 0
            }
            return next
          })
          return 0
        }
        return prev + 2 // 2% every 100ms = 5 seconds per slide
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, isOpen, artisan.story.length])

  // Reset progress when slide changes manually
  useEffect(() => {
    setProgress(0)
  }, [currentSlide])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setCurrentSlide(0)
    setProgress(0)
    setIsPlaying(false)
  }

  const currentStory = artisan.story[currentSlide]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[80vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center gap-3">
            <img
              src={artisan.image || "/placeholder.svg"}
              alt={artisan.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">The Art of {artisan.specialty}</h2>
              <p className="text-sm text-gray-600">by {artisan.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Timeline Sidebar */}
          <div className="w-80 bg-gray-50 p-6 overflow-y-auto">
            <h3 className="font-bold text-lg mb-6">Journey Timeline</h3>
            <div className="space-y-6">
              {artisan.story.map((story, index) => (
                <div
                  key={index}
                  className={`flex gap-4 cursor-pointer transition-all ${
                    index === currentSlide ? "opacity-100" : "opacity-60 hover:opacity-80"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === currentSlide ? "bg-amber-600 text-white" : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {story.year}
                    </div>
                    {index < artisan.story.length - 1 && <div className="w-0.5 h-12 bg-gray-300 mt-2" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{story.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{story.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative">
            <img
              src={currentStory.image || "/placeholder.svg"}
              alt={currentStory.title}
              className="w-full h-full object-cover"
            />

            {/* Progress Bar */}
            {isPlaying && (
              <div className="absolute top-0 left-0 w-full h-1 bg-black/20">
                <div className="h-full bg-amber-500 transition-all duration-100" style={{ width: `${progress}%` }} />
              </div>
            )}

            {/* Story Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <Badge className="mb-3 bg-amber-600">{currentStory.year}</Badge>
              <h3 className="text-2xl font-bold text-white mb-3">{currentStory.title}</h3>
              <p className="text-white/90 text-lg max-w-2xl">{currentStory.description}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6 border-t bg-white">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handlePlayPause} className="rounded-full bg-transparent">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <span className="text-sm text-gray-600">
              Step {currentSlide + 1} of {artisan.story.length}
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleRestart}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">Visit Shop</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
