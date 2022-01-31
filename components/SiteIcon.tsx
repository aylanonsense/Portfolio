import Image from 'next/image'
import { ExternalSite } from 'helpers/enums'
import twitterIcon from 'public/icons/twitter.svg'
import instagramIcon from 'public/icons/instagram.svg'
import itchIcon from 'public/icons/itchio.svg'
import gitHubIcon from 'public/icons/github.svg'

const externalSiteLookup: Record<ExternalSite, { icon: any, name: string }> = {
  [ExternalSite.Twitter]: { icon: twitterIcon, name: "Twitter" },
  [ExternalSite.Instagram]: { icon: instagramIcon, name: "Instagram" },
  [ExternalSite.Itch]: { icon: itchIcon, name: "itch.io" },
  [ExternalSite.GitHub]: { icon: gitHubIcon, name: "GitHub" }
}

type ExternalSiteIconProps = {
  site: ExternalSite
}

const ExternalSiteIcon = ({ site }: ExternalSiteIconProps) => (
  <Image
    src={externalSiteLookup[site].icon}
    alt={externalSiteLookup[site].name}/>
)

export default ExternalSiteIcon
