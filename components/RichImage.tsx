import { CSSProperties } from 'react'
import Image from 'next/image'
import type { ImageAssetData } from 'types/contentData'
import renderRichText from 'helpers/renderRichText'
import styles from 'styles/components/RichImage.module.scss'

type RichImageProps = {
  image: ImageAssetData
  enforceMaxDimensions?: boolean | undefined
  className?: string | undefined
  style?: CSSProperties | undefined
  onClick?: (() => void) | undefined
}

const RichImage = ({ image, enforceMaxDimensions, className, style, onClick }: RichImageProps) => {
  let inner = <Image
    src={image.url}
    alt={image.alt}
    width={image.width}
    height={image.height} />

  if (image.caption) {
    inner = <figure>
      {inner}
      <figcaption>{renderRichText(image.caption)}</figcaption>
    </figure>
  }
  else if (image.linkUrl) {
    inner = <a href={image.linkUrl} target="_blank" rel="noopener noreferrer">{inner}</a>
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
