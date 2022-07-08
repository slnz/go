import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  ListItemIcon
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { ReactElement, useState, MouseEvent } from 'react'

import { useAuth } from '../../lib/useAuth'

const Search = styled('div')(({ theme }) => ({
  flexGrow: 1,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

interface Props {
  onChange?: (value: string) => void
}

export function PeopleMenuBar({ onChange }: Props): ReactElement {
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent): void => {
    setAnchorEl(event.currentTarget as Element)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Stack
            component="form"
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search in Go"
                inputProps={{ 'aria-label': 'Search' }}
                onChange={(event): void => onChange?.(event.target.value)}
              />
            </Search>
            <Box>
              <IconButton
                sx={{ mx: '-8px' }}
                onClick={handleClick}
                aria-label="Menu"
              >
                <Avatar
                  alt={user?.name}
                  sx={{ width: 32, height: 32 }}
                  src={`https://api.fluro.io/get/avatar/user/${user?._id}?w=32&h=32`}
                >
                  {user?.firstName.charAt(0)}
                </Avatar>
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
