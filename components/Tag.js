import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    (<Link
      href={`/tags/${kebabCase(text)}`}
      className="m-1 p-1 px-2 leading-4 h-6 rounded text-xs uppercase text-white font-bold bg-teal-500 hover:bg-teal-400 dark:hover:bg-teal-500 dark:bg-teal-600">
      {/* <a className="m-1 p-1 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 bg-slate-500"> */}

      {text}

    </Link>)
  );
}

export default Tag
