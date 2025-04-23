import React from "react"
import type {ActivityRoundType, RoundResult, TrueFalseQuestionResult} from "~/quizTypes";

import {BoxNarrow, BoxHeader, BoxBody, BoxList, BoxListItem, BoxFooter} from "~/uilib/box"
import {AnimatedLink} from "~/uiComponents/customElements/animatedLink";
import {TrueFalseQuestionResultItem} from "~/uiComponents/results/trueFalseQuestionResult";

interface ResultsProps {
    activityName: string,
    activityRoundType: ActivityRoundType,
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
                    {activityResults.map((
                        {order: roundOrder, results, round_title}: RoundResult
                    ) => (
                        <React.Fragment key={roundOrder}>
                            {activityRoundType === "multiRound" ? (
                                <BoxListItem key={roundOrder} className="text-center uppercase font-bold">
                                    <p>{round_title}</p>
                                </BoxListItem>
                            ) : null}
                            {results.map((result) => {
                                if (result.questionType === "TrueFalse") {
                                    return (<TrueFalseQuestionResultItem key={result.order} result={result as TrueFalseQuestionResult} />)
                                }
                            })}
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