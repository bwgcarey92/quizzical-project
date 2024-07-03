import React from 'react'
import he from 'he'
import {nanoid} from 'nanoid'


export default function Quiz(props){
    const [newQuizData, setNewQuizData] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [buttonActive, setButtonActive] = React.useState(false)

    React.useEffect(()=> {
        if (props.data) {
            const formattedData = props.data.map(arr => {
                const answers = shuffle([...arr.incorrect_answers, arr.correct_answer])
                return {
                    question: arr.question,
                    answers: answers,
                    correctAnswer: arr.correct_answer,
                    selectedAnswer: null,
                    isCorrect: null
                }
            })
            setNewQuizData(formattedData)
            console.log(newQuizData)
        }
    }, [props.data])

    function shuffle(array) {
        let shuffledArray = array.slice(); // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }
      

    function handleAnswerClick(questionIndex, answer) {
        if (!buttonActive) {
            setNewQuizData(prev => {
                const updatedQuizData = [...prev]
                updatedQuizData[questionIndex].selectedAnswer = answer
                return updatedQuizData
            })
        }
    }

    function checkAnswers() {
        setButtonActive(true)
        setNewQuizData(prev => {
            const answeredQuizData = prev.map(question => {
                const isCorrect = question.selectedAnswer === question.correctAnswer
                return {
                    ...question,
                    isCorrect: isCorrect
                }
            })
            const correctAnswerCount = answeredQuizData.filter(question => question.isCorrect).length
            setScore(correctAnswerCount)
            return answeredQuizData
        })
    }

    const allQuestionsAnswered = newQuizData.every(question => question.selectedAnswer !== null)

    const renderedQuestions = newQuizData.map((questionObj, index) => {
        return (
            <div key={nanoid()} className="quiz-container">
                <h2 className="question-title">{he.decode(questionObj.question)}</h2>
                <div className="answer-container">
                {questionObj.answers.map(answer => {
                    const decodedAnswer = he.decode(answer)
                    const isSelected = questionObj.selectedAnswer === decodedAnswer
                    let answerClass = 'answers'

                    if (questionObj.isCorrect !== null) {
                        if (decodedAnswer === questionObj.correctAnswer) {
                            answerClass += ' correct'
                        } else if (isSelected && decodedAnswer !== questionObj.correctAnswer) {
                            answerClass += ' incorrect'
                        }
                    } else if (isSelected) {
                        answerClass += ' selected'
                    }

                    return (
                        <p
                            key={nanoid()}
                            className={answerClass}
                            onClick={()=> {
                                return handleAnswerClick(index, decodedAnswer)
                            }}
                        >
                            {decodedAnswer}
                        </p>
                    )
                })}
            </div>
          </div>
        )
    })

    return (
        <>
            {renderedQuestions}
            {buttonActive ? <p className='score'>You got {score} out of {newQuizData.length} correct!</p> : null}   
            <button 
                className="check-answer-btn"
                onClick={checkAnswers}
            >
                Check answers</button> 
        </>
    )
}