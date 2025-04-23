import type {Quiz, Activity} from "~/quizTypes";
import { BoxBody, BoxHeader, BoxList, BoxListItem, BoxNarrow, BoxView } from "~/uilib/box";
import {AnimatedLink} from "~/uiComponents/customElements/animatedLink";

export function IndexView( {quizData}: {quizData: Quiz} ) {
    return (
        <BoxView viewKey="index">
            <BoxNarrow>
                <BoxHeader superscript="CAE" title={quizData.name} center={true} />
                <BoxBody>
                    <BoxList>
                        {quizData.activities.map(({activity_name, order}) => (
                            <BoxListItem key={order} className="text-center uppercase">
                                <AnimatedLink linkTo={`/activity/${order}`}>{activity_name}</AnimatedLink>
                            </BoxListItem>
                        ))}
                    </BoxList>
                </BoxBody>
            </BoxNarrow>
        </BoxView>
    )
}