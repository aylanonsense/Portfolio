import { ExternalSite } from 'helpers/enums'
import GameJoltIcon from '../icons/gamejolt.svg'
import GitHubIcon from '../icons/github.svg'
import InstagramIcon from '../icons/instagram.svg'
import ItchIcon from '../icons/itchio.svg'
import LexaloffleIcon from '../icons/lexaloffle.svg'
import NewgroundsIcon from '../icons/newgrounds.svg'
import TwitterIcon from '../icons/twitter.svg'

type ExternalSiteIconProps = {
  site: ExternalSite
  size: number
}

const ExternalSiteIcon = ({ site, size }: ExternalSiteIconProps) => {
  switch (site) {
    case ExternalSite.GameJolt:
      return <GameJoltIcon width={size} height={size} alt="GameJolt" />
    case ExternalSite.GitHub:
      return <GitHubIcon width={size} height={size} alt="GitHub" />
    case ExternalSite.Instagram:
      return <InstagramIcon width={size} height={size} alt="Instagram" />
    case ExternalSite.Itch:
      return <ItchIcon width={size} height={size} alt="itch.io" />
    case ExternalSite.Lexaloffle:
      return <LexaloffleIcon width={size} height={size} alt="Lexaloffle" />
    case ExternalSite.Newgrounds:
      return <NewgroundsIcon width={size * 1.15} height={size} alt="Newgrounds" />
    case ExternalSite.Twitter:
      return <TwitterIcon width={size} height={size} alt="Twitter" />
    default:
      return <div>[icon missing for {site}]</div>
  }
}

export default ExternalSiteIcon
