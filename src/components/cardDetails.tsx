"use client";
import React, { useState } from "react";
import { Alert, Avatar, Box, Button, Snackbar } from "@mui/material";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import projects from "../data/sample_40_projects.json";
import staticData from "../data/Static_data.json";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaEuroSign } from "react-icons/fa";
import { MdOutlinePermIdentity } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const mapById = <T extends { id: number; name: string }>(arr: T[]) =>
  Object.fromEntries(arr.map(({ id, name }) => [id, name])) as Record<
    number,
    string
  >;

const specialtiesMap   = mapById(staticData.specialties);
const skillsMap        = mapById(staticData.skills);
const industryMap      = mapById(staticData.industries);
const subcategoriesMap = Object.fromEntries(
  staticData.subcategories.map(({ id, name }) => [id, name])
) as Record<number, string>;



interface Faq{
    question: string;
    answer: string;
}

interface Props{
    data: { faqs: Faq[] };
}

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

    const industryName     = industryMap[data.organization.industry] ?? "—";

    // Unimos las specialties y skills de todos los puestos del proyecto
    const allSpecialties = [
        ...new Set(
        data.positions.flatMap(pos => pos.specialties.map(id => specialtiesMap[id]))
        )
    ].filter(Boolean);

    const allSkills = [
        ...new Set(
        data.positions.flatMap(pos => pos.skills.map(id => skillsMap[id]))
        )
    ].filter(Boolean);
    
    const subcategoryId = data.category * 100 + data.subcategory;   // fórmula mágica
    const subcategoryName = subcategoriesMap[subcategoryId] ?? "—";

    const fecha = new Date(data.startDate);
    const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;
    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px", width: "90vw", backgroundColor: "#EDF7F6", padding: "5px 8px 5px 8px", borderRadius: "4px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleClick}>
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
                    {data.title}
                </label>
                <label style={{ fontSize: "16px", fontWeight: "400", color: "#FFFFFF", padding: "5px 0", display: "block", marginLeft: "2rem" }}>{allSpecialties.join(", ") || "—"}</label>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "5px", padding: "10px 0 20px", marginLeft: "2rem" }}>
                    <label style={{ width: "fit-content", fontSize: "12px", fontWeight: "400", color: "#181B1A", padding: "5px 8px 5px 8px", gap: "5px", backgroundColor: "#F4F5F5", borderRadius: "4px", display: "flex", alignItems: "center" }}>
                        <FaRegCalendarAlt /> Inicio {fechaFormateada}
                    </label>
                    <label style={{ width: "fit-content", fontSize: "12px", fontWeight: "400", color: "#181B1A", padding: "5px 8px 5px 8px", gap: "5px", backgroundColor: "#F4F5F5", borderRadius: "4px", display: "flex", alignItems: "center" }}>
                        <FaRegClock /> {data.totalHours} horas
                    </label>
                    <label style={{ width: "fit-content", fontSize: "12px", fontWeight: "400", color: "#181B1A", padding: "5px 8px 5px 8px", gap: "5px", backgroundColor: "#F4F5F5", borderRadius: "4px", display: "flex", alignItems: "center" }}>
                        <FaEuroSign /> Estimados
                    </label>
                    <label style={{ width: "fit-content", fontSize: "12px", fontWeight: "400", color: "#181B1A", padding: "5px 8px 5px 8px", gap: "5px", backgroundColor: "#F4F5F5", borderRadius: "4px", display: "flex", alignItems: "center" }}>
                        <MdOutlinePermIdentity /> {data.totalApplicationsAmount} Talentos
                    </label>
                </Box>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "90vw", backgroundColor: "#FFFFFF", padding: "20px 0", borderRadius: "4px", gap: "30px" }}>
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Descripción del proyecto
                    </label>
                    <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C" }}>
                        {data.description}
                    </label>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        ¿Cuáles son los objetivos y tareas a realizar?
                    </label>
                    {Array.isArray(data.goals) && data.goals.length > 0 ? (
                        data.goals.map((goal, index) => (
                            <label key={index} style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C" }}>
                                {goal}
                            </label>
                        ))
                    ) : (
                        <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C" }}>
                            No hay objetivos definidos.
                        </label>
                    )}
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "90vw", backgroundColor: "#FFFFFF", padding: "40px 0", borderRadius: "4px", gap: "30px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Preguntas frecuentes
                    </label>
                    { Array.isArray(data.faqs) && data.faqs.length > 0 && data.faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} style={{ display: "flex", flexDirection: "column", gap: "10px", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "4px", backgroundColor: isOpen ? "#EDF7F6" : "#FFFFFF" }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", cursor: "pointer", justifyContent: "space-between"}} onClick={() => toggleOpen(index)}>
                                    <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A"}}>{faq.answer}</label>
                                    <MdKeyboardArrowDown style={{ fontSize: "16px", color: "#033028", alignItems: "end", justifyContent: "end", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", }} />
                                </div>
                                { isOpen && (
                                    <div style={{ display: "flex", flexDirection: "row", paddingLeft: "20px" }}>
                                        <label style={{ fontSize: "12px", fontWeight: "400", color: "#555E5C" }}>
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
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Responsable
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", border: "1px solid #E0E0E0", borderRadius: "4px" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", gap: "10px", justifyContent: "center" }}>
                            <Avatar alt={"Prueba"} src={data.organization.logo} sx={{ width: 56, height: 56 }} variant="square" />
                            <label style={{ fontSize: "14px", fontWeight: "400", color: "#181B1A" }}>{data.organization.name}</label>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Avatar alt={"Prueba"} src="" sx={{ width: 252, height: 252, marginBottom: "1rem" }} variant="square" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <label style={{ fontSize: "20px", fontWeight: "400", color: "#181B1A", padding: "5px 10px" }}>{data.projectLeader.name} {data.projectLeader.lastName}</label>
                            <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C", padding: "5px 10px" }}>{industryName}</label>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label style={{ fontSize: "18px", fontWeight: "400", color: "#033028", paddingBottom: "10px" }}>
                        Equipo
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", border: "1px solid #E0E0E0", borderRadius: "4px", gap: "20px", padding: "20px" }}>
                        {applied ?(
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left", gap: "10px", padding: "10px", backgroundColor: "#F8F9EC" }}>
                                <FaCheck style={{color: "#181B1A"}}/>
                                <label style={{ fontSize: "14px", fontWeight: "400", color: "#181B1A" }}>
                                    Aplicado
                                </label>
                            </div>
                        ) : (null)}
                        <label style={{ fontSize: "20px", fontWeight: "400", color: "#181B1A", padding: "5px 10px" }}>{subcategoryName}</label>
                        <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C", padding: "5px 10px" }}>{allSkills.join(", ") || "—"}</label>
                        {!applied ? (
                            <Button variant="contained" size="large" style={{ backgroundColor: "#F0FF3D", color: "#000" }} onClick={handleApply}>
                                Aplicar
                            </Button>
                        ) : (
                            <Button size="large" style={{ backgroundColor: "#FFFFFF", color: "#CA4810", border: "1px solid #CA4810" }} onClick={handleApply}>
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