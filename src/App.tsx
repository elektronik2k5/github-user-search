import React from 'react'

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          GitHub{' '}
          <a rel="noopener noreferrer" href="https://developer.github.com/v3/search/#search-users">
            user search
          </a>{' '}
          (limited to{' '}
          <a rel="noopener noreferrer" href="https://developer.github.com/v3/search/#rate-limit">
            10 requests per minute
          </a>
          )
        </h1>
        <form>
          <input {...{ type: 'search', placeholder: 'Search GitHub users', autoFocus: true }} />
          <button {...{ type: 'submit', children: 'Search users' }} />
        </form>
      </header>
    </div>
  )
}
