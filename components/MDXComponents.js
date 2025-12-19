/* eslint-disable react/display-name */
import { useMemo, useState, useEffect } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'
import AffiliateLinks from './AffiliateLinks'
import VideoEmbed from './VideoEmbed'
import InContentAd from './InContentAd'
import Collapsible from './Collapsible'

// Centralized slot ID and layout key mappings
const SLOT_MAPPINGS = {
  // Original slots
  '5121856708': '-fb+5w+4e-db+86',  // H3 ads
  '4906783027': '-g2+y-1l-kc+17h',  // H2 ads
  
  // Blog list ad slots
  '3638066836': '-fb+5w+4e-db+86',  // Blog list ads - position 1
  '1398098062': '-fb+5w+4e-db+86',  // Blog list ads - position 2
  '8873812148': '-fb+5w+4e-db+86'  // Blog list ads - position 3
}

// Function to get layout key for any slot ID
export const getLayoutKey = (slotId) => {
  return SLOT_MAPPINGS[slotId] || '-fb+5w+4e-db+86' // fallback
}

// Function to get different slot IDs for blog list ads
export const getBlogListSlot = (index) => {
  const slotIds = [
    '5121856708',  // Position 1
    '4906783027',  // Position 2
    '3638066836',  // Position 3
    '1398098062',  // Position 4
    '8873812148'  // Position 5
  ]
  
  // Calculate which ad position this is (every 3rd post)
  const adPosition = Math.floor(index / 3)
  
  // Use modulo to cycle through available slots
  return slotIds[adPosition % slotIds.length]
}

// Client-side only wrapper to prevent hydration mismatches
const ClientOnlyAd = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return children
}

// Auto-inject ads after H2 sections complete
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

  // Function to get different slot IDs for H2 section ads
  const getH2SectionSlot = (hash) => {
    const slotIds = [
      '5121856708',  // Position 1
      '4906783027',  // Position 2
      '3638066836',  // Position 3
      '1398098062',  // Position 4
      '8873812148'  // Position 5
    ]
    
    // Use hash to deterministically select a slot
    return slotIds[hash % slotIds.length]
  }

  // Track H2 sections for ad placement
  let currentH2Section = null
  
  const AutoAdH2 = (props) => {
    // Get heading text content for deterministic behavior
    let headingText = 'h2-heading'
    if (typeof props.children === 'string') {
      headingText = props.children
    } else if (Array.isArray(props.children)) {
      headingText = props.children.join('')
    } else if (props.children && typeof props.children === 'object') {
      headingText = props.children.toString()
    }
    
    const hash = simpleHash(headingText)
    const shouldShowAd = hash % 2 === 0
    const adId = `${pageId}-h2-${hash.toString(36).slice(0, 6)}`
    
    // Store this H2 section info
    const sectionInfo = {
      headingText,
      hash,
      shouldShowAd,
      adId
    }
    
    // If we have a previous section, add ad for it before starting new section
    let previousSectionAd = null
    if (currentH2Section && currentH2Section.shouldShowAd) {
      previousSectionAd = (
        <ClientOnlyAd key={`ad-${currentH2Section.adId}`}>
          <InContentAd 
            id={currentH2Section.adId} 
            slot={getH2SectionSlot(currentH2Section.hash)} 
          />
        </ClientOnlyAd>
      )
    }
    
    // Update current section
    currentH2Section = sectionInfo
    
    return (
      <>
        {previousSectionAd}
        <h2 {...props} />
      </>
    )
  }

  // Component that can be manually placed to show ad for the current H2 section
  const SectionEndAd = () => {
    if (currentH2Section && currentH2Section.shouldShowAd) {
      return (
        <ClientOnlyAd>
          <InContentAd 
            id={currentH2Section.adId} 
            slot={getH2SectionSlot(currentH2Section.hash)} 
          />
        </ClientOnlyAd>
      )
    }
    return null
  }
  
  return { AutoAdH2, SectionEndAd }
}

// Create dynamic MDX components based on frontmatter
const createMDXComponents = (frontMatter = {}) => {
  // Use a more reliable pageId - prefer slug, then customUrl, but avoid 'auto-generated'
  let pageId = frontMatter?.slug || frontMatter?.customUrl || 'page'
  if (pageId === 'auto-generated') {
    // Fallback to using the title as pageId when customUrl is auto-generated
    pageId = frontMatter?.title ? frontMatter.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : 'page'
  }
  
  const autoAdComponents = frontMatter?.autoAds ? createAutoAdComponents(pageId) : null
  
  return {
    Image,
    TOCInline,
    a: CustomLink,
    pre: Pre,
    BlogNewsletterForm: BlogNewsletterForm,
    AffiliateLinks,
    VideoEmbed,
    Collapsible,
    InContentAd: (props) => (
      <ClientOnlyAd>
        <InContentAd {...props} />
      </ClientOnlyAd>
    ),
    // Conditionally use auto-ad headings if autoAds is enabled
    h2: autoAdComponents ? autoAdComponents.AutoAdH2 : 'h2',
    SectionEndAd: autoAdComponents ? autoAdComponents.SectionEndAd : null,
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
