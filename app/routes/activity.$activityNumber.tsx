import type { Route } from "./+types/activity.$activityNumber"
import { getQuizData } from "~/jsutils/fetchQuizService"
import { ActivityView } from "~/views/activityView"
import type {Activity, Round, Question, TransformedActivity} from "~/quizTypes";

export function meta({ data }: Route.MetaArgs) {
    const { activity } = data
    return [
        { title: activity.activity_name },
    ]
}

export async function loader({ params }: Route.LoaderArgs): Promise<{activity: TransformedActivity}> {
    const quizData = await getQuizData()
    const { activities } = quizData

    const selectedActivityNumber: Number = parseInt(params.activityNumber)
    const selectedActivity = activities.find(
        (activity) => activity.order === selectedActivityNumber
    )

    if (!selectedActivity) {
        throw new Response("Activity not found", { status: 404 })
    }

    let currentActivity: TransformedActivity
    const firstQuestion = selectedActivity.questions?.[0]
    const isMultiRound: boolean = firstQuestion ? 'round_title' in firstQuestion : false
    const sortedQuestionsRounds = [...selectedActivity.questions].sort(
        (prev,next) => prev.order - next.order
    )

    if (isMultiRound) {
        const rounds: Round[] = sortedQuestionsRounds as Round[]
        currentActivity = {
            ...selectedActivity,
            roundType: "multiRound",
            questions: rounds.map((round: Round) => {
                const transformedQuestions: Question[] = round.questions.map((q: Question) => {
                    q.questionType = "TrueFalse"
                    return q
                })
                return {...round, questions: transformedQuestions }
            }) as Round[] // Since questionType is not returned by the server, manually set questionType and assume all are True/False questions
        }
    } else {
        let activityQuestions = sortedQuestionsRounds as Question[]
        activityQuestions = activityQuestions.map((q: Question) => {
            q.questionType = "TrueFalse"
            return q
        })
        const mockRound: Round[] = [{
            order: 1,
            questions: activityQuestions
        }]
        currentActivity = {
            ...selectedActivity,
            roundType: "singleRound",
            questions: mockRound as Round[]
        }
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