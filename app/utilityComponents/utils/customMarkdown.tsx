/*
Customised implementation of markdown-to-jsx where <em> tags are overridden as <strong>
Due to non-standard implementation of Markdown in the API and design,
where <em> must be displayed as bold instead of italicised text
*/

import React from 'react'
import Markdown from 'markdown-to-jsx'

type CustomMarkdownProps = React.ComponentProps<typeof Markdown>

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
                                                                  children,
                                                                  options,
                                                                  ...rest
                                                              }) => {
    // Override <em> to <strong> by default unless user supplies a custom override for <em>:
    const emOverride = options?.overrides?.em ?? { component: 'strong' }

    return (
        <Markdown options={{
            ...options,
            overrides: {
                ...(options?.overrides),
                em: emOverride
            }
        }} {...rest}>
            {children}
        </Markdown>
    )
}