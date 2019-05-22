import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { getStore } from './stores/rootStore'

function renderApp(rootElement: HTMLElement | null) {
  if (!rootElement) {
    throw Error('No root element')
  }
  const rootStore = getStore()
  render(
    <StrictMode>
      <App {...rootStore} />
    </StrictMode>,
    document.getElementById('root'),
  )
}

renderApp(document.getElementById('root'))
