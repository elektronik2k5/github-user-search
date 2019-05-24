import { UserSearchForm } from './components/UserSearchForm'
import React from 'react'
import { Global as GlobalCss, css } from '@emotion/core'
import { normalize } from 'polished'
import { WithRootStore } from './stores/RootModel'
import { observer } from 'mobx-react'
import { MainTitle } from './components/MainTitle'
import { UserSearchResultsList } from './components/UserSearchResultsList'

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

export const App = observer(({ store: { userSearchStore } }: WithRootStore) => (
  <>
    <GlobalCss {...{ styles: globalCssNormalize }} />
    <main>
      <header>
        <MainTitle />
        <UserSearchForm {...{ userSearchStore }} />
      </header>
      <UserSearchResultsList {...{ userSearchStore }} />
    </main>
  </>
))
