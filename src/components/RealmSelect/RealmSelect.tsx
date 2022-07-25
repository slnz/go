import CloseIcon from '@mui/icons-material/Close'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Tab,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { first, xor } from 'lodash'
import {
  forwardRef,
  ReactElement,
  Ref,
  SyntheticEvent,
  useEffect,
  useState
} from 'react'
import { useQuery } from 'react-query'

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

export interface RealmSelectProps {
  params?: GetRealmSelectableParams
  onChange: (ids: string[]) => void
  value: string[]
}

export function RealmSelect({
  params,
  onChange,
  value
}: RealmSelectProps): ReactElement {
  const { data } = useQuery(
    params ? ['realmSelectable', params] : 'realmSelectable',
    getRealmSelectable(params)
  )
  const [tab, setTab] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(value)

  function handleNodeSelect(_event: SyntheticEvent, nodeIds: string[]): void {
    setSelected(xor(selected, nodeIds))
  }

  function handleSave(): void {
    onChange(selected)
    setOpen(false)
  }

  function handleClose(): void {
    setSelected(value)
    setOpen(false)
  }

  useEffect(() => {
    if (data) setTab(first(data)?.definition ?? '')
  }, [data])

  const handleOpen = (): void => setOpen(true)
  const handleTabChange = (_event: SyntheticEvent, newTab: string): void => {
    setTab(newTab)
  }

  return (
    <>
      <RealmSelectSelect onClick={handleOpen} value={value} data={data} />
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
            <Button autoFocus color="inherit" onClick={handleSave}>
              Save
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
