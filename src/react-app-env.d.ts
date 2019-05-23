/// <reference types="react-scripts" />

type ReactChildren = React.ReactNode | React.ReactNodeArray

interface WithChildren {
  children: ReactChildren
}
