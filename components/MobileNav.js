import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import Image from '@/components/Image'
import BuyMeACoffee from './Buymeacoffee'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [openMenus, setOpenMenus] = useState({})

  const onToggleNav = () => {
    setNavShow((status) => {
      document.body.style.overflow = status ? 'auto' : 'hidden'
      return !status
    })
  }

  const toggleSubmenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="w-8 h-8 py-1 ml-1 mr-1 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        {/* hamburger/cross icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      <div
        className={`fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed w-full h-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>

                 <nav className="fixed h-full mt-8 overflow-y-auto">
            {headerNavLinks.map((link) => (
              <div key={link.title} className="px-12 py-4">
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(link.title)}
                      className="group relative inline-block text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100 transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-2 focus:outline-none flex items-center space-x-2"
                    >
                      <span className="relative z-10">{link.title}</span>
                      {/* Mobile dropdown arrow */}
                      <svg 
                        className={`w-6 h-6 transition-transform duration-300 ${openMenus[link.title] ? 'rotate-180' : 'rotate-0'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {/* Mobile animated underline */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary-500 group-hover:w-full transition-all duration-500"></div>
                      {/* Mobile glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </button>
                    {/* Mobile submenu with animation */}
                    <div className={`overflow-hidden transition-all duration-300 ${openMenus[link.title] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {link.children.map((child, index) => (
                        <div 
                          key={child.title} 
                          className={`mt-3 ml-6 transform transition-all duration-300 delay-${index * 100} ${openMenus[link.title] ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                        >
                          <Link
                            href={child.href}
                            className="group/item relative inline-block text-xl font-medium text-gray-700 dark:text-gray-400 transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-2"
                            onClick={onToggleNav}
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                              <span>{child.title}</span>
                            </span>
                            {/* Mobile submenu item underline */}
                            <div className="absolute bottom-0 left-6 w-0 h-0.5 bg-primary-500 group-hover/item:w-full transition-all duration-400"></div>
                            {/* Mobile submenu glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/15 to-primary-600/15 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10"></div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="group relative inline-block text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100 transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-2"
                    onClick={onToggleNav}
                  >
                    <span className="relative z-10">{link.title}</span>
                    {/* Mobile animated underline */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary-500 group-hover:w-full transition-all duration-500"></div>
                    {/* Mobile glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                )}
              </div>
            ))}
          <div key="buymecoffeemobile" className="px-12 py-4">
            <BuyMeACoffee />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
