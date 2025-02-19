// Optional: add `badge: 'New'` (or any string) to any top-level link to show a superscript label
const headerNavLinks = [
  { href: 'https://www.youtube.com/@SmartHomeCircle', title: 'YouTube' },
  { href: '/tags', title: 'Tags' },
  { href: '/posts', title: 'Posts' },
  { href: '/sbc', title: 'SBC' },
  { href: '/about', title: 'About & Contact' },
  {
    title: 'More',
    children: [
      { href: '/tags', title: 'Tags' },
      { href: '/posts', title: 'Posts' },
      
      // { href: '/', title: 'Smart Devices' },
    ],
  },
  
]

export default headerNavLinks