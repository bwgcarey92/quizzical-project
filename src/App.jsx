import React  from "react"
import Quiz from './components/Quiz'

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false)
  const [quizData, setQuizData] = React.useState(null)

  React.useEffect(()=> {
      fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setQuizData(data.results)
        })
        .catch(error => console.error("Error fetching quiz data", error))
  }, [])

  function startGame() {
    setGameStarted(true)
    console.log("hello")
  }

  return (
    <div>
      {gameStarted ? (
        <Quiz
          data={quizData}
        />
      ) : (
      <div className="app-title-container">
        <div className="app-title-subcontainer">
          <h1 className="app-title">Quizzical</h1>
          <h2 className="app-subtitle">Test Your Knowledge, One Fun Fact at a Time!</h2>
        </div>
        <button className="start-btn" onClick={startGame}>Start Quiz</button>
      </div>
      )}
    </div>
  )
}


