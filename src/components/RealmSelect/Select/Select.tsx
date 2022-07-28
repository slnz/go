import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextFieldProps
} from '@mui/material'
import { filter, flatMapDeep, flatMap } from 'lodash'
import { ReactElement, SyntheticEvent, useMemo } from 'react'

import { Realm } from '../../../lib/queries/getRealmSelectable/getRealmSelectable'

export interface RealmSelectSelectProps
  extends Pick<TextFieldProps, 'error' | 'helperText'> {
  onClick: () => void
  value: string[]
  data?: { realms: Realm[] }[]
}

export function RealmSelectSelect({
  onClick,
  value,
  data,
  helperText,
  error
}: RealmSelectSelectProps): ReactElement {
  function handleOpen(event: SyntheticEvent): void {
    event.preventDefault()
    onClick()
  }

  const realms = useMemo(() => {
    if (data === undefined) return

    function getMembers(member: Realm): Realm | (Realm | Realm[])[] {
      if (!member.children || !member.children.length) {
        return member
      }
      return [member, flatMapDeep(member.children, getMembers)]
    }
    const realms = flatMapDeep(
      flatMap(data, ({ realms }) => realms),
      getMembers
    )
    return filter(realms, ({ _id }) => value.includes(_id))
  }, [data, value])

  return (
    <FormControl fullWidth>
      <InputLabel id="select-realm-label" error={error}>
        Realm
      </InputLabel>
      <Select
        id="select-realm"
        labelId="select-realm-label"
        label="Realm"
        onOpen={handleOpen}
        open={false}
        value={value}
        multiple
        error={error}
      >
        {realms?.map((realm) => (
          <MenuItem value={realm._id} key={realm._id}>
            {realm.title}
          </MenuItem>
        ))}
      </Select>
      {helperText != null && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
