import Link from './Link'
import Image from '@/components/Image'

const BuyMeACoffee = () => {
  return (
    <Link href="https://www.buymeacoffee.com/amrutprabhu" target="_blank">
    <Image
      src="static/buymeacoffee.png"
      alt="Buy Me A Coffee"
      width={140}
      height={20}
    />
  </Link>
  );
};

export default BuyMeACoffee;