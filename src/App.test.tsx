import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { getStore } from './stores/rootStore'

it('renders without crashing', () => {
  const rootStore = getStore()
  const div = document.createElement('div')
  ReactDOM.render(<App {...rootStore} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
