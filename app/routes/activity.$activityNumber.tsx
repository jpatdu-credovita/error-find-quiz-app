import type { Route } from "./+types/activity.$activityNumber"
import { getQuizData } from "~/jsutils/fetchQuizService"
import { ActivityView } from "~/views/activityView"

export async function loader({ params }: Route.LoaderArgs) {
    const quizData = await getQuizData()
    const { activities } = quizData
    
    const selectedActivityNumber: Number = parseInt(params.activityNumber)
    const selectedActivity = activities.find(
        (activity) => activity.order === selectedActivityNumber
    )

    if (!selectedActivity) {
        throw new Response("Activity not found", { status: 404 })
    }
    
    const currentActivity = {...selectedActivity}
    currentActivity.question = [...selectedActivity.questions].sort(
        (prev,next) => prev.order - next.order
    )
    const isMultiRound: Boolean = currentActivity.questions[0].round_title ? true : false

    if (isMultiRound) {
        currentActivity.roundType = "multiRound"
    } else {
        currentActivity.roundType = "singleRound"
        const currentActivityQuestions = structuredClone(currentActivity.questions)
        currentActivity.questions = [{
            order: 1,
            questions: currentActivityQuestions
        }]
    }

    return { activity: currentActivity }
}

export default function Activity({
                                     loaderData,
                                 }: Route.ComponentProps) {
    const { activity } = loaderData

    return (
        <ActivityView activity={activity} />
    )
}