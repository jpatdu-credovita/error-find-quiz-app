import type { Route } from "./+types/_index";
import { getQuizData } from "~/jsutils/fetchQuizService"
import { IndexView } from "~/views/indexView"

export function meta({ data }: Route.MetaArgs) {
    const { quizData } = data
    return [
        { title: quizData.name },
        { name: "description", content: quizData.heading },
    ]
}

export async function loader({ params }: Route.LoaderArgs) {
    const quizData = await getQuizData()
    return { quizData }
}

export default function Index({
                                  loaderData,
                              }: Route.ComponentProps) {
    const { quizData } = loaderData
    return (
        <IndexView quizData={quizData} />
    )
}