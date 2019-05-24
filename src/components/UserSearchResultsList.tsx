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
  display: flex;
  align-items: center;
  break-inside: avoid;
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
  display: inline-flex;
`
const UserSearchResultApiLink = styled(UserSearchResultLink)`
  font-size: 0.7em;
  margin-left: 0.3em;
  text-decoration: none;
  ::before {
    content: '(';
  }
  ::after {
    content: ')';
  }
`

const UserDetails = styled.details`
  width: 100%;
  padding: 0.5em;
  &[open] {
    background-color: lightblue;
  }
`

const StyledSummary = styled.summary`
  display: flex;
  align-items: center;
  height: 2.5rem;
  :hover {
    background-color: lightgreen;
  }
`

const GitHubCardWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const UserSearchResultItem = observer(({ login, avatar_url: avatarUrl, url, html_url, id, ...rest }) => (
  <UserSearchResultListItem {...rest}>
    <UserDetails
      {...{
        // @ts-ignore
        onToggle({ target }) {
          if (target.open) {
            // https://github.com/lepture/github-cards/blob/fca0b972f2398a84d17782d6dc9927b842c996d6/src/widget.js#L52
            const maybeGitHubCardPlaceholder = target.querySelector('.github-card')
            if (maybeGitHubCardPlaceholder) {
              // @ts-ignore
              window.githubCard.render(maybeGitHubCardPlaceholder)
            }
          }
        },
      }}
    >
      <StyledSummary>
        <UserSearchResultLink {...{ href: html_url }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text, this-is-a-false-positive */}
          <UserAvatarImage {...{ src: avatarUrl, alt: login }} />
          <Username {...{ children: login }} />
        </UserSearchResultLink>
        <UserSearchResultApiLink {...{ href: url, children: 'API' }} />
      </StyledSummary>
      <GitHubCardWrapper>
        <div {...{ className: 'github-card', 'data-github': login }} />
      </GitHubCardWrapper>
    </UserDetails>
  </UserSearchResultListItem>
))

const UserSearchResultsOrderedList = styled.ol`
  padding: 0 1em;
  column-gap: 1em;
  list-style: none;
  font-size: 1.4rem;
  column-count: 2;
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
