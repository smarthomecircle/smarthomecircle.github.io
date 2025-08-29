/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'
import AffiliateLinks from './AffiliateLinks'
import VideoEmbed from './VideoEmbed'
import InContentAd from './InContentAd'

// Auto-inject ads after certain headings
const createAutoAdComponents = (pageId = '') => {
  // Simple hash function for deterministic ad placement
  const simpleHash = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  
  const AutoAdH2 = (props) => {
    // Get heading text content for deterministic behavior
    const headingText = typeof props.children === 'string' ? props.children : 'h2-heading'
    const hash = simpleHash(headingText)
    
    // Show ad if hash is divisible by 2 (50% chance, but deterministic)
    const shouldShowAd = hash % 2 === 0
    const adId = `${pageId}-h2-${hash.toString(36).slice(0, 6)}`
    
    return (
      <>
        <h2 {...props} />
        {shouldShowAd && (
          <InContentAd 
            id={adId} 
            slot={`4906783027`} 
          />
        )}
      </>
    )
  }


  
  return { AutoAdH2 }
}

// Create dynamic MDX components based on frontmatter
const createMDXComponents = (frontMatter = {}) => {
  const pageId = frontMatter?.slug || frontMatter?.customUrl || 'page'
  const autoAdComponents = frontMatter?.autoAds ? createAutoAdComponents(pageId) : null
  
  return {
    Image,
    TOCInline,
    a: CustomLink,
    pre: Pre,
    BlogNewsletterForm: BlogNewsletterForm,
    AffiliateLinks,
    VideoEmbed,
    InContentAd,
    // Conditionally use auto-ad headings if autoAds is enabled
    h2: autoAdComponents ? autoAdComponents.AutoAdH2 : 'h2',
    wrapper: ({ components, layout, ...rest }) => {
      const Layout = require(`../layouts/${layout}`).default
      return <Layout {...rest} />
    },
  }
}

export const MDXComponents = createMDXComponents()

export const MDXLayoutRenderer = ({ layout, mdxSource, frontMatter, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  const dynamicComponents = useMemo(() => createMDXComponents(frontMatter), [frontMatter])

  return <MDXLayout layout={layout} components={dynamicComponents} frontMatter={frontMatter} {...rest} />
}
