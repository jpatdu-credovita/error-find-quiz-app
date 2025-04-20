import React from 'react'
import { SlideInOut } from "~/utilityComponents/boxSlideInOutWrapper";

export default function BoxWide({
    children,
    boxKey,
    ...rest
}) {
    return (
        <SlideInOut animateKey={boxKey}>
            {children}
        </SlideInOut>
    )
}