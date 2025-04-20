import { BoxWide, BoxBody, BoxFooter } from "~/uilib/box";
import React from "react";

interface GenericErrorProps {
    errorTitle?: string;
    errorMessage?: string;
}

export const GenericError: React.FC<GenericErrorProps> = ({
    errorTitle = ":(",
    errorMessage = "Apologies, something went wrong."
}) => {
    return (
        <BoxWide>
            <BoxBody>
                <div className="p-4 flex h-full">
                    <div className="m-auto text-center">
                        <h1 className="font-bold text-2xl">{errorTitle}</h1>
                        <p>{errorMessage}</p>
                    </div>
                </div>
            </BoxBody>
            <BoxFooter>
                <a href="/">HOME</a>
            </BoxFooter>
        </BoxWide>
    )
}