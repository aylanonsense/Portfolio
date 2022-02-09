import { ExternalSite } from 'helpers/enums'
import SiteIcon from 'components/SiteIcon'
import parseExternalSite from 'helpers/parseExternalSite'
import styles from 'styles/components/ExternalLinks.module.scss'

type ExternalLinkItemProps = {
  site: ExternalSite
  url: string
  size: number
}

const ExternalLinkItem = ({ site, url, size }: ExternalLinkItemProps) => (
  <li>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <SiteIcon site={site} size={size} />
    </a>
  </li>
)

type ExternalLinksProps = {
  className?: string | undefined
  urls: (string | undefined)[]
  size: number
}

const ExternalLinks = ({ className, urls, size }: ExternalLinksProps) => (
  <ul className={`${styles.links} ${className ?? ''}`}>
    {urls.map(url => {
      if (url) {
        const site = parseExternalSite(url)
        if (site) {
          return <ExternalLinkItem key={url} site={site} url={url} size={size} /> 
        }
      }
    })}
  </ul>
)

export default ExternalLinks
