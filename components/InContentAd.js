import React from 'react'
import AdsSection from './AdsSection'

function InContentAd({ id, slot }) {
  return (
    <div className="my-8 not-prose">
      <AdsSection id={id} slot={slot} />
    </div>
  )
}

export default InContentAd
