import { types, Instance, SnapshotOut } from 'mobx-state-tree'
import { UserModel } from './UserModel'

export const KnownUsersModel = types.array(types.safeReference(UserModel))

type KnownUsersModelT = typeof KnownUsersModel
export interface KnownUsersModelInstance extends Instance<KnownUsersModelT> {}
// export interface KnownUsersModelSnapshotIn extends SnapshotIn<KnownUsersModelT> {}
export interface KnownUsersModelSnapshotOut extends SnapshotOut<KnownUsersModelT> {}
