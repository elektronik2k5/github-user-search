import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { WithUserSearchStore } from '../stores/RootModel'
import { useDebouncedCallback } from 'use-debounce'
import styled from '@emotion/styled'

interface DebouncedInputProps extends Partial<WithOnChange> {
  defaultValue: string
  debounceByMs?: number
  onDebouncedChange: (v: string) => void
}
function DebouncedInput({
  defaultValue,
  onChange,
  debounceByMs = 400,
  onDebouncedChange,
  ...rest
}: DebouncedInputProps) {
  const [, setValue] = useState(defaultValue)
  const setValueAndCallDebouncedHandler = (debouncedValue: typeof defaultValue) => {
    setValue(debouncedValue)
    onDebouncedChange(debouncedValue)
  }
  const [debouncedFunction] = useDebouncedCallback(setValueAndCallDebouncedHandler, debounceByMs)

  return (
    <input
      {...{
        defaultValue,
        onChange(e) {
          debouncedFunction(e.target.value)
          onChange && onChange(e)
        },
        ...rest,
      }}
    />
  )
}

const UserSearchStyledForm = styled.form`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  @media (max-width: 319px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
    margin: 1em auto;
  }
`

export const UserSearchForm = observer(({ userSearchStore, ...rest }: WithUserSearchStore) => (
  <UserSearchStyledForm
    {...{
      onSubmit(e) {
        e.preventDefault()
        userSearchStore.fetchAndAssignSearchResults()
      },
      ...rest,
    }}
  >
    <DebouncedInput
      {...{
        type: 'search',
        placeholder: 'Enter username',
        defaultValue: userSearchStore.userInputQuery,
        onDebouncedChange: userSearchStore.setUserInputQuery,
      }}
    />
    <button
      {...{
        type: 'submit',
        children: 'Search users',
      }}
    />
  </UserSearchStyledForm>
))
