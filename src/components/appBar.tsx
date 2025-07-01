import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { TbMessageCircleFilled } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { HiFilter } from "react-icons/hi";
import { FaArrowDown } from "react-icons/fa6";
import { Box, Stack } from "@mui/system";

export default function AppBarComponent(){
    return(
        <>
            <AppBar position="static" sx={{ bgcolor: "white", color: "black", boxShadow: "none", borderBottom: "1px solid #e0e0e0" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 2, padding: "10px" }}>
                        Buscar Proyectos
                    </Typography>
                    <IconButton>
                        <TbMessageCircleFilled size={24} color="black" />
                    </IconButton>
                    <IconButton>
                        <IoMdNotifications size={24} color="black" />
                    </IconButton>
                    <Avatar variant="square" alt="Perfil" src="" sx={{ width: 38, height: 38, marginLeft: 2 }} />
                </Toolbar>
            </AppBar>
        </>
    );
}