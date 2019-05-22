import { types, flow } from 'mobx-state-tree'
import { UserSearchResultsModel } from './UserSearchResultsModel'

export const UserSearchModel = types
  .model('UserSearchModel', {
    userInputQuery: types.optional(types.string, ''),
    userSearchResults: UserSearchResultsModel,
  })
  .actions((self) => ({
    setUserInputQuery: flow(function* setUserInputQueryAndFetchResults(userInputQuery: string) {
      const userSearchResultsResponse = yield window.fetch(`https://api.github.com/search/users?q=${userInputQuery}`)
      const userSearchResults = yield userSearchResultsResponse.json()
      Object.assign(self, { userInputQuery, userSearchResults })
    }),
  }))
