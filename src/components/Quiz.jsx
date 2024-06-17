import React from 'react'
import he from 'he'
import {nanoid} from 'nanoid'
export default function Quiz(props){

    const dataArr = props.data.map(arr => {
        console.log(arr)
        const answerArr = []
        const incorrectAnswers = arr.incorrect_answers.map(answer => answerArr.push(answer))
        answerArr.push(arr.correct_answer)

        function shuffle(arr) {
            let currentIndex = arr.length

            while (currentIndex != 0) {

                let randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--

                [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
            }
        }
        shuffle(answerArr)
        
        console.log(answerArr)
        return (
            <div key={nanoid()} className="quiz-container">
            <h2 className="question-title">{he.decode(arr.question)}</h2>
            <div className="answer-container">
              <p className="answers">{he.decode(answerArr[0])}</p>
              <p className="answers">{he.decode(answerArr[1])}</p>
              <p className="answers">{he.decode(answerArr[2])}</p>
              <p className="answers">{he.decode(answerArr[3])}r</p>
            </div>
          </div>
        )
    })

    return (
        <>
        {dataArr}
        <button className="check-answer-btn">Check answers</button>
        </>
    )
}