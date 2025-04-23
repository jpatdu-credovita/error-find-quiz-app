import React from "react"
import type {TrueFalseQuestionResult} from "~/quizTypes";

import {BoxListItem} from "~/uilib/box"

interface TrueFalseQuestionResultProps {
    result: TrueFalseQuestionResult
}

export const TrueFalseQuestionResultItem: React.FC<TrueFalseQuestionResultProps> = ({result}) => {
    return(
        <BoxListItem>
            <div className="flex justify-between uppercase">
                <span>Q{result.order}</span>
                <span className="font-bold">{result.isUserAnswerCorrect ? 'CORRECT' : result.is_correct.toString()}</span>
            </div>
        </BoxListItem>
    )
}