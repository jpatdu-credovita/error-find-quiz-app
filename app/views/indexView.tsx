import { BoxBody, BoxHeader, BoxList, BoxListItem, BoxNarrow, BoxView } from "~/uilib/box";
import {AnimatedLink} from "~/utilityComponents/customElements/animatedLink";

export function IndexView( {quizData} ) {
    return (
        <BoxView viewKey="index">
            <BoxNarrow>
                <BoxHeader superscript="CAE" title={quizData.name} center={true} />
                <BoxBody>
                    <BoxList>
                        {quizData.activities.map(({activity_name, order, idx}) => (
                            <BoxListItem key={order} className="text-center uppercase">
                                <AnimatedLink to={`/activity/${order}`}>{activity_name}</AnimatedLink>
                            </BoxListItem>
                        ))}
                    </BoxList>
                </BoxBody>
            </BoxNarrow>
        </BoxView>
    )
}