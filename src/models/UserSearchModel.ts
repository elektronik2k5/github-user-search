import { types, flow, Instance } from 'mobx-state-tree'
import {
  UserSearchResultsModel,
  UserSearchResultsSnapshotOut,
  UserSearchResultsSnapshotIn,
} from './UserSearchResultsModel'

const EMPTY_QUERY = ''
const GITHUB_USER_SEARCH_API_ENDPOINT_URL = 'https://api.github.com/search/users'

export const UserSearchModel = types
  .model('UserSearchModel', {
    userInputQuery: types.optional(types.string, EMPTY_QUERY),
    userSearchResults: UserSearchResultsModel,
  })
  .views((self) => ({
    get hasQuery() {
      return self.userInputQuery !== EMPTY_QUERY
    },
  }))
  .actions((self) => ({
    fetchAndAssignSearchResults: flow(function* fetchSearchResults() {
      let userSearchResults: UserSearchResultsSnapshotIn = {}
      if (self.hasQuery) {
        const userSearchResultsResponse = yield window.fetch(
          `${GITHUB_USER_SEARCH_API_ENDPOINT_URL}?q=${self.userInputQuery}`,
        )
        userSearchResults = yield userSearchResultsResponse.json() as UserSearchResultsSnapshotOut
      }
      return Object.assign(self, { userSearchResults })
    }),
  }))
  .actions((self) => ({
    setUserInputQuery(userInputQuery: string) {
      Object.assign(self, { userInputQuery })
      return self.fetchAndAssignSearchResults()
    },
  }))

export type UserSearchModelType = Instance<typeof UserSearchModel>
