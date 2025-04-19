import type { Route } from "./+types/_index";
import { getQuizData } from "~/utils/fetchQuizService"

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
        <div className="box-narrow">
            <div className="box-header text-center">
                <h6 className="box-superscript">CAE</h6>
                <h1 className="box-title">{quizData.name}</h1>
            </div>
            <div className="box-list">
                {quizData.activities.map(({activity_name, order, idx}) => (
                    <div className="box-list-item text-center uppercase" key={order}>
                        <a href={`/activity/${order}`}>{activity_name}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}