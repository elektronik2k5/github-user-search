import { types, flow, Instance } from 'mobx-state-tree'
import {
  UserSearchResultsModel,
  UserSearchResultsSnapshotOut,
  UserSearchResultsSnapshotIn,
} from './UserSearchResultsModel'

interface GetUrlWithParams {
  url: string
  searchParams: { [k: string]: number | string }
}
function getUrlWithParams({ url, searchParams }: GetUrlWithParams) {
  const fullUrl = new URL(url)
  Object.entries(searchParams).forEach(([paramKey, paramValue]) =>
    fullUrl.searchParams.set(paramKey, paramValue.toString()),
  )
  return fullUrl.toString()
}

const EMPTY_QUERY = ''
const GITHUB_USER_SEARCH_API_ENDPOINT_URL = 'https://api.github.com/search/users'
const GITHUB_API_RESULTS_PER_PAGE = 30
const GITHUB_API_FIRST_RESULTS_PAGE = 1 // https://developer.github.com/v3/#pagination

export const UserSearchModel = types
  .model('UserSearchModel', {
    userSearchResultsPage: types.optional(types.number, GITHUB_API_FIRST_RESULTS_PAGE),
    userInputQuery: types.optional(types.string, EMPTY_QUERY),
    userSearchResults: UserSearchResultsModel,
  })
  .views((self) => ({
    get hasQuery() {
      return self.userInputQuery !== EMPTY_QUERY
    },
    get userSearchEndpointUrl() {
      return getUrlWithParams({
        url: GITHUB_USER_SEARCH_API_ENDPOINT_URL,
        searchParams: {
          q: self.userInputQuery,
          page: self.userSearchResultsPage,
          per_page: GITHUB_API_RESULTS_PER_PAGE,
        },
      })
    },
    get userSearchResultsPages() {
      return Math.ceil(self.userSearchResults.total_count / GITHUB_API_RESULTS_PER_PAGE)
    },
  }))
  .views((self) => ({
    get hasNextPage() {
      return self.hasQuery && self.userSearchResultsPage < self.userSearchResultsPages
    },
    get hasPreviousPage() {
      return self.hasQuery && self.userSearchResultsPage > GITHUB_API_FIRST_RESULTS_PAGE
    },
  }))
  .actions((self) => ({
    // @ts-ignore
    fetchAndAssignSearchResults: flow(function* fetchSearchResults() {
      let userSearchResults: UserSearchResultsSnapshotIn = {}
      if (self.hasQuery) {
        const userSearchResultsResponse = yield window.fetch(self.userSearchEndpointUrl)
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
    fetchNextPage() {
      if (self.hasNextPage) {
        self.userSearchResultsPage++
        self.fetchAndAssignSearchResults()
      }
    },
    fetchPreviousPage() {
      if (self.hasPreviousPage) {
        self.userSearchResultsPage--
        self.fetchAndAssignSearchResults()
      }
    },
  }))

export type UserSearchModelType = Instance<typeof UserSearchModel>
