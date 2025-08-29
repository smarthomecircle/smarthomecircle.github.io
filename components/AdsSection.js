import React, { useEffect, useRef } from 'react'

function AdsSection({ id, slot }) {
  const adRef = useRef(null)
  
  // Map slot IDs to their corresponding layout keys
  const getLayoutKey = (slotId) => {
    const layoutKeys = {
      '5121856708': '-fb+5w+4e-db+86',  // H3 ads
      '4906783027': '-g2+y-1l-kc+17h'   // H2 ads
    }
    return layoutKeys[slotId] || '-fb+5w+4e-db+86' // fallback
  }

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
  if (!slot || slot.includes('567890')) {
    return null
  }

  return (
    <div ref={adRef} className={`adsbygoogle-${id}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7490174059724719"
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout-key={getLayoutKey(slot)}
        id={id}
      />
    </div>
  )
}

export default AdsSection
