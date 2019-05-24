import React from 'react'
import { Link } from './Link'
import { WithUserSearchStore } from '../stores/RootModel'
import { observer } from 'mobx-react'
import styled from '@emotion/styled'

const StyledSearchResultsHeader = styled.header`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
`
const SearchResultsHeader = observer(({ searchResultsCount }: { searchResultsCount: number }) => (
  <StyledSearchResultsHeader
    {...{ children: searchResultsCount > 0 ? `Found ${searchResultsCount} user(s)` : 'No results yet' }}
  />
))

const UserSearchResultListItem = styled.li`
  :not(:last-child) {
    margin-bottom: 0.5em;
  }
`
const UserAvatarImage = Object.assign(
  styled.img`
    width: 2rem;
    height: 2rem;
  `,
  { defaultProps: { loading: 'lazy', decoding: 'async' } },
)
const Username = styled.span`
  margin-left: 0.3em;
`

const UserSearchResultLink = styled(Link)`
  display: flex;
`

const UserSearchResultItem = observer(({ login, avatar_url: avatarUrl, html_url: href, id, ...rest }) => (
  <UserSearchResultListItem {...rest}>
    <UserSearchResultLink {...{ href }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text, this-is-a-false-positive */}
      <UserAvatarImage {...{ src: avatarUrl, alt: login }} />
      <Username {...{ children: login }} />
    </UserSearchResultLink>
  </UserSearchResultListItem>
))

const UserSearchResultsOrderedList = styled.ol`
  padding: 0 1em;
  column-gap: 1em;
  list-style: none;
  font-size: 1.4rem;
  column-count: 3;
  @media (min-width: 480px) and (max-width: 767px) {
    column-count: 2;
  }
  @media (max-width: 479px) {
    column-count: 1;
  }
`

const SearchResultsPager = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = Object.assign(styled.button``, { defaultProps: { type: 'button', onClick: console.info } })

interface MaybePagerTextProps {
  currentPage: number
  totalPages: number
  isDisplayed: boolean
}
const MaybePagerText = observer(({ currentPage, totalPages, isDisplayed }: MaybePagerTextProps) => (
  <span {...{ children: isDisplayed ? `Page ${currentPage} of ${totalPages}` : 'No results :(' }} />
))

interface UserSearchResultsListProps extends WithUserSearchStore {}
export const UserSearchResultsList = observer(
  ({
    userSearchStore: {
      userSearchResultsPages,
      userSearchResultsPage,
      userSearchResults: { items, total_count },
      hasPreviousPage,
      hasNextPage,
      hasQuery,
      fetchPreviousPage,
      fetchNextPage,
    },
  }: UserSearchResultsListProps) => {
    return (
      <>
        <SearchResultsHeader {...{ searchResultsCount: total_count }} />
        <UserSearchResultsOrderedList>
          {items.map((userSearchResult) => (
            <UserSearchResultItem {...{ ...userSearchResult, key: userSearchResult.id }} />
          ))}
        </UserSearchResultsOrderedList>
        <SearchResultsPager>
          <Button {...{ children: 'Previous page', disabled: !hasPreviousPage, onClick: fetchPreviousPage }} />
          <MaybePagerText
            {...{ currentPage: userSearchResultsPage, totalPages: userSearchResultsPages, isDisplayed: hasQuery }}
          />
          <Button {...{ children: 'Next page', disabled: !hasNextPage, onClick: fetchNextPage }} />
        </SearchResultsPager>
      </>
    )
  },
)
