import React from 'react'
import { observer } from 'mobx-react'

interface LinkProps extends WithChildren {
  href: string
  isExternal?: boolean
  rel?: string
}
export const Link = observer(
  ({
    href,
    isExternal = href.startsWith('http'),
    rel = isExternal ? 'noopener noreferrer' : undefined,
    ...rest
  }: LinkProps) => <a {...{ href, rel, ...rest }} />,
)
