import { CSSProperties } from 'react'
import Image from 'next/image'
import type { ImageAssetData } from 'types/contentData'
import styles from 'styles/components/BetterImage.module.scss'

type BetterImageProps = {
  image: ImageAssetData
  fillHeight?: boolean | undefined
  className?: string | undefined
  style?: CSSProperties | undefined
  onClick?: (() => void) | undefined
}

const BetterImage = ({ image, fillHeight, className, style, onClick }: BetterImageProps) => (
  <div className={`${styles.image} ${image.isPixelArt ? styles.pixelArt : ''} ${fillHeight ? styles.fillHeight : styles.fillWidth} ${className ?? ''}`} style={style} onClick={onClick}>
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height} />
  </div>
)

export default BetterImage
