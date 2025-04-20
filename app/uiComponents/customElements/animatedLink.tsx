/*
Animated link with view transition and loading indication
 */

import { NavLink } from "react-router"
import React from "react";

interface AnimatedLinkProps {
    linkTo: string
    children: React.ReactNode
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
                                                              linkTo,
                                                              children,
                                                              ...rest
}) => {
    return (
        <NavLink to={linkTo} {...rest} viewTransition>
            {({ isPending }) => (
                !isPending ? children : (<span className="animate-pulse">Loading...</span>)
            )}
        </NavLink>
    )
}