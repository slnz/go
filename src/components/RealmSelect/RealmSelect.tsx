import CloseIcon from '@mui/icons-material/Close'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Slide,
  Tab,
  TextFieldProps,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useQuery } from '@tanstack/react-query'
import { first, xor } from 'lodash'
import {
  forwardRef,
  ReactElement,
  Ref,
  SyntheticEvent,
  useEffect,
  useState
} from 'react'

import { getRealmSelectable } from '../../lib/queries/getRealmSelectable'
import { GetRealmSelectableParams } from '../../lib/queries/getRealmSelectable/getRealmSelectable'

import { RealmSelectSelect } from './Select'
import { RealmSelectTreeView } from './TreeView'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface RealmSelectProps
  extends Pick<TextFieldProps, 'error' | 'helperText'> {
  /** params provided to the Fluro API to filter the displayed realms */
  params?: GetRealmSelectableParams
  /** a callback called when the user saves their selection of realms */
  onChange: (ids: string[]) => void
  /** a callback called when the user saves or closes the realms dialog */
  onBlur?: () => void
  /** an array of realmIds to render as selected */
  value: string[]
}

export function RealmSelect({
  params,
  onChange,
  onBlur,
  value,
  error,
  helperText
}: RealmSelectProps): ReactElement {
  const { data, isLoading } = useQuery(
    params ? ['realmSelectable', params] : ['realmSelectable'],
    getRealmSelectable(params)
  )
  const [tab, setTab] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(value)

  function handleNodeSelect(_event: SyntheticEvent, nodeIds: string[]): void {
    setSelected(xor(selected, nodeIds))
  }

  function handleSelect(): void {
    onChange(selected)
    setOpen(false)
  }

  function handleClose(): void {
    setSelected(value)
    onBlur?.()
    setOpen(false)
  }

  useEffect(() => {
    if (data) setTab(first(data)?.definition ?? '')
  }, [data])

  const handleOpen = (): void => setOpen(true)
  const handleTabChange = (_event: SyntheticEvent, newTab: string): void => {
    setTab(newTab)
  }

  return isLoading ? (
    <FormControl fullWidth>
      <InputLabel id="select-realm-label" error={error}>
        Realm
      </InputLabel>
      <Select
        id="select-realm"
        labelId="select-realm-label"
        label="Realm"
        value="loading"
        disabled
        error={error}
      >
        <MenuItem value="loading">
          <Skeleton width="80%" />
        </MenuItem>
      </Select>
      {helperText != null && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  ) : (
    <>
      <RealmSelectSelect
        onClick={handleOpen}
        value={value}
        data={data}
        helperText={helperText}
        error={error}
      />

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Realms
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSelect}>
              Select
            </Button>
          </Toolbar>
        </AppBar>
        <TabContext value={tab}>
          <TabList
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {data?.map(({ plural, definition }) => (
              <Tab label={plural} value={definition} key={definition} />
            ))}
          </TabList>
          {data?.map(({ definition, realms }) => (
            <TabPanel
              value={definition}
              key={definition}
              sx={{ p: 0, flex: 1, overflow: 'auto' }}
            >
              <RealmSelectTreeView
                realms={realms}
                selected={selected}
                onNodeSelect={handleNodeSelect}
              />
            </TabPanel>
          ))}
        </TabContext>
      </Dialog>
    </>
  )
}
