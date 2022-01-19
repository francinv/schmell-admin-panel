import React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { CARD_TEXT } from "../../styles/Typography";
import { setLogOut } from "../../../features/user/userSlice";
import { useAppDispatch } from "../../../features/hooks";

const actionDispatch = (dispatch) => ({
    logOut: () => dispatch(setLogOut()),
})

export const ProfileAvatar = ({user}) => {
    const {logOut} = actionDispatch(useAppDispatch());

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box
            sx={{
                display:'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 'auto',
            }}
        >
            <Typography
                sx={{
                    fontFamily:'Quicksand',
                    fontSize: 14,
                    marginRight: '0.5rem',
                }}
            >
                {user.first_name} {user.last_name}
            </Typography>
            <IconButton
                onClick={handleOpenUserMenu}
            >
                <Avatar
                    alt={user.username}
                    src={user.profile_picture}
                    sx= {{
                        width: 44,
                        height: 44,
                        cursor: 'pointer',
                    }}  
                />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={logOut}>
                  <CARD_TEXT textAlign="center">Logg ut</CARD_TEXT>
                </MenuItem>
            </Menu>
        </Box>
    )
}