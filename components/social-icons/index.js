import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import BlueSky from './Bluesky.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  blueSky: BlueSky,
}

// Static class lookup so Tailwind's JIT can see and emit these classes.
// Dynamic strings like `h-${size}` get purged during build.
const sizeClasses = {
  4: 'h-4 w-4',
  5: 'h-5 w-5',
  6: 'h-6 w-6',
  7: 'h-7 w-7',
  8: 'h-8 w-8',
  10: 'h-10 w-10',
  12: 'h-12 w-12',
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]
  const sizeClass = sizeClasses[size] || sizeClasses[8]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 ${sizeClass}`}
      />
    </a>
  )
}

export default SocialIcon
