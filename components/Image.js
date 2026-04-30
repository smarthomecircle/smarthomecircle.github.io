import NextImage from 'next/image'

// Note: in Next.js 13.5.x, next/image internally emits a `fetchPriority` (camelCase)
// prop on the underlying <img>, which React 18.3 logs an "unknown DOM property"
// warning for. This is upstream bug vercel/next.js#65161, fixed in Next 14+.
// The dev-only console filter in pages/_app.js silences that specific warning so it
// doesn't drown out real ones. Remove the filter once we upgrade Next.

const Image = (props) => <NextImage unoptimized={true} {...props} />

export default Image
