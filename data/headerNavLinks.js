
const headerNavLinks = [
  { href: 'https://www.youtube.com/@SmartHomeCircle', title: 'YouTube' },
  { href: '/tags', title: 'Tags' },
  { href: '/posts', title: 'Posts' },
  {
    title: 'Devices',
    children: [
      { href: '/sbc', title: 'Single Board Computer' },
      { href: '/devices/beaglebone', title: 'BeagleBone' },
      { href: '/devices/arduino', title: 'Arduino' },
    ],
  },
  // { href: '/sbc', title: 'SBC' },
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