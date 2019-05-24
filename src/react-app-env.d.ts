/// <reference types="react-scripts" />

type ReactChildren = React.ReactNode | React.ReactNodeArray

interface WithChildren {
  children: ReactChildren
}

type FieldSetElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

type HTMLInputEvent = React.FormEvent<FieldSetElement>

interface WithOnChange {
  onChange: (event: HTMLInputEvent) => void
}
