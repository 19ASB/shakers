import React from "react";
import { Card } from "primereact/Card";
import { Avatar } from "@mui/material";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import projects from "../data/sample_40_projects.json";
import staticData from "../data/Static_data.json";

const specialtiesMap = Object.fromEntries(
    staticData.specialties.map((specialty) => [specialty.id, specialty.name])
);

const industryMap = Object.fromEntries(
    staticData.industries.map((industry) => [industry.id, industry.name])
);

const skillsMap = Object.fromEntries(
    staticData.skills.map((skill) => [skill.id, skill.name])
);

type Project = {
    id: string | number;
    title: string;
    organization: {
        name: string;
        logo: string;
        industry: string | number;
    };
    positions: {
        skills: (string | number)[];
        specialties: (string | number)[];
    }[];
};

const CardComponet = ({ project }: { project: Project }) => {
    const{
        title,
        organization: { name: orgName, logo, industry },
        positions,
    } = project;

    // Flatten all skills from all positions
    const allSkills = positions?.flatMap(pos => pos.skills) || [];
    const allSpecialties = positions?.flatMap(pos => pos.specialties) || [];

    return(
        <div className="card">
            <Card className="card-component" style={cardStyle}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: "10px 10px 10px 10px", width: "10%", margin: "0 auto", alignItems: "center", justifyContent: "center" }}>
                        <Avatar alt={orgName} src={logo} sx={{ width: 56, height: 56, marginBottom: "1rem" }} variant="square" />
                        <label style={{ fontSize: "12px", fontWeight: "400", color: "#AEB7B4" }}>{orgName}</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "10px", gap: "5px" }}>
                        <label style={{ fontSize: "18px", fontWeight: 400, color: "#181B1A" }}>{title}</label>
                        <label style={{ fontSize: "14px", fontWeight: 400, color: "#0B5A4C" }}>
                            {allSpecialties.map((specId) => specialtiesMap[specId]).join(" ")} | { industryMap[industry] }
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {allSkills.map((skillId) => (
                                <label key={skillId} style={{ fontSize: "12px", fontWeight: 400, color: "#181B1A", backgroundColor: "#F4F5F5", padding: "5px 8px 5px 8px" }}>
                                    {skillsMap[skillId]}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "10px 10px 10px 10px", justifyContent: "center", alignItems: "center", width: "10%", margin: "0 auto", borderInlineStart: "1px solid #E0E0E0" }}>
                        <MdKeyboardDoubleArrowRight id="saberMas" style={{ color: "#033028", fontSize: "30px", fontWeight: "bold" }} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default function ProjectCards() {
    return(
        <div style={{ display: "flex", flexDirection: "column", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem"}}>
            { projects.filter((p) => p.status === "PUBLISHED").map((project) => (
                <CardComponet key={project.id} project={project} />
            ))}
        </div>
    );
}

const cardStyle: React.CSSProperties = {
    height: "100%",
    width: "70vw",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
}