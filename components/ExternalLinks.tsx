import { ExternalSite } from 'helpers/enums'
import SiteIcon from "components/SiteIcon"
import styles from 'styles/components/externallinks.module.scss'

type ExternalLinkItemProps = {
  site: ExternalSite,
  url: URL,
  size: number
}

const ExternalLinkItem = ({ site, url, size }: ExternalLinkItemProps) => (
  <li>
    <a href={url.toString()} target="_blank">
      <SiteIcon site={site} size={size} />
    </a>
  </li>
)

type ExternalLinksProps = {
  className?: string,
  person: PersonData,
  size: number
}

const ExternalLinks = ({ className, person, size }: ExternalLinksProps) => (
  <ul className={`${styles.links} ${className}`}>
    {person.twitterUrl && <ExternalLinkItem key="twitter" site={ExternalSite.Twitter} url={person.twitterUrl} size={size} />}
    {person.instagramUrl && <ExternalLinkItem key="instagram" site={ExternalSite.Instagram} url={person.instagramUrl} size={size} />}
    {person.itchUrl && <ExternalLinkItem key="itch" site={ExternalSite.Itch} url={person.itchUrl} size={size} />}
    {person.gitHubUrl && <ExternalLinkItem key="gitHub" site={ExternalSite.GitHub} url={person.gitHubUrl} size={size} />}
  </ul>
)

export default ExternalLinks
