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
        <div className="box-wide">
            <div className="box-header">
                <h6 className="box-superscript">{activityName}{roundTitle ? ` / ${roundTitle}` : ""}</h6>
                <h1 className="box-title">Q{order}.</h1>
            </div>
            <div className="box-ribbon">
                <p>{stimulus}</p>
            </div>
            <div className="box-footer">
                <button onClick={() => handleInput(true)}>Correct</button>
                <button onClick={() => handleInput(false)}>Incorrect</button>
            </div>
        </div>
    )
}