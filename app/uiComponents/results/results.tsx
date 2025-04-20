import React from "react"
import {CustomMarkdown} from "~/utilityComponents/utils/customMarkdown"
import {BoxNarrow, BoxHeader, BoxBody, BoxList, BoxListItem, BoxFooter} from "~/uilib/box"
import {AnimatedLink} from "~/utilityComponents/customElements/animatedLink";

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
        <BoxNarrow>
            <BoxHeader superscript={activityName} title="Results" center={true} />
            <BoxBody>
                <BoxList>
                    {activityResults.map(({order: roundOrder, results, round_title}) => (
                        <React.Fragment key={roundOrder}>
                            {activityRoundType === "multiRound" ? (
                                <BoxListItem key={roundOrder} className="text-center uppercase font-bold">
                                    <p>{round_title}</p>
                                </BoxListItem>
                            ) : null}
                            {results.map(({ feedback, isUserAnswerCorrect, is_correct, order: questionOrder, stimulus}) => (
                                <BoxListItem key={questionOrder}>
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
                                </BoxListItem>
                            ))}
                        </React.Fragment>
                    ))}
                </BoxList>
            </BoxBody>
            <BoxFooter>
                <AnimatedLink linkTo="/">HOME</AnimatedLink>
            </BoxFooter>
        </BoxNarrow>
    )
}