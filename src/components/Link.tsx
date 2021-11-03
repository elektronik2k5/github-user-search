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
  }: // eslint-disable-next-line jsx-a11y/anchor-has-content -- this-is-a-false-positive
  LinkProps) => <a {...{ href, rel, ...rest }} />,
)
