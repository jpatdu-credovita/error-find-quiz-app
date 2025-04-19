interface trueOrFalseQuestionProps {
    question: any,
    activityName: string,
    roundTitle?: string,
    roundNumber?: number,
    handleAnswer: any,
}

export const TrueOrFalseQuestion: React.FC<trueOrFalseQuestionProps> = ({
    question,
    activityName,
    roundTitle,
    roundNumber,
    handleAnswer
}) => {
    const { order, stimulus, is_correct } = question
    const handleInput = (answer: Boolean) => {
        const event = {
            ...question,
            roundTitle,
            roundNumber,
            isUserAnswerCorrect: answer === is_correct
        }
        return handleAnswer(event)
    }
    return(
        <div>
            <h6>{activityName}{roundTitle ? `/ ${roundTitle}` : ""}</h6>
            <h1>Q{order}.</h1>
            <p>{stimulus}</p>
            <button onClick={() => handleInput(true)}>Correct</button>
            <button onClick={() => handleInput(false)}>Incorrect</button>
        </div>
    )
}