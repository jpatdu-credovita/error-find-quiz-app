import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

import { TrueOrFalseQuestion } from "~/questions/trueOrFalse"
import { RoundTitle } from "~/questions/roundTitle"
import { Results } from "~/results/results"

export function ActivityView({ activity }) {
    const [currentQuestion, setCurrentQuestion] = useState(activity.questions[0].questions[0])
    const [currentRound, setCurrentRound] = useState(activity.questions[0])
    const [currentRoundResults, setCurrentRoundResults] = useState([])
    const [activityResults, setActivityResults] = useState([])
    const [clickCount, setClickCount] = useState(0)

    const initialDisplay: String = activity.roundType === "singleRound" ? "question" : "roundTitle"
    const [currentDisplay, setCurrentDisplay] = useState(initialDisplay)

    const handleNewRound = () => {
        setCurrentQuestion(currentRound.questions[0])
        setCurrentDisplay("question")
        setClickCount(clickCount + 1)
    }

    const handleAnswer = (event) => {
        let latestRoundResults = [...currentRoundResults, event]
        let latestActivityResults = activityResults
        let nextQuestionToRender = null
        let nextRoundToRender = currentRound
        let nextDisplayToRender = currentDisplay

        const isRoundComplete = latestRoundResults.length === currentRound.questions.length
        if (!isRoundComplete) {
            // Advance to Next Question
            nextQuestionToRender = currentRound.questions[event.order]
        } else {
            // Store round results to overall activity results array
            const roundResults = {
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
                nextQuestionToRender = nextRoundToRender.questions[0]
                nextDisplayToRender = "roundTitle"
            }
        }

        setCurrentRoundResults(latestRoundResults)
        setActivityResults(latestActivityResults)
        setCurrentRound(nextRoundToRender)
        setCurrentQuestion(nextQuestionToRender)
        setCurrentDisplay(nextDisplayToRender)
        setClickCount(clickCount + 1)
    }

    const renderContent = () => {
        switch (currentDisplay) {
            case "roundTitle":

                return (
                    <RoundTitle
                        roundTitle={currentRound.round_title}
                        activityName={activity.activity_name}
                        proceedHandler={handleNewRound}
                    />
                )
            case "question":
                return (
                    currentQuestion ? <TrueOrFalseQuestion
                        question={currentQuestion}
                        activityName={activity.activity_name}
                        roundTitle={activity.roundType === "multiRound" ? currentRound.round_title : null}
                        handleAnswer={handleAnswer}
                    /> : null
                )
            case "results":
                return (<Results
                    activityName={activity.activity_name}
                    activityRoundType={activity.roundType}
                    activityResults={activityResults}
                />)
        }
    }

    const pageVariants = {
        initial: {
            opacity: 0,
            x: '100vw',
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            x: '-100vw',
            transition: { duration: 0.3, ease: "easeIn" }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                key={clickCount}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex h-screen w-screen"
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    )
}