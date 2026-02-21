import Link from './Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

// Official Patreon logo (Simple Icons)
function PatreonLogo({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden
    >
      <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524zM2.854 23.537V.524H.524v23.013h2.33z" />
    </svg>
  )
}

const socialEntries = [
  { kind: 'mail', href: siteMetadata.email ? `mailto:${siteMetadata.email}` : '' },
  { kind: 'github', href: siteMetadata.github },
  { kind: 'facebook', href: siteMetadata.facebook },
  { kind: 'youtube', href: siteMetadata.youtube },
  { kind: 'linkedin', href: siteMetadata.linkedin },
  { kind: 'twitter', href: siteMetadata.twitter },
  { kind: 'blueSky', href: siteMetadata.blueSky },
].filter((e) => e.href)

const exploreLinks = [
  { href: '/', title: 'Home' },
  { href: '/sbc', title: 'SBCs' },
  { href: '/sbc-compare', title: 'Compare SBCs' },
  { href: '/about', title: 'About' },
  { href: '/tags', title: 'Tags' },
  { href: '/posts', title: 'Posts' },
  { href: '/privacy', title: 'Privacy' },
]

export default function Footer() {
  const supportLinks = siteMetadata.supportLinks || []

  return (
    <footer className="border-t border-primary-200/60 dark:border-primary-800/50 bg-primary-50/70 dark:bg-gray-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {siteMetadata.title}
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              {siteMetadata.description?.length > 100
                ? `${siteMetadata.description.slice(0, 100)}…`
                : siteMetadata.description}
            </p>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Follow us
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {socialEntries.map(({ kind, href }) => (
                <SocialIcon key={kind} kind={kind} href={href} size="6" />
              ))}
            </div>
            {socialEntries.length === 0 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No social links configured.</p>
            )}
          </div>

          {/* Support the site */}
          {supportLinks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                Support the site
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                Help keep the content free and independent.
              </p>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                {supportLinks.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                    aria-label={label}
                  >
                    {icon === 'buymeacoffee' && (
                      <Image
                        src="/static/buymeacoffee.png"
                        alt=""
                        width={196}
                        height={28}
                        className="h-8 w-auto object-contain"
                      />
                    )}
                    {icon === 'patreon' && (
                      <>
                        <span className="text-[#FF424D] dark:text-[#FF424D] shrink-0">
                          <PatreonLogo className="h-10 w-10" />
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">Patreon</span>
                      </>
                    )}
                    {!icon && label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="mt-3 space-y-2">
              {exploreLinks.map(({ href, title }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary-200/60 dark:border-primary-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="hidden sm:inline">·</span>
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
              {siteMetadata.title}
            </Link>
            <span className="hidden sm:inline">·</span>
            <span>{siteMetadata.author}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <Link href="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
