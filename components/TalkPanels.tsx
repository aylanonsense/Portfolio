import type { TalkData } from 'types/contentData'
import RichImage from 'components/RichImage'
import styles from 'styles/components/TalkPanels.module.scss'

type GameGridProps = {
  talks: TalkData[]
}

const TalkPanel = ({ talks }: GameGridProps) => (
  <div className={styles.talkPanels}>
    {talks.map(talk => (
      <div key={talk.title} className={styles.talkPanel}>
        <h3 className={styles.title}>{talk.recordingUrl ? <a href={talk.recordingUrl} target="_blank" rel="noopener noreferrer">{talk.title}</a> : talk.title}</h3>
        <div className={styles.thumbnail}>
          <RichImage
            image={talk.thumbnail}
            linkUrl={talk.recordingUrl || undefined}
            tabbable={false} />
        </div>
        {talk.event && (
          <p className={styles.event}>{talk.eventUrl ? <a href={talk.eventUrl} target="_blank" rel="noopener noreferrer">{talk.event}</a> : talk.event}</p>
        )}
      </div>
    ))}
  </div>
)

export default TalkPanel
