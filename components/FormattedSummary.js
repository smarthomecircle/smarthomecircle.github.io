import React from 'react'
import ReactMarkdown from 'react-markdown'

const FormattedSummary = ({ summary }) => {
  return (
    <div className="prose">
      <ReactMarkdown>{summary}</ReactMarkdown>
    </div>
  )
}

export default FormattedSummary