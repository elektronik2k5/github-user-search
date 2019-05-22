import { RootModelType, createRootModel, WithRootStore } from './RootModel'

let rootStore: RootModelType | null = null

function createRootStore(): RootModelType {
  rootStore = createRootModel()
  Object.assign(window, { rootStore })
  return rootStore
}

const getRootStore = (): RootModelType => rootStore || createRootStore()

export const getStore = (): WithRootStore => ({
  store: getRootStore(),
})
