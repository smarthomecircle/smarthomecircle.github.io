import NextImage from 'next/image'

const Image = (props) => {
  // Extract and filter out problematic props for Next.js 13.5.8 compatibility
  const { fetchPriority, fetchpriority, ...validProps } = props

  return <NextImage unoptimized={true} {...validProps} />
}

export default Image
