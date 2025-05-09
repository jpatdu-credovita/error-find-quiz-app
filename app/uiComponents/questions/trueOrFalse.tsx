import { CustomMarkdown } from "~/utilityComponents/utils/customMarkdown";
import { BoxWide, BoxHeader, BoxBody, BoxRibbon, BoxFooter } from "~/uilib/box"
import type {TrueFalseQuestion} from "~/quizTypes";
import React from "react";

interface trueOrFalseQuestionProps {
    question: TrueFalseQuestion,
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
        <BoxWide>
            <BoxHeader
                superscript={`${activityName}${roundTitle ? ` / ${roundTitle}` : ""}`}
                title={`Q${order}.`}
            />
            <BoxBody>
                <BoxRibbon>
                    <p><CustomMarkdown>{stimulus}</CustomMarkdown></p>
                </BoxRibbon>
            </BoxBody>
            <BoxFooter>
                <button onClick={() => handleInput(true)}>Correct</button>
                <button onClick={() => handleInput(false)}>Incorrect</button>
            </BoxFooter>
        </BoxWide>
    )
}