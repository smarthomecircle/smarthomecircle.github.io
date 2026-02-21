import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Script from 'next/script'
import Image from '@/components/Image'
import BuyMeACoffee from './Buymeacoffee'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="SmartHomeCircle">
              <div className="flex items-center">
                <div className="mr-3">
                  <Image
                    src="/static/favicons/icon.png"
                    alt="smart home circle"
                    height={50}
                    width={50}
                  />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="mt-6">
            {/* <Script
              id="news1"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
                var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
                f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
                var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
                _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');
                
                var ml_account = ml('accounts', '3117349', 'p5v1c3m1v8', 'load');
            `,
              }}
            /> */}
          </div>
                     <div className="flex items-center text-base leading-5">
            <div className="hidden sm:flex items-center space-x-1">
                             {headerNavLinks.map((link) =>
                 link.children ? (
                   <div key={link.title} className="relative group">
                     <button className="group relative px-4 py-2 font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:-translate-y-0.5 flex items-center space-x-1">
                       <span className="relative z-10">{link.title}</span>
                       {/* Dropdown arrow */}
                       <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                       {/* Animated underline */}
                       <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                       {/* Subtle glow effect */}
                       <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     </button>
                     {/* Enhanced Dropdown Menu */}
                     <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 backdrop-blur-sm">
                       <div className="py-2">
                         {link.children.map((child, index) => (
                           <Link
                             key={child.title}
                             href={child.href}
                             className="group/item relative block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                           >
                             <div className="flex items-center justify-between">
                               <span className="relative z-10">{child.title}</span>
                               <svg className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                               </svg>
                             </div>
                             {/* Item hover effect */}
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-center"></div>
                           </Link>
                         ))}
                       </div>
                     </div>
                   </div>
                 ) : (
                   <Link
                     key={link.title}
                     href={link.href}
                     className="group relative px-4 py-2 font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:-translate-y-0.5 inline-flex items-baseline gap-0.5"
                   >
                     <span className="relative z-10">{link.title}</span>
                     {link.badge && (
                       <span className="relative z-10 ml-0.5 -mt-2 self-start inline-flex items-center p-0.5 rounded leading-tight text-[9px] font-semibold uppercase tracking-wider text-white bg-primary-500 dark:bg-primary-500">
                         {link.badge}
                       </span>
                     )}
                     {/* Animated underline */}
                     <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                     {/* Subtle glow effect */}
                     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   </Link>
                 )
               )}
              {/* <div className="ml-2">
                <BuyMeACoffee />
              </div> */}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>


        </header>
        <main className="mb-auto">{children}</main>
        {/* <div
          className="ml-form-embed"
          data-account="3117349:p5v1c3m1v8"
          data-form="4015126:i6h8m5"
        ></div> */}
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
