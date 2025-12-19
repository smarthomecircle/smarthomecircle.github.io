import { useState } from 'react'

export default function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="my-4 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls="collapsible-content"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div
          id="collapsible-content"
          className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 prose prose-lg dark:prose-dark max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-blockquote:border-primary-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
        >
          {children}
        </div>
      )}
    </div>
  )
}
