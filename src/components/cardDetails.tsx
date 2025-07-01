import { Avatar, Button } from "@mui/material";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function CardDetails() {
    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px", width: "90vw", backgroundColor: "#EDF7F6", padding: "5px 8px 5px 8px", borderRadius: "4px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <MdKeyboardArrowLeft style={{ fontSize: "16px", color: "#033028", cursor: "pointer" }} />
                    <label style={{ fontSize: "12px", fontWeight: "400", color: "#033028", padding: "5px" }}>
                        Atrás
                    </label>
                </div>
                <label style={{ fontSize: "12px", fontWeight: "400", color: "#555E5C"}}>Buscador de proyectos</label>
                <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <label style={{ fontSize: "12px", fontWeight: "400", color: "#555E5C", padding: "5px" }}>/</label>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#181B1A", padding: "5px" }}>Titulo</label>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "90vw", backgroundColor: "#033028", margin: "20px 0 ", borderRadius: "4px"}}>
                <label style={{ fontSize: "24px", fontWeight: "700", color: "#FFFFFF", padding: "20px 0", display: "block", marginLeft: "2rem" }}>
                    Titulo del Proyecto
                </label>
                <label style={{ fontSize: "16px", fontWeight: "400", color: "#FFFFFF", padding: "5px 0", display: "block", marginLeft: "2rem" }}>Especialidad</label>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px", padding: "10px 0 20px", marginLeft: "2rem" }}>
                    <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A", padding: "5px 8px 5px 8px", backgroundColor: "#F4F5F5", borderRadius: "4px" }}>
                        Habilidad 1
                    </label>
                    <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A", padding: "5px 8px 5px 8px", backgroundColor: "#F4F5F5", borderRadius: "4px" }}>
                        Habilidad 2
                    </label>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "90vw", backgroundColor: "#FFFFFF", padding: "20px 0", borderRadius: "4px", gap: "30px" }}>
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Descripción del proyecto
                    </label>
                    <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </label>
                </div>
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        ¿Cuáles son los objetivos y tareas a realizar?
                    </label>
                    <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </label>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "90vw", backgroundColor: "#FFFFFF", padding: "40px 0", borderRadius: "4px", gap: "30px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Preguntas frecuentes
                    </label>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "4px", alignItems: "center", cursor: "pointer", justifyContent: "space-between"}}>
                        <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </label>
                        <MdKeyboardArrowDown style={{ fontSize: "16px", color: "#033028", alignItems: "end", justifyContent: "end" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "4px", alignItems: "center", cursor: "pointer", justifyContent: "space-between"}}>
                        <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </label>
                        <MdKeyboardArrowDown style={{ fontSize: "16px", color: "#033028", alignItems: "end", justifyContent: "end" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "4px", alignItems: "center", cursor: "pointer", justifyContent: "space-between"}}>
                        <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </label>
                        <MdKeyboardArrowDown style={{ fontSize: "16px", color: "#033028", alignItems: "end", justifyContent: "end" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "4px", alignItems: "center", cursor: "pointer", justifyContent: "space-between"}}>
                        <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </label>
                        <MdKeyboardArrowDown style={{ fontSize: "16px", color: "#033028", alignItems: "end", justifyContent: "end" }} />
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "30px", width: "90vw", justifyContent: "flex-start" }}>
                <div style={{display: "flex", flexDirection: "column", width: "20vw"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Responsable
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", border: "1px solid #E0E0E0", borderRadius: "4px" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", gap: "10px", justifyContent: "center" }}>
                            <Avatar alt={"Prueba"} src="" sx={{ width: 56, height: 56 }} variant="square" />
                            <label style={{ fontSize: "14px", fontWeight: "400", color: "#181B1A" }}>Empresa</label>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Avatar alt={"Prueba"} src="" sx={{ width: 252, height: 252, marginBottom: "1rem" }} variant="square" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <label style={{ fontSize: "20px", fontWeight: "400", color: "#181B1A", padding: "5px 10px" }}>Nombre</label>
                            <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C", padding: "5px 10px" }}>Especialidad</label>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", width: "20vw"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Equipo
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", border: "1px solid #E0E0E0", borderRadius: "4px", gap: "20px", padding: "20px" }}>
                        <label style={{ fontSize: "20px", fontWeight: "400", color: "#181B1A", padding: "5px 10px" }}>Work</label>
                        <label style={{ fontSize: "12px", fontWeight: "400", color: "#AEB7B4", padding: "5px 10px" }}>Habilidades</label>
                        <Button size="large" style={{ backgroundColor: "#F0FF3D", color: "#000" }}>
                            Aplicar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}