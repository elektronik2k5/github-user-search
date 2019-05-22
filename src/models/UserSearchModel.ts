import { types } from 'mobx-state-tree'
import { UserSearchResultModel } from './UserSearchResultModel'

export const UserSearchModel = types
  .model('UserSearchModel', {
    userInputQuery: types.optional(types.string, ''),
    searchResults: types.array(UserSearchResultModel),
  })
  .actions((self) => ({
    setUserInputQuery(userInputQuery: string) {
      return Object.assign(self, { userInputQuery })
    },
  }))
