import Twitter from './social-icons/twitter.svg'
import Linkedin from './social-icons/linkedin.svg'
import Facebook from './social-icons/facebook.svg'
import Mail from './social-icons//mail.svg'

const ShareButtons = ({ url, title }) => {
  const pageUrl = encodeURIComponent(url)
  const pageTitle = encodeURIComponent(title)

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      'facebook-share-dialog',
      'width=626,height=436'
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/share?url=${pageUrl}&text=${pageTitle}`,
      'twitter-share-dialog',
      'width=626,height=436'
    )
  }

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      'linkedin-share-dialog',
      'width=626,height=436'
    )
  }

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${pageTitle}&body=${pageUrl}`
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-md text-xs px-3 py-1.5 inline-flex items-center transition-colors"
        onClick={shareOnFacebook}
        title="Share on Facebook"
      >
        <svg
          className="w-3 h-3 mr-1.5"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="facebook-f"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <Facebook className={`fill-current`} />
        </svg>
        Share
      </button>
      <button
        type="button"
        className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 font-medium rounded-md text-xs px-3 py-1.5 inline-flex items-center transition-colors"
        onClick={shareOnTwitter}
        title="Share on Twitter"
      >
        <svg
          className="w-3 h-3 mr-1.5"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="twitter"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <Twitter className={`fill-current`} />
        </svg>
        Tweet
      </button>
      <button
        type="button"
        className="text-white bg-[#0077B5] hover:bg-[#00A0DC]/90 font-medium rounded-md text-xs px-3 py-1.5 inline-flex items-center transition-colors"
        onClick={shareOnLinkedIn}
        title="Share on LinkedIn"
      >
        <svg
          className="w-3 h-3 mr-1.5"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="linkedin"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <Linkedin className="fill-current" />
        </svg>
        Post
      </button>
      <button
        type="button"
        className="text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-md text-xs px-3 py-1.5 inline-flex items-center transition-colors"
        onClick={shareViaEmail}
        title="Share via Email"
      >
        <svg
          className="w-3 h-3 mr-1.5"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="email"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <Mail className="fill-current" />
        </svg>
        Email
      </button>
    </div>
  )
}

export default ShareButtons
