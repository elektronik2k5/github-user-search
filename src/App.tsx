import { UserSearchForm } from './components/UserSearchForm'
import React from 'react'
import { Global as GlobalCss, css } from '@emotion/core'
import { normalize } from 'polished'
import { WithRootStore } from './stores/RootModel'
import { observer } from 'mobx-react'
import { MainTitle } from './components/MainTitle'
import { UserSearchResultsList } from './components/UserSearchResultsList'
import styled from '@emotion/styled'
import { UserModelInstance } from './models/UserModel'

const globalCssNormalize = css`
  ${normalize()};
  html {
    touch-action: manipulation;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }
  body,
  #root {
    background-color: inherit;
  }
  * {
    box-sizing: border-box;
    ::before,
    ::after {
      box-sizing: inherit;
    }
  }
`

const Main = styled.main`
  margin: 1em;
  @media (min-width: 1024px) {
    max-width: 60vw;
    margin-right: auto;
    margin-left: auto;
  }
`

export const App = observer(({ store: { userSearchStore, knownUsersStore, KNOWN_USER_IDS } }: WithRootStore) => (
  <>
    <GlobalCss {...{ styles: globalCssNormalize }} />
    <Main>
      <header>
        <MainTitle />
        <UserSearchForm {...{ userSearchStore }} />
      </header>
      <aside>
        <h2>Known userIds:</h2>
        <ul>
          {KNOWN_USER_IDS.map((id) => (
            <li {...{ key: id, children: id }} />
          ))}
        </ul>
        <h2>Known users:</h2>
        <ul>
          {knownUsersStore.map(
            (user?: UserModelInstance) => user && <li {...{ key: user.id, children: user.login }} />,
          )}
        </ul>
      </aside>
      <UserSearchResultsList {...{ userSearchStore }} />
    </Main>
  </>
))
