import CheckIcon from '@mui/icons-material/Check'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  MultiSelectTreeViewProps,
  TreeItem,
  treeItemClasses,
  TreeView
} from '@mui/lab'
import { flatMapDeep, map } from 'lodash'
import { ReactElement, useMemo } from 'react'

import { Realm } from '../../../lib/queries/getRealmSelectable/getRealmSelectable'

export interface RealmSelectTreeViewProps {
  realms: Realm[]
  selected: string[]
  onNodeSelect: MultiSelectTreeViewProps['onNodeSelect']
}

export function RealmSelectTreeView({
  realms,
  selected,
  onNodeSelect
}: RealmSelectTreeViewProps): ReactElement {
  const expanded = useMemo(() => {
    function getMembers(member: Realm): Realm | (Realm | Realm[])[] {
      if (!member.children || !member.children.length) {
        return member
      }
      return [member, flatMapDeep(member.children, getMembers)]
    }

    return map(flatMapDeep(realms, getMembers), '_id')
  }, [realms])

  function renderRealm({ _id, title, children }: Realm): ReactElement {
    return (
      <TreeItem
        key={_id}
        nodeId={_id}
        label={title}
        icon={<CheckIcon />}
        sx={{
          [`& .${treeItemClasses.content}`]: {
            [`& .${treeItemClasses.iconContainer}`]: {
              opacity: 0
            },
            [`&.${treeItemClasses.selected} .${treeItemClasses.iconContainer}`]:
              {
                opacity: 1
              },
            [`& .${treeItemClasses.label}`]: {
              lineHeight: 2.8
            }
          }
        }}
      >
        {children.map((node) => renderRealm(node))}
      </TreeItem>
    )
  }

  return (
    <TreeView
      defaultExpanded={['root']}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selected}
      expanded={expanded}
      onNodeSelect={onNodeSelect}
      multiSelect
    >
      {realms.map((realm) => renderRealm(realm))}
    </TreeView>
  )
}
