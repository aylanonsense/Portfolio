import { CSSProperties } from 'react'
import NextImage from 'next/image'
import type { ImageAssetData } from 'types/contentData'
import styles from 'styles/components/Image.module.scss'

type ImageProps = {
  image: ImageAssetData,
  className?: string | undefined,
  style?: CSSProperties | undefined,
  onClick?: (() => void) | undefined
}

const Image = ({ image, className, style, onClick }: ImageProps) => (
  <div className={`${styles.image} ${image.isPixelArt ? styles.pixelArt : ''} ${className}`} style={style} onClick={onClick}>
    <NextImage
      src={image.url}
      alt={image.description}
      width={image.width}
      height={image.height} />
  </div>
)

export default Image
