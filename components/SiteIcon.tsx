import { ExternalSite } from 'helpers/enums'
import TwitterIcon from '../icons/twitter.svg'
import InstagramIcon from '../icons/instagram.svg'
import ItchIcon from '../icons/itchio.svg'
import GitHubIcon from '../icons/github.svg'

type ExternalSiteIconProps = {
  site: ExternalSite,
  size: number
}

const ExternalSiteIcon = ({ site, size }: ExternalSiteIconProps) => {
  switch (site) {
    case ExternalSite.Twitter:
      return <TwitterIcon width={size} height={size} alt="Twitter" />
    case ExternalSite.Instagram:
      return <InstagramIcon width={size} height={size} alt="Instagram" />
    case ExternalSite.Itch:
      return <ItchIcon width={size} height={size} alt="itch.io" />
    case ExternalSite.GitHub:
      return <GitHubIcon width={size} height={size} alt="GitHub" />
  }
}

export default ExternalSiteIcon
