import React from 'react'
import { Link } from './Link'
import { WithUserSearchStore } from '../stores/RootModel'
import { observer } from 'mobx-react'
import styled from '@emotion/styled'

const UserSearchResultListItem = styled.li`
  padding: 0;
`

const Username = styled.span``

const UserSearchResultItem = observer(({ login, avatar_url: avatarUrl, url: href, ...rest }) => (
  <UserSearchResultListItem {...rest}>
    <Link {...{ href }}>
      <Username {...{ children: login }} />
      {/* eslint-disable-next-line jsx-a11y/alt-text, this-is-a-false-positive */}
      <img {...{ src: avatarUrl, alt: login, loading: 'lazy' }} />
    </Link>
  </UserSearchResultListItem>
))

const UserSearchResultsOrderedList = styled.ol`
  list-style: none;
`

interface UserSearchResultsListProps extends WithUserSearchStore {}
export const UserSearchResultsList = observer(
  ({
    userSearchStore: {
      userSearchResults: { items },
    },
  }: UserSearchResultsListProps) => {
    return (
      <UserSearchResultsOrderedList>
        {items.map((userSearchResult) => (
          <UserSearchResultItem {...{ ...userSearchResult, key: userSearchResult.id }} />
        ))}
      </UserSearchResultsOrderedList>
    )
  },
)
