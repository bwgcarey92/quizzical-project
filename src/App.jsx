import React  from "react"

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false)

  function startGame() {
    setGameStarted(true)
    console.log(gameStarted)
  }

  return (
    <div>
      {gameStarted ? (
        <>
        <div className="quiz-container">
          <h2 className="question-title">how would one say goodby in spanish?</h2>
          <div className="answer-container">
            <p className="answers">Aidos</p>
            <p className="answers">Hola</p>
            <p className="answers">Au Revoir</p>
            <p className="answers">Salir</p>
          </div>
        </div>
        <button className="check-answer-btn">Check answers</button>
        </>
      ) : (
      <div className="app-title-container">
        <h1 className="app-title">Quizzical</h1>
        <h2 className="app-subtitle">Test Your Knowledge, One Fun Fact at a Time!</h2>
        <button className="start-btn" onClick={startGame}>Start Quiz</button>
      </div>
      )}
    </div>
  )
}


