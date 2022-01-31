import { ExternalSite } from 'helpers/enums'
import SiteIcon from "components/SiteIcon"

type ExternalLinkItemProps = {
  site: ExternalSite,
  url: URL
}

const ExternalLinkItem = ({ site, url }: ExternalLinkItemProps) => (
  <li>
    <a href={url.toString()} target="_blank">
      <SiteIcon site={site} />
    </a>
  </li>
)

type ExternalLinksProps = {
  person: PersonData
}

const ExternalLinks = ({ person }: ExternalLinksProps) => (
  <ul>
    {person.twitterUrl && <ExternalLinkItem key="twitter" site={ExternalSite.Twitter} url={person.twitterUrl} />}
    {person.instagramUrl && <ExternalLinkItem key="instagram" site={ExternalSite.Instagram} url={person.instagramUrl} />}
    {person.itchUrl && <ExternalLinkItem key="itch" site={ExternalSite.Itch} url={person.itchUrl} />}
    {person.gitHubUrl && <ExternalLinkItem key="gitHub" site={ExternalSite.GitHub} url={person.gitHubUrl} />}
  </ul>
)

export default ExternalLinks
