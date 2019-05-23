import React from 'react'
import { WithUserSearchResultsStore } from '../stores/RootModel'

interface UserSearchResultsListProps extends WithUserSearchResultsStore {}
export function UserSearchResultsList({
  userSearchStore: {
    userSearchResults: { items },
  },
}: UserSearchResultsListProps) {
  return (
    <ul>
      {items.map(({ login, id: key, avatar_url: avatarUrl, url }) => (
        <li
          {...{
            key,
          }}
        >
          <a
            {...{
              href: url,
            }}
          >
            {login}
            <img
              {...{
                src: avatarUrl,
                alt: login,
              }}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
