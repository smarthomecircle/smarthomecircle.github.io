import NextImage from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...rest }) => <NextImage  unoptimized={true} {...rest} />

export default Image
