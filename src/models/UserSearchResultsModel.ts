import { types, SnapshotIn, Instance, SnapshotOut } from 'mobx-state-tree'

const UserSearchResultModel = types.model('UserSearchResultModel', {
  login: types.string, // "mojombo"
  id: types.identifierNumber, // 1
  // "node_id": "MDQ6VXNlcjE=",
  avatar_url: types.string, // "https://..."
  // "gravatar_id": "",
  url: types.string, // "https://api.github.com/users/mojombo",
  html_url: types.string, // "https://github.com/mojombo",
  followers_url: types.string, // "https://api.github.com/users/mojombo/followers",
  subscriptions_url: types.string, // "https://api.github.com/users/mojombo/subscriptions",
  organizations_url: types.string, // "https://api.github.com/users/mojombo/orgs",
  repos_url: types.string, // "https://api.github.com/users/mojombo/repos",
  // "received_events_url": "https://api.github.com/users/mojombo/received_events",
  // "type": "User",
  score: types.number, // 105.47857
})

type UserSearchResultModelT = typeof UserSearchResultModel
export type UserSearchResultModelType = Instance<UserSearchResultModelT>

export const UserSearchResultsModel = types.model('UserSearchResultsModel', {
  total_count: types.optional(types.number, 0),
  incomplete_results: types.optional(types.boolean, false),
  items: types.array(UserSearchResultModel),
})

type UserSearchResultsModelT = typeof UserSearchResultsModel
export type UserSearchResultsModelType = Instance<UserSearchResultsModelT>
export type UserSearchResultsSnapshotIn = SnapshotIn<UserSearchResultsModelT>
export type UserSearchResultsSnapshotOut = SnapshotOut<UserSearchResultsModelT>
