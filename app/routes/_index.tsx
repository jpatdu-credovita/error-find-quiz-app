import type { Route } from "./+types/_index";
import { getQuizData } from "~/jsutils/fetchQuizService"
import { IndexView } from "~/views/indexView"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
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