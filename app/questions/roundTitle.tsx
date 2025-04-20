import {useEffect} from "react";
import { BoxWide, BoxHeader } from "~/components/box";

interface RoundTitleProps {
    roundTitle: string
    activityName: string
    displayDuration?: number
    proceedHandler: any
}

export const RoundTitle: React.FC<RoundTitleProps> = ({
                                                          roundTitle,
                                                          activityName,
                                                          displayDuration = 1500,
                                                          proceedHandler,
                                                      }) => {
    useEffect(() => {
        const timerId = setTimeout(proceedHandler, displayDuration)

        // Handle unexpected unmount or re-run of effect
        return () => {
            clearTimeout(timerId)
        }
    }, [displayDuration, proceedHandler])

    return (
        <BoxWide boxKey={roundTitle}>
            <BoxHeader superscript={activityName} title={roundTitle.toUpperCase()} />
        </BoxWide>
    )
}