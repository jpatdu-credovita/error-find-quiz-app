import {useEffect} from "react";

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
        <div>
            <h6>{activityName}</h6>
            <h1>{roundTitle}</h1>
        </div>
    )
}