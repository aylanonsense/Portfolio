import NextImage from 'next/image'
import type { ImageAssetData } from 'types/contentData'
import styles from 'styles/components/Image.module.scss'

type ImageProps = {
  className?: string | undefined,
  image: ImageAssetData,
  onClick?: (() => void) | undefined
}

const Image = ({ className, image, onClick }: ImageProps) => (
  <div className={`${styles.image} ${image.isPixelArt ? styles.pixelArt : ''} ${className}`} onClick={onClick}>
    <NextImage
      src={image.url}
      alt={image.description}
      width={image.width}
      height={image.height} />
  </div>
)

export default Image
