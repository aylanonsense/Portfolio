type GamePanelProps = {
  title: string,
  role: string
}

const GamePanel = ({ title, role }: GamePanelProps) => (
  <div className="game">
    <div className="text">
      <h2>{title}</h2>
      <p>{role}</p>
    </div>
  </div>
)

export default GamePanel
