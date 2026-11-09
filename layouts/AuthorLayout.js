import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter, team }) {
  const { email, twitter, youtube, github } = frontMatter
  const people = team?.length ? team : [frontMatter]

  return (
    <>
      <PageSEO
        title="About"
        description={`About us - ${people.map((person) => person.name).join(' & ')}`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 xl:flex-col">
              {people.map(({ name, avatarBig, occupation, company }) => (
                <div key={name} className="flex flex-col items-center">
                  <Image
                    src={avatarBig}
                    alt={`${name} avatar`}
                    width="192"
                    height="192"
                    className="w-40 h-40 rounded-full object-cover md:w-48 md:h-48"
                  />
                  <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
                  {occupation && (
                    <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
                  )}
                  {company && <div className="text-gray-500 dark:text-gray-400">{company}</div>}
                </div>
              ))}
            </div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="youtube" href={youtube} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
