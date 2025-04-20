import { BoxBody, BoxHeader, BoxList, BoxListItem, BoxNarrow, BoxView } from "~/uilib/box";

export function IndexView( {quizData} ) {
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