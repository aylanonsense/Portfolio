type GamePanelProps = {
  title: string,
  role: string
}

function GamePanel({ title, role }: GamePanelProps) {
  return (
    <div className="game">
      <div className="text">
        <h2>{title}</h2>
        <p>{role}</p>
      </div>
    </div>
  )
}
export default GamePanel
