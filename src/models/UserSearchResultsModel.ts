import { types, SnapshotIn, Instance, SnapshotOut } from 'mobx-state-tree'
import { UserModel } from './UserModel'

const UserSearchResultModel = UserModel.named('UserSearchResultModel').props({
  score: types.number, // 105.47857
})

export const UserSearchResultsModel = types.model('UserSearchResultsModel', {
  total_count: types.optional(types.number, 0),
  incomplete_results: types.optional(types.boolean, false),
  items: types.array(UserSearchResultModel),
})

type UserSearchResultsModelT = typeof UserSearchResultsModel
export interface UserSearchResultsModelType extends Instance<UserSearchResultsModelT> {}
export interface UserSearchResultsSnapshotIn extends SnapshotIn<UserSearchResultsModelT> {}
export interface UserSearchResultsSnapshotOut extends SnapshotOut<UserSearchResultsModelT> {}
