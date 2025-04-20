import type { Route } from "./+types/_index";
import { getQuizData } from "~/utils/fetchQuizService"
import { BoxView, BoxNarrow, BoxHeader, BoxBody, BoxList, BoxListItem } from "~/components/box"

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
        <BoxView viewKey="index">
            <BoxNarrow>
                <BoxHeader superscript="CAE" title={quizData.name} center={true} />
                <BoxBody>
                    <BoxList>
                        {quizData.activities.map(({activity_name, order, idx}) => (
                            <BoxListItem key={order} className="text-center uppercase">
                                <a href={`/activity/${order}`}>{activity_name}</a>
                            </BoxListItem>
                        ))}
                    </BoxList>
                </BoxBody>
            </BoxNarrow>
        </BoxView>
    )
}