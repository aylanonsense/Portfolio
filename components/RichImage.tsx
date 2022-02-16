import { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ImageAssetData } from 'types/contentData'
import renderRichText from 'helpers/renderRichText'
import styles from 'styles/components/RichImage.module.scss'

type RichImageProps = {
  image: ImageAssetData
  alt?: string | undefined
  linkUrl?: string | undefined
  externalLink?: boolean | undefined
  enforceMaxDimensions?: boolean | undefined
  className?: string | undefined
  style?: CSSProperties | undefined
  onClick?: (() => void) | undefined
}

const RichImage = ({ image, alt, linkUrl, externalLink, enforceMaxDimensions, className, style, onClick }: RichImageProps) => {
  alt = alt || image.alt || undefined
  linkUrl = linkUrl || image.linkUrl || undefined

  let inner = <Image
    src={image.url}
    alt={alt}
    width={image.width || undefined}
    height={image.height || undefined}
    unoptimized={image.animated} />

  if (image.caption) {
    inner = <figure>
      {inner}
      <figcaption>{renderRichText(image.caption)}</figcaption>
    </figure>
  }
  else if (linkUrl) {
    if (externalLink === false) {
      inner = <Link href={linkUrl}>{inner}</Link>
    }
    else {
      inner = <a href={linkUrl} target="_blank" rel="noopener noreferrer">{inner}</a>
    }
  }

  if (enforceMaxDimensions !== false) {
    style = {
      maxWidth: image.width ? 5 * image.width : undefined,
      maxHeight: image.height ? 5 * image.height : undefined,
      ...style
    }
  }

  return (
    <div className={`${styles.image} ${image.isPixelArt ? styles.pixelArt : ''} ${className ?? ''}`} style={style} onClick={onClick}>
      {inner}
    </div>
  )
}

export default RichImage
