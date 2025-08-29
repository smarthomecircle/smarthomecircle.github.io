import React, { useEffect, useState } from 'react'

function AdsSection({ id, slot }) {
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    if (!window.adsbygoogle) {
      console.log('AdSense script not loaded')
      return
    }

    try {
      window.adsbygoogle.push({})
      setAdLoaded(true)
    } catch (error) {
      console.log('AdSense error:', error)
    }
  }, [])

  // Don't render anything if we don't have valid slot IDs
  if (!slot || slot.includes('567890')) {
    return null
  }

  return (
    <div className={`adsbygoogle-${id}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7490174059724719"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        id={id}
      />
    </div>
  )
}

export default AdsSection
