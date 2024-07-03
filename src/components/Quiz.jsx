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
                const answers = [...arr.incorrect_answers, arr.correct_answer]
                shuffle(answers)
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

    function shuffle(arr) {
        let currentIndex = arr.length

        while (currentIndex !== 0) {

            const randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
        }
        return arr
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