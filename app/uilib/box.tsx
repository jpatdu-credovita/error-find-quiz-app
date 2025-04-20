import React from 'react'
import { SlideInOut } from '~/utilityComponents/pageTransitions/boxSlideInOutWrapper'

function generateClassName(baseClass: string, additionalClasses?: string): string {
    return [baseClass, additionalClasses].filter(Boolean).join(' ')
}

interface BoxViewProps {
    children: React.ReactElement,
    viewKey: ( string | number )
}

export const BoxView: React.FC<BoxViewProps> = ({children, viewKey}) => (
    <SlideInOut animateKey={viewKey}>
        {children}
    </SlideInOut>
)

interface BaseBoxProps {
    children?: React.ReactNode
    className?: string
}

interface BoxProps extends BaseBoxProps {}

export const BoxWide: React.FC<BoxProps> = ({
                                                children,
                                                className,
                                                ...rest
                                            }) => {
    const combinedClassName = generateClassName("box-wide", className)
    return (
            <div className={combinedClassName} {...rest}>
                {children}
            </div>
    )
}

export const BoxNarrow: React.FC<BoxProps> = ({
                                                  children,
                                                  className,
                                                  ...rest
                                              }) => {
    const combinedClassName = generateClassName("box-narrow", className)
    return (
            <div className={combinedClassName} {...rest}>
                {children}
            </div>
    )
}

interface BoxHeaderProps extends BaseBoxProps {
    title?: string
    superscript?: string
    center?: boolean
}

export const BoxHeader: React.FC<BoxHeaderProps> = ({
                                                        children,
                                                        title,
                                                        superscript,
                                                        className,
                                                        center = false,
                                                        ...rest
                                                    }) => {
    const combinedClassName = generateClassName("box-header", className)
    const superscriptClassName = `box-superscript${center ? ' text-center' : ''}`;
    const titleClassName = `box-title${center ? ' text-center' : ''}`;
    return (
        <div className={combinedClassName} {...rest}>
            {superscript ? (<h6 className={superscriptClassName}>{superscript}</h6>) : null}
            {title ? (<h1 className={titleClassName}>{title}</h1>) : null}
            {children}
        </div>
    )
}

interface RequiredChildrenBoxProps extends BaseBoxProps {
    children: React.ReactNode
}

export const BoxBody: React.FC<RequiredChildrenBoxProps> = ({
                                                                children,
                                                                className,
                                                                ...rest
                                                            }) => {
    const combinedClassName = generateClassName("box-body", className)
    return (
        <div className={combinedClassName} {...rest}>
            {children}
        </div>
    )
}

interface BoxRibbonProps extends RequiredChildrenBoxProps {}

export const BoxRibbon: React.FC<BoxRibbonProps> = ({
                                                        children,
                                                        className,
                                                        ...rest
                                                    }) => {
    const combinedClassName = generateClassName("box-ribbon", className)
    return (
        <div className={combinedClassName} {...rest}>
            {children}
        </div>
    )
}

interface BoxListProps extends RequiredChildrenBoxProps {}

export const BoxList: React.FC<BoxListProps> = ({
                                                    children,
                                                    className,
                                                    ...rest
                                                }) => {
    const combinedClassName = generateClassName("box-list", className)
    return (
        <div className={combinedClassName} {...rest}>
            {children}
        </div>
    )
}

interface BoxListItemProps extends RequiredChildrenBoxProps {}

export const BoxListItem: React.FC<BoxListItemProps> = ({
                                                            children,
                                                            className,
                                                            ...rest
                                                        }) => {
    const combinedClassName = generateClassName("box-list-item", className)
    return (
        <div className={combinedClassName} {...rest}>
            {children}
        </div>
    )
}
interface BoxFooterProps extends RequiredChildrenBoxProps {}

export const BoxFooter: React.FC<BoxFooterProps> = ({
                                                        children,
                                                        className,
                                                        ...rest
                                                    }) => {
    const combinedClassName = generateClassName("box-footer", className)
    return (
        <div className={combinedClassName} {...rest}>
            {children}
        </div>
    )
}