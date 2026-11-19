import React, { useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'

function AdsSection({ id, slot, layoutKey }) {
  const adRef = useRef(null)

  useEffect(() => {
    const initializeAd = () => {
      if (!window.adsbygoogle) {
        setTimeout(initializeAd, 100)
        return
      }

      try {
        // Initialize adsbygoogle array if it doesn't exist
        window.adsbygoogle = window.adsbygoogle || []

        // Check if ad is already initialized
        if (adRef.current && !adRef.current.dataset.adStatus) {
          window.adsbygoogle.push({})
        }
      } catch (error) {
        // Silent error handling for production
      }
    }

    // Wait for DOM to be ready
    if (adRef.current) {
      initializeAd()
    }
  }, [id, slot])

  // Don't render anything if we don't have valid slot IDs
  if (!siteMetadata.adsense.publisherId || !slot || slot.includes('567890')) {
    return null
  }

  return (
    <div ref={adRef} className={`adsbygoogle-${id}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={siteMetadata.adsense.publisherId}
        data-ad-slot={slot}
        {...(layoutKey
          ? { 'data-ad-format': 'fluid', 'data-ad-layout-key': layoutKey }
          : { 'data-ad-format': 'auto', 'data-full-width-responsive': 'true' })}
        id={id}
      />
    </div>
  )
}

export default AdsSection
