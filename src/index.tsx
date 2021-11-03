import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { getStore } from './stores/rootStore'
import ServiceBell from '@servicebell/widget'

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
  ServiceBell.init('4431fbab7414459c94726cad5962facf')
}

renderApp(document.getElementById('root'))
