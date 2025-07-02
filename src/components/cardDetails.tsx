"use client";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import projects from "../data/sample_40_projects.json";
import staticData from "../data/Static_data.json";

const specialtiesMap = Object.fromEntries(
  staticData.specialties.map((specialty) => [specialty.id, specialty.name])
);
const skillsMap = Object.fromEntries(
  staticData.skills.map((skill) => [skill.id, skill.name])
);
const industryMap = Object.fromEntries(
  staticData.industries.map((industry) => [industry.id, industry.name])
);

export default function CardDetails() {
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
                    { Array.isArray(data.faqs) && data.faqs.length > 0 ? (
                        data.faqs.map((faq, index) => (
                            <div key={index} style={{ display: "flex", flexDirection: "row", gap: "10px", border: "1px solid #E0E0E0", padding: "10px", borderRadius: "4px", alignItems: "center", cursor: "pointer", justifyContent: "space-between"}}>
                                <label style={{ fontSize: "12px", fontWeight: "400", color: "#181B1A"}}>
                                    {faq.answer}
                                </label>
                                <MdKeyboardArrowDown style={{ fontSize: "16px", color: "#033028", alignItems: "end", justifyContent: "end" }} />
                            </div>
                        ))
                    ) : null}
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "30px", width: "90vw", justifyContent: "flex-start" }}>
                <div style={{display: "flex", flexDirection: "column", width: "20vw"}}>
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