import { types, SnapshotIn, Instance } from 'mobx-state-tree'
import { UserSearchModel } from '../models/UserSearchModel'

export const RootModel = types.model('RootModel', {
  userSearchStore: UserSearchModel,
})

export type RootModelType = Instance<typeof RootModel>
export type RootModelSnapshotIn = SnapshotIn<typeof RootModel>

const rootStoreInitialSnapshot: RootModelSnapshotIn = {
  userSearchStore: {
    userSearchResults: {},
  },
}

export function createRootModel(rootModelSnapshot: RootModelSnapshotIn = rootStoreInitialSnapshot) {
  return RootModel.create(rootModelSnapshot)
}

export interface WithRootStore {
  store: RootModelType
}
