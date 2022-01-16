import React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { CARD_TEXT } from "../../styles/Typography";
import { logOut } from "../../../features/user/userSlice";
import { useAppDispatch } from "../../../features/hooks";

const actionDispatch = (dispatch) => ({
    logOut: () => dispatch(logOut()),
})

export const ProfileAvatar = ({user}) => {
    const {logOut} = actionDispatch(useAppDispatch());

    //TODO - update this with logged in User

    const name = "Francin Vincent"
    const img_src = "http://127.0.0.1:8000/media/profile-pictures/016C1748-8E59-41EE-A0F4-9AFE1EF4474E.jpg"

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
                {name}
            </Typography>
            <IconButton
                onClick={handleOpenUserMenu}
            >
                <Avatar
                    alt={name}
                    src={img_src}
                    sx= {{
                        width: 44,
                        height: 44,
                        cursor: 'pointer',
                        // '&:hover': {
                        //     opacity: 0.5,
                        // }
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