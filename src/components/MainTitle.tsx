import type { ComponentProps } from 'react'
import { observer } from 'mobx-react'
import { Link } from './Link'
import styled from '@emotion/styled'

const Title = styled.h1`
  text-align: center;
`

interface MainTitleProps extends ComponentProps<typeof Title> {}

export const MainTitle = observer((props: MainTitleProps) => (
  <Title {...props}>
    {'GitHub '}
    <Link {...{ href: 'https://developer.github.com/v3/search/#search-users', children: 'user search' }} />
    {' (limited to '}
    <Link {...{ href: 'https://developer.github.com/v3/search/#rate-limit', children: '10 requests per minute' }} />
    {')'}
  </Title>
))
