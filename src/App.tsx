import React from 'react'
import { Global as GlobalCss, css } from '@emotion/core'
import { normalize } from 'polished'
import { WithRootStore } from './stores/RootModel'
import { observer } from 'mobx-react'

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
        <h1>
          GitHub
          <a rel="noopener noreferrer" href="https://developer.github.com/v3/search/#search-users">
            user search
          </a>
          (limited to
          <a rel="noopener noreferrer" href="https://developer.github.com/v3/search/#rate-limit">
            10 requests per minute
          </a>
          )
        </h1>
        <form>
          <input
            {...{
              type: 'search',
              placeholder: 'Search GitHub users',
              autoFocus: true,
              value: userSearchStore.userInputQuery,
              onChange(e) {
                userSearchStore.setUserInputQuery(e.currentTarget.value)
              },
            }}
          />
          <button {...{ type: 'submit', children: 'Search users' }} />
        </form>
      </header>
      <ul>
        {userSearchStore.userSearchResults.items.map(({ login, id: key, avatar_url: avatarUrl, url }) => (
          <li {...{ key }}>
            <a {...{ href: url }}>
              {login}
              <img {...{ src: avatarUrl, alt: login }} />
            </a>
          </li>
        ))}
      </ul>
    </main>
  </>
))
