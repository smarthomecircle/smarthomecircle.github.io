import React from 'react'

const VideoEmbed = ({ 
  videoId, 
  title = "YouTube video player",
  width = "full", // "full", "half", "two-thirds"
  className = ""
}) => {
  // Extract video ID from various YouTube URL formats
  const extractVideoId = (input) => {
    if (!input) return null
    
    // If it's already just the ID
    if (input.length === 11 && !input.includes('/')) {
      return input
    }
    
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = input.match(pattern)
      if (match) return match[1]
    }
    
    return input // Fallback to original input
  }

  const id = extractVideoId(videoId)
  
  if (!id) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400">Invalid video ID provided</p>
      </div>
    )
  }

  // Width classes mapping
  const widthClasses = {
    "full": "w-full",
    "half": "w-full md:w-1/2",
    "two-thirds": "w-full md:w-2/3"
  }

  const containerClass = `${widthClasses[width] || widthClasses.full} mx-auto my-6 ${className}`

  return (
    <div className={containerClass}>
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-black" style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default VideoEmbed
