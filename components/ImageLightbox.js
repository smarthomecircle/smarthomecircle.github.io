import { useEffect } from 'react'

export default function ImageLightbox() {
  useEffect(() => {
    // Create lightbox HTML structure
    const createLightbox = () => {
      if (document.querySelector('.image-lightbox')) return // Already exists
      
      const lightbox = document.createElement('div')
      lightbox.className = 'image-lightbox'
      lightbox.innerHTML = `
        <button class="close-button" aria-label="Close lightbox">&times;</button>
        <img src="" alt="" />
      `
      document.body.appendChild(lightbox)
    }

    // Open lightbox
    const openLightbox = (imageSrc, imageAlt) => {
      const lightbox = document.querySelector('.image-lightbox')
      const lightboxImg = lightbox.querySelector('img')
      
      lightboxImg.src = imageSrc
      lightboxImg.alt = imageAlt
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden' // Prevent scrolling
    }

    // Close lightbox
    const closeLightbox = () => {
      const lightbox = document.querySelector('.image-lightbox')
      lightbox.classList.remove('active')
      document.body.style.overflow = 'auto' // Restore scrolling
    }

    // Initialize lightbox
    const initLightbox = () => {
      createLightbox()
      
      // Handle single image containers for full width
      const imageFlexContainers = document.querySelectorAll('.prose .image-flex')
      imageFlexContainers.forEach(container => {
        const images = container.querySelectorAll('img')
        if (images.length === 1) {
          container.classList.add('image-flex-single')
        }
      })
      
      // Add click listeners to all images in .image-flex containers
      const imageFlexImages = document.querySelectorAll('.prose .image-flex img')
      
      imageFlexImages.forEach(img => {
        img.addEventListener('click', (e) => {
          e.preventDefault()
          openLightbox(img.src, img.alt)
        })
      })

      // Close button listener
      const closeButton = document.querySelector('.image-lightbox .close-button')
      if (closeButton) {
        closeButton.addEventListener('click', closeLightbox)
      }

      // Close on background click
      const lightbox = document.querySelector('.image-lightbox')
      if (lightbox) {
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
            closeLightbox()
          }
        })
      }

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeLightbox()
        }
      })
    }

    // Wait for images to load, then initialize
    setTimeout(initLightbox, 100)

    // Cleanup function
    return () => {
      const lightbox = document.querySelector('.image-lightbox')
      if (lightbox) {
        lightbox.remove()
      }
      document.body.style.overflow = 'auto'
    }
  }, [])

  return null // This component doesn't render anything visible
}
