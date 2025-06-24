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
            
            <Box component="div" sx={{ p: 1, paddingTop: 5, paddingRight: 5}}>
                <Stack direction="row" spacing={3} sx={{ justifyContent: "flex-end" }}>
                    <Button variant="outlined" startIcon={<HiFilter/>} sx={{ color: "#033028", border: "none"}}>
                        Filtrar
                    </Button>
                    <Button variant="outlined" startIcon={<FaArrowDown />} sx={{color: "#033028", border: "1px solid #033028" }}>
                        Ordenar
                    </Button>
                </Stack>
            </Box>
        </>
    );
}