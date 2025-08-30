import React from 'react'
import AdsSection from './AdsSection'
import { getLayoutKey } from './MDXComponents'

function InContentAd({ id, slot }) {
  return (
    <div className="my-8 not-prose">
      <AdsSection id={id} slot={slot} layoutKey={getLayoutKey(slot)} />
    </div>
  )
}

export default InContentAd
