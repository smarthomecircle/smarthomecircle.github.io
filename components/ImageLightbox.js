import { useEffect } from 'react'

export default function ImageLightbox() {
  useEffect(() => {
    let currentGallery = []
    let currentImageIndex = 0

    // Create lightbox HTML structure
    const createLightbox = () => {
      if (document.querySelector('.image-lightbox')) return // Already exists

      const lightbox = document.createElement('div')
      lightbox.className = 'image-lightbox'
      lightbox.innerHTML = `
        <button class="close-button" aria-label="Close lightbox">&times;</button>
        <button class="nav-button prev-button" aria-label="Previous image">&#10094;</button>
        <img src="" alt="" />
        <button class="nav-button next-button" aria-label="Next image">&#10095;</button>
      `
      document.body.appendChild(lightbox)
    }

    const updateLightbox = () => {
      const lightbox = document.querySelector('.image-lightbox')
      if (!lightbox || !currentGallery.length) return

      const lightboxImg = lightbox.querySelector('img')
      const prevButton = lightbox.querySelector('.prev-button')
      const nextButton = lightbox.querySelector('.next-button')
      const currentImage = currentGallery[currentImageIndex]

      lightboxImg.src = currentImage.src
      lightboxImg.alt = currentImage.alt || ''

      const showNavigation = currentGallery.length > 1
      prevButton.style.display = showNavigation ? 'flex' : 'none'
      nextButton.style.display = showNavigation ? 'flex' : 'none'
    }

    const showPreviousImage = (event) => {
      if (event) event.stopPropagation()
      if (currentGallery.length <= 1) return

      currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length
      updateLightbox()
    }

    const showNextImage = (event) => {
      if (event) event.stopPropagation()
      if (currentGallery.length <= 1) return

      currentImageIndex = (currentImageIndex + 1) % currentGallery.length
      updateLightbox()
    }

    // Open lightbox
    const openLightbox = (galleryImages, imageIndex) => {
      if (!galleryImages.length) return

      currentGallery = galleryImages.map((image) => ({
        src: image.src,
        alt: image.alt || '',
      }))
      currentImageIndex = imageIndex

      const lightbox = document.querySelector('.image-lightbox')
      if (!lightbox) return

      const lightboxImg = lightbox.querySelector('img')
      if (!lightboxImg) return

      updateLightbox()
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden' // Prevent scrolling
    }

    // Close lightbox
    const closeLightbox = () => {
      const lightbox = document.querySelector('.image-lightbox')
      lightbox.classList.remove('active')
      document.body.style.overflow = 'auto' // Restore scrolling
    }

    const handleImageClick = (event) => {
      const clickedImage = event.target.closest('.prose .image-flex img')
      if (!clickedImage) return

      event.preventDefault()

      const imageContainer = clickedImage.closest('.image-flex')
      const containerImages = imageContainer
        ? Array.from(imageContainer.querySelectorAll('img'))
        : [clickedImage]
      const imageIndex = containerImages.indexOf(clickedImage)

      openLightbox(containerImages, Math.max(imageIndex, 0))
    }

    const handleKeyDown = (event) => {
      const lightbox = document.querySelector('.image-lightbox')
      if (!lightbox || !lightbox.classList.contains('active')) return

      if (event.key === 'Escape') {
        closeLightbox()
      } else if (event.key === 'ArrowLeft') {
        showPreviousImage()
      } else if (event.key === 'ArrowRight') {
        showNextImage()
      }
    }

    // Initialize lightbox
    const initLightbox = () => {
      createLightbox()

      // Handle single image containers for full width
      const imageFlexContainers = document.querySelectorAll('.prose .image-flex')
      imageFlexContainers.forEach((container) => {
        const images = container.querySelectorAll('img')
        if (images.length === 1) {
          container.classList.add('image-flex-single')
        }
      })

      // Use event delegation so dynamic blog content keeps working
      document.addEventListener('click', handleImageClick)

      // Close button listener
      const closeButton = document.querySelector('.image-lightbox .close-button')
      const prevButton = document.querySelector('.image-lightbox .prev-button')
      const nextButton = document.querySelector('.image-lightbox .next-button')
      if (closeButton) {
        closeButton.addEventListener('click', closeLightbox)
      }
      if (prevButton) {
        prevButton.addEventListener('click', showPreviousImage)
      }
      if (nextButton) {
        nextButton.addEventListener('click', showNextImage)
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

      // Keyboard support for close and navigation
      document.addEventListener('keydown', handleKeyDown)
    }

    // Wait for images to load, then initialize
    const initTimeout = setTimeout(initLightbox, 100)

    // Cleanup function
    return () => {
      clearTimeout(initTimeout)
      document.removeEventListener('click', handleImageClick)
      document.removeEventListener('keydown', handleKeyDown)

      const closeButton = document.querySelector('.image-lightbox .close-button')
      const prevButton = document.querySelector('.image-lightbox .prev-button')
      const nextButton = document.querySelector('.image-lightbox .next-button')

      if (closeButton) {
        closeButton.removeEventListener('click', closeLightbox)
      }
      if (prevButton) {
        prevButton.removeEventListener('click', showPreviousImage)
      }
      if (nextButton) {
        nextButton.removeEventListener('click', showNextImage)
      }

      const lightbox = document.querySelector('.image-lightbox')
      if (lightbox) {
        lightbox.remove()
      }
      document.body.style.overflow = 'auto'
    }
  }, [])

  return null // This component doesn't render anything visible
}
