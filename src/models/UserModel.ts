import { types, SnapshotIn, Instance, SnapshotOut } from 'mobx-state-tree'

export const UserModel = types.model('UserModel', {
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
})

type UserModelT = typeof UserModel
export interface UserModelInstance extends Instance<UserModelT> {}
export interface UserModelSnapshotIn extends SnapshotIn<UserModelT> {}
export interface UserModelSnapshotOut extends SnapshotOut<UserModelT> {}
