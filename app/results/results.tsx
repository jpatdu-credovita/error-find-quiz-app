import React from "react"
import {CustomMarkdown} from "~/utilityComponents/customMarkdown";

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
        <div className="box-narrow">
            <div className="box-header text-center">
                <h6 className="box-superscript">{activityName}</h6>
                <h1 className="box-title">Results</h1>
            </div>
            <div className="box-list">
                {activityResults.map(({order: roundOrder, results, round_title}) => (
                    <React.Fragment key={roundOrder}>
                        {activityRoundType === "multiRound" ? (
                            <div className="box-list-item text-center uppercase font-bold">
                                <p>{round_title}</p>
                            </div>
                        ) : null}
                        {results.map(({
                                          feedback,
                                          isUserAnswerCorrect,
                                          is_correct,
                                          order: questionOrder,
                                          stimulus
                                      }) => (
                            <div className="box-list-item" key={questionOrder}>
                                <div className="flex justify-between uppercase">
                                    <span>Q{questionOrder}</span>
                                    <span className="font-bold">{isUserAnswerCorrect ? 'CORRECT' : is_correct.toString()}</span>
                                </div>
                                {!isUserAnswerCorrect ? (
                                    <span className="text-sm mt-2">
                                        "<CustomMarkdown>{stimulus}</CustomMarkdown>" {
                                        is_correct ? (<span> is correct. There is no error.</span>)
                                            : (<span> should be "<CustomMarkdown>{feedback}</CustomMarkdown>"</span>)
                                        }
                                    </span>
                                ) : null}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="box-footer">
                <a href="/">HOME</a>
            </div>
        </div>
    )
}