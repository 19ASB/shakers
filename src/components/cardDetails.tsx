"use client";
import React, { useState } from "react";
import { Alert, Avatar, Box, Button, Snackbar } from "@mui/material";
import { MdKeyboardArrowLeft, MdKeyboardArrowDown, MdOutlinePermIdentity} from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import projects from "../data/sample_40_projects.json";
import staticData from "../data/Static_data.json";
import { FaRegCalendarAlt, FaRegClock, FaEuroSign, FaCheck} from "react-icons/fa";
import fotoPerfil from '../assets/foto_perfil.jpg';

//Mapeo por ID
const mapById = <T extends { id: number; name: string }>(arr: T[]) => Object.fromEntries(arr.map(({ id, name }) => [id, name])) as Record<number,string>;

const specialtiesMap = mapById(staticData.specialties);
const skillsMap = mapById(staticData.skills);
const industryMap = mapById(staticData.industries);
const subcategoriesMap = Object.fromEntries(
  staticData.subcategories.map(({ id, name }) => [id, name])
) as Record<number, string>;

export default function CardDetails() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [applied, setApplied] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); 

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const params = useParams();
    const id = params.id;
    const router = useRouter();

    // Busca proyecto por id, si no está, busca en staticData (por ejemplo)
    const project = projects.find((p) => p.id.toString() === id);

    const data = project

    if (!data) {
        return <div>Elemento no encontrado</div>;
    }
    const handleClick = () => {
        router.push("/");
    }

    const handleApply = () => {
        setApplied(!applied);
        if (!applied) {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    // Unimos las specialties y skills de todos los puestos del proyecto
    const allSpecialties = [...new Set(data.positions.flatMap(pos => pos.specialties.map(id => specialtiesMap[id])))].filter(Boolean);
    const allSkills = [...new Set(data.positions.flatMap(pos => pos.skills.map(id => skillsMap[id])))].filter(Boolean);
    
    const subcategoryId = data.category * 100 + data.subcategory;
    const subcategoryName = subcategoriesMap[subcategoryId] ?? "—";
    const industryName = industryMap[data.organization.industry] ?? "—";

    const fecha = new Date(data.startDate);
    const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

    return(
        <div style={cardDetails}>
            <div style={divAppBar}>
                <div style={divTitulo} onClick={handleClick}>
                    <MdKeyboardArrowLeft style={iconArrow} />
                    <label style={texto}>
                        Atrás
                    </label>
                </div>
                <label style={texto2}>Buscador de proyectos</label>
                <div style={div}>
                    <label style={texto2}>/</label>
                    <label style={titulo}>{data.title}</label>
                </div>
            </div>
            <div style={divTitulo2}>
                <label style={labelTitulo}>
                    {data.title}
                </label>
                <label style={labelSpecialties}>{allSpecialties.join(", ") || "—"}</label>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "5px", padding: "10px 0 20px", marginLeft: "2rem" }}>
                    <label style={labelInfo}>
                        <FaRegCalendarAlt /> Inicio {fechaFormateada}
                    </label>
                    <label style={labelInfo}>
                        <FaRegClock /> {data.totalHours} horas
                    </label>
                    <label style={labelInfo}>
                        <FaEuroSign /> 1500 € Estimados
                    </label>
                    <label style={labelInfo}>
                        <MdOutlinePermIdentity /> {data.totalApplicationsAmount} Talentos
                    </label>
                </Box>
            </div>
            <div style={divDescripcionesParent}>
                <div style={divDescripciones}>
                    <label style={labelTituloDescripcion}>
                        Descripción del proyecto
                    </label>
                    <label style={labelAnswer}>
                        {data.description}
                    </label>
                </div>
                <div style={divDescripciones}>
                    <label style={labelQuestion}>
                        ¿Cuáles son los objetivos y tareas a realizar?
                    </label>
                    {Array.isArray(data.goals) && data.goals.length > 0 ? (
                        data.goals.map((goal, index) => (
                            <label key={index} style={labelGoal}>
                                {goal}
                            </label>
                        ))
                    ) : (
                        <label style={labelGoal}>
                            No hay objetivos definidos.
                        </label>
                    )}
                </div>
            </div>
            <div style={divDescripcionesParent}>
                <div style={divDescripciones}>
                    <label style={labelQuestion}>
                        Preguntas frecuentes
                    </label>
                    { Array.isArray(data.faqs) && data.faqs.length > 0 && data.faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} style={{ display: "flex", flexDirection: "column", gap: "10px", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "4px", backgroundColor: isOpen ? "#EDF7F6" : "#FFFFFF" }}>
                                <div style={divAnswer} onClick={() => toggleOpen(index)}>
                                    <label style={labelAnswerQuestion}>{faq.answer}</label>
                                    <MdKeyboardArrowDown style={{ fontSize: "16px", color: "#033028", alignItems: "end", justifyContent: "end", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", }} />
                                </div>
                                { isOpen && (
                                    <div style={divAnswerOpen}>
                                        <label style={labelAnswer}>
                                            {faq.question}
                                        </label>  
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "30px", width: "90vw", justifyContent: "flex-start" }}>
                <div style={divCard}>
                    <label style={labelInfoContainer}>
                        Responsable
                    </label>
                    <div style={divResponsable}>
                        <div style={divAvartarLogo}>
                            <Avatar alt={"Logo"} src={data.organization.logo} sx={{ width: 56, height: 56 }} variant="square" />
                            <label style={mensajeAplicado}>{data.organization.name}</label>
                        </div>
                        <div style={divAvatarPerson}>
                            <Avatar alt={"Perfil"} src={fotoPerfil.src} sx={{ width: 252, height: 252, marginBottom: "1rem" }} variant="square" />
                        </div>
                        <div style={divInfoPerson}>
                            <label style={labelInfoName}>{data.projectLeader.name} {data.projectLeader.lastName}</label>
                            <label style={labelSubInfoName}>{industryName}</label>
                        </div>
                    </div>
                </div>
                <div style={divCard}>
                    <label style={labelInfoContainer}>
                        Equipo
                    </label>
                    <div style={divEquipo}>
                        {applied ?(
                            <div style={divMensajeAplicado}>
                                <FaCheck style={{color: "#181B1A"}}/>
                                <label style={mensajeAplicado}>
                                    Aplicado
                                </label>
                            </div>
                        ) : (null)}
                        <label style={labelInfoName}>{subcategoryName}</label>
                        <label style={labelSubInfoName}>{allSkills.join(", ") || "—"}</label>
                        {!applied ? (
                            <Button variant="contained" size="large" style={buttonAplicar} onClick={handleApply}>
                                Aplicar
                            </Button>
                        ) : (
                            <Button size="large" style={buttonRetirar} onClick={handleApply}>
                                Retirar candidatura
                            </Button>
                        )}
                        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                            {!applied ? (
                                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                                    Aplicación enviada con éxito
                                </Alert>
                            ) : (
                                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                                    Aplicación retirada con éxito
                                </Alert>
                            )}
                        </Snackbar>
                    </div>
                </div>
            </Box>
        </div>
    )
}

const cardDetails: React.CSSProperties = {
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: "50px"
}

const divAppBar: React.CSSProperties = {
    display: "flex", 
    flexDirection: "row", 
    gap: "5px", 
    width: "90vw", 
    backgroundColor: "#EDF7F6", 
    padding: "5px 8px 5px 8px", 
    borderRadius: "4px",
    alignItems: "center" 
}

const divTitulo: React.CSSProperties = {
    display: "flex", 
    alignItems: "center", 
    cursor: "pointer" 
}

const iconArrow: React.CSSProperties = { 
    fontSize: "16px", 
    color: "#033028", 
    cursor: "pointer" 
}

const div: React.CSSProperties = { 
    display: "flex", 
    alignItems: "center", 
    cursor: "pointer" 
}

const divTitulo2: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    width: "90vw", 
    backgroundColor: "#033028", 
    margin: "20px 0 ", 
    borderRadius: "4px"
}

const divDescripcionesParent: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    width: "90vw", 
    backgroundColor: "#FFFFFF", 
    padding: "20px 0", 
    borderRadius: "4px", 
    gap: "30px" 
}

const divDescripciones: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    gap: "10px"
}


const divAnswer: React.CSSProperties = { 
    display: "flex",
    flexDirection: "row", 
    gap: "10px", 
    alignItems: "center", 
    cursor: "pointer", 
    justifyContent: "space-between"
}

const divAnswerOpen: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "row", 
    paddingLeft: "20px" 
}

const divCard: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column"
}

const divResponsable: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    border: "1px solid #E0E0E0", 
    borderRadius: "4px" 
}

const divAvartarLogo: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    padding: "10px", gap: "10px", 
    justifyContent: "center" 
}

const divAvatarPerson: React.CSSProperties = { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center" 
}

const divInfoPerson: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center" 
}


const divEquipo: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column",
    border: "1px solid #E0E0E0", 
    borderRadius: "4px",
    gap: "20px", 
    padding: "20px" 
}

const divMensajeAplicado: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "left", 
    gap: "10px", 
    padding: "10px", 
    backgroundColor: "#F8F9EC" 
}

const texto: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: "400", 
    color: "#033028", 
    padding: "5px" 
}

const texto2: React.CSSProperties = { 
    fontSize: "12px", 
    fontWeight: "400", 
    color: "#555E5C"
}

const labelTitulo: React.CSSProperties = { 
    fontSize: "24px", 
    fontWeight: "700", 
    color: "#FFFFFF", 
    padding: "20px 0", 
    display: "block", 
    marginLeft: "2rem" 
}

const labelSpecialties: React.CSSProperties = { 
    fontSize: "16px", 
    fontWeight: "400", 
    color: "#FFFFFF", 
    padding: "5px 0", 
    display: "block",
    marginLeft: "2rem" 
}

const labelInfo: React.CSSProperties = { 
    width: "fit-content", 
    fontSize: "12px", 
    fontWeight: "400", 
    color: "#181B1A", 
    padding: "5px 8px 5px 8px", 
    gap: "5px", 
    backgroundColor: 
    "#F4F5F5", 
    borderRadius: "4px", 
    display: "flex", 
    alignItems: "center" 
}

const labelTituloDescripcion: React.CSSProperties = { 
    fontSize: "18px", 
    fontWeight: "400", 
    color: "#033028", 
    paddingBottom: "10px" 
}

const labelAnswer: React.CSSProperties = { 
    fontSize: "14px", 
    fontWeight: "400", 
    color: "#555E5C" 
}

const labelQuestion: React.CSSProperties = { 
    fontSize: "18px", 
    fontWeight: "400", 
    color: "#033028", 
    paddingBottom: "10px" 
}

const labelAnswerQuestion: React.CSSProperties = { 
    fontSize: "12px", 
    fontWeight: "400", 
    color: "#181B1A"
}

const labelInfoContainer: React.CSSProperties = { 
    fontSize: "18px", 
    fontWeight: "400", 
    color: "#033028",
    paddingBottom: "10px" 
}

const labelInfoName: React.CSSProperties = { 
    fontSize: "20px", 
    fontWeight: "400", 
    color: "#181B1A", 
    padding: "5px 10px" 
}

const labelSubInfoName: React.CSSProperties = { 
    fontSize: "14px", 
    fontWeight: "400", 
    color: "#555E5C", 
    padding: "5px 10px" 
}

const mensajeAplicado: React.CSSProperties = { 
    fontSize: "14px", 
    fontWeight: "400", 
    color: "#181B1A" 
}

const titulo: React.CSSProperties = { 
    fontSize: "12px", 
    fontWeight: "700", 
    color: "#181B1A", 
    padding: "5px" 
}

const labelGoal: React.CSSProperties = { 
    fontSize: "14px", 
    fontWeight: "400", 
    color: "#555E5C" 
}

const buttonAplicar: React.CSSProperties = { 
    backgroundColor: "#F0FF3D", 
    color: "#000000",
    border: "1px solid #F0FF3D",
}

const buttonRetirar: React.CSSProperties = { 
    backgroundColor: "#FFFFFF", 
    color: "#CA4810", 
    border: "1px solid #CA4810" 
}