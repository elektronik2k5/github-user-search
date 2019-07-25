import { types, SnapshotIn, Instance } from 'mobx-state-tree'
import { UserSearchModel } from '../models/UserSearchModel'
import { KnownUsersModel } from '../models/KnownUsersModel'

const KNOWN_USER_IDS = [1078554]

export const RootModel = types
  .model('RootModel', {
    userSearchStore: UserSearchModel,
    knownUsersStore: KnownUsersModel,
  })
  .volatile((self) => ({
    KNOWN_USER_IDS,
  }))

export type RootModelType = Instance<typeof RootModel>
export type RootModelSnapshotIn = SnapshotIn<typeof RootModel>

const rootStoreInitialSnapshot: RootModelSnapshotIn = {
  userSearchStore: {
    userSearchResults: {},
  },
  knownUsersStore: KNOWN_USER_IDS,
}

export function createRootModel(rootModelSnapshot: RootModelSnapshotIn = rootStoreInitialSnapshot) {
  const rootModel = RootModel.create(rootModelSnapshot)
  return rootModel
}

export interface WithRootStore {
  store: RootModelType
}

export type WithUserSearchStore = Pick<RootModelType, 'userSearchStore'>
