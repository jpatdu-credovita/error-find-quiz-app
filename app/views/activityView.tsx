import React, {useState} from "react"
import type {TransformedActivity, Question, QuestionResult, RoundResult, QuestionType} from "~/quizTypes";

import { TrueOrFalseQuestion } from "~/uiComponents/questions/trueOrFalse"
import { RoundTitle } from "~/uiComponents/questions/roundTitle"
import { Results } from "~/uiComponents/results/results"
import { GenericError } from "~/uiComponents/errors/genericError";
import { BoxView } from "~/uilib/box"

type ActivityDisplayToRender = ("singleRound" | "multiRound" | "roundTitle" | "question" | "results")

export function ActivityView({ activity }: { activity: TransformedActivity }) {
    const [currentQuestion, setCurrentQuestion] = useState(activity.questions[0].questions[0])
    const [currentRound, setCurrentRound] = useState(activity.questions[0])
    const [currentRoundResults, setCurrentRoundResults] = useState<QuestionResult[]>([]);
    const [activityResults, setActivityResults] = useState<RoundResult[]>([]);
    const [clickCount, setClickCount] = useState(0)

    const initialDisplay: ActivityDisplayToRender = activity.roundType === "singleRound" ? "question" : "roundTitle"
    const [currentDisplay, setCurrentDisplay] = useState<ActivityDisplayToRender>(initialDisplay)

    const handleNewRound = () => {
        setCurrentQuestion(currentRound.questions[0])
        setCurrentDisplay("question")
        setClickCount(clickCount + 1)
    }

    const handleAnswer = (event: QuestionResult) => {
        let latestRoundResults = [...currentRoundResults, event]
        let latestActivityResults: RoundResult[] = activityResults
        let nextQuestionToRender: Question
        let nextRoundToRender = currentRound
        let nextDisplayToRender: ActivityDisplayToRender = currentDisplay

        const isRoundComplete = latestRoundResults.length === currentRound.questions.length
        if (!isRoundComplete) {
            // Advance to Next Question
            nextQuestionToRender = currentRound.questions[event.order]
            setCurrentQuestion(nextQuestionToRender)
        } else {
            // Store round results to overall activity results array
            const roundResults: RoundResult = {
                "order": currentRound.order,
                "round_title": currentRound.round_title,
                "results": latestRoundResults
            }
            latestActivityResults.push(roundResults)

            // Reset round results in anticipation of new round
            latestRoundResults = []

            const isActivityComplete = latestActivityResults.length === activity.questions.length
            if (isActivityComplete) {
                // Render results
                nextDisplayToRender = "results"
            } else {
                // Render next round
                nextRoundToRender = activity.questions[currentRound.order]
                nextDisplayToRender = "roundTitle"
            }
        }

        setCurrentRoundResults(latestRoundResults)
        setActivityResults(latestActivityResults)
        setCurrentRound(nextRoundToRender)
        setCurrentDisplay(nextDisplayToRender)
        setClickCount(clickCount + 1)
    }

    const renderContent = () => {
        switch (currentDisplay) {
            case "roundTitle":
                return (
                    <RoundTitle
                        roundTitle={currentRound.round_title as string}
                        activityName={activity.activity_name}
                        proceedHandler={handleNewRound}
                    />
                )
            case "question":
                return (
                    currentQuestion ? renderQuestion(currentQuestion.questionType) : <GenericError />
                )
            case "results":
                return (<Results
                    activityName={activity.activity_name}
                    activityRoundType={activity.roundType}
                    activityResults={activityResults}
                />)
            default:
                return (<GenericError/>)
        }
    }

    const renderQuestion = (questionType: QuestionType) => {
        switch (questionType) {
            case "TrueFalse":
                return (<TrueOrFalseQuestion
                    question={currentQuestion}
                    activityName={activity.activity_name}
                    roundTitle={currentRound.round_title}
                    handleAnswer={handleAnswer}
                />)
        }
    }

    return (
        <BoxView viewKey={clickCount}>
            {renderContent()}
        </BoxView>
    )
}