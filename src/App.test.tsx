import { render, unmountComponentAtNode, } from 'react-dom'
import { App } from './App'
import { getStore } from './stores/rootStore'

it('renders without crashing', () => {
  const rootStore = getStore()
  const div = document.createElement('div')
  render(<App {...rootStore} />, div)
  unmountComponentAtNode(div)
})
