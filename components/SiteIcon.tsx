import { ExternalSite } from 'helpers/enums'
import CastleGamesIcon from '../icons/castlegames.svg'
import EpicGamesIcon from '../icons/epicgames.svg'
import GameJoltIcon from '../icons/gamejolt.svg'
import GitHubIcon from '../icons/github.svg'
import InstagramIcon from '../icons/instagram.svg'
import ItchIcon from '../icons/itchio.svg'
import LexaloffleIcon from '../icons/lexaloffle.svg'
import NewgroundsIcon from '../icons/newgrounds.svg'
import NintendoSwitchIcon from '../icons/nintendoswitch.svg'
import TwitterIcon from '../icons/twitter.svg'

type ExternalSiteIconProps = {
  site: ExternalSite
  size: number
}

const ExternalSiteIcon = ({ site, size }: ExternalSiteIconProps) => {
  switch (site) {
    case ExternalSite.CastleGames:
      return <CastleGamesIcon width={size} height={size} alt={site} />
    case ExternalSite.EpicGames:
      return <EpicGamesIcon width={size} height={size} alt={site} />
    case ExternalSite.GameJolt:
      return <GameJoltIcon width={size} height={size} alt={site}/>
    case ExternalSite.GitHub:
      return <GitHubIcon width={size} height={size} alt={site}/>
    case ExternalSite.Instagram:
      return <InstagramIcon width={size} height={size} alt={site}/>
    case ExternalSite.Itch:
      return <ItchIcon width={size} height={size} alt={site} />
    case ExternalSite.Lexaloffle:
      return <LexaloffleIcon width={size} height={size} alt={site}/>
    case ExternalSite.Newgrounds:
      return <NewgroundsIcon width={size * 1.15} height={size} alt={site}/>
    case ExternalSite.NintendoSwitch:
      return <NintendoSwitchIcon width={size} height={size} alt={site}/>
    case ExternalSite.Twitter:
      return <TwitterIcon width={size} height={size} alt={site}/>
    default:
      return <div>[icon missing for {site}]</div>
  }
}

export default ExternalSiteIcon
