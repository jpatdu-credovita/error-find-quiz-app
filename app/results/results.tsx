enum activityRoundType {
    singleRound = "singleRound",
    multiRound = "multiRound",
}

interface ResultsProps {
    activityName: string,
    activityRoundType: activityRoundType,
    activityResults: any
}

export const Results: React.FC<ResultsProps> = ({
    activityName,
    activityRoundType,
    activityResults
}) => {
    return (
        <div>
            <h6>{activityName}</h6>
            <h1>Results</h1>
            {activityResults.map(({order, results, round_title}) => (
                <div key={order}>
                    {activityRoundType === "singleRound" ? (
                        <div>
                            <p>{round_title}</p>
                        </div>
                    ) : null}
                    {results.map(({
                        feedback,
                        isUserAnswerCorrect,
                        is_correct,
                        order,
                        stimulus
                    }) => (
                        <div key={order}>
                            <div>
                                <span>Q{order}</span>
                                <span>{isUserAnswerCorrect ? 'CORRECT' : is_correct.toString()}</span>
                            </div>
                            {!isUserAnswerCorrect ? (
                                <div>
                                    "{stimulus}" {is_correct ? `is correct. There is no error.` : `should be "${feedback}"`}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
            <div>
                <a href="/">HOME</a>
            </div>
        </div>
    )
}