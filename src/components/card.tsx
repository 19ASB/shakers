import React, { useState } from "react";
import { Card } from "primereact/Card";
import { Avatar } from "@mui/material";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";

import projects from "../data/sample_40_projects.json";
import staticData from "../data/Static_data.json";
import { Values } from "./selects";

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
    const router = useRouter();
    const handleClick = () => {
        router.push(`/cardDetails/${project.id}`);
    }
    const{
        title,
        organization: { name: orgName, logo, industry },
        positions,
    } = project;

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
                            {allSkills.map((skillId, index) => (
                                <label key={`${skillId}-${index}`} style={{ fontSize: "12px", fontWeight: 400, color: "#181B1A", backgroundColor: "#F4F5F5", padding: "5px 8px 5px 8px" }}>
                                    {skillsMap[skillId]}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "10px 10px 10px 10px", justifyContent: "center", alignItems: "center", width: "10%", margin: "0 auto", borderInlineStart: "1px solid #E0E0E0" }} onClick={handleClick}>
                        <MdKeyboardDoubleArrowRight id="saberMas" style={{ color: "#033028", fontSize: "30px", fontWeight: "bold" }} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

type CardsProps = {
    selectedSpecialties: Values[];
    specialtiesOp: "O" | "Y";
    selectedSkills: Values[];
    skillsOp: "O" | "Y";
    selectedIndustries: Values[];
    industriesOp: "O" | "Y";
    order: "masReciente" | "masAntiguo";
};

export default function ProjectCards(props: CardsProps) {
    const {
        selectedSpecialties, specialtiesOp,
        selectedSkills,     skillsOp,
        selectedIndustries, industriesOp,
        order
    } = props;

    const getTime = (p: Project) => {
        const raw = (p as any).publishedAt
                ?? (p as any).published_at
                ?? (p as any).createdAt
                ?? null;
        return raw ? new Date(raw).getTime() : 0;
    };

    const matchGroup = (
        projectValues: (string | number)[],
        selectedArr: Values[],
        op: "O" | "Y"
    ) => {
        if (!selectedArr.length) return true; // nada seleccionado ⇒ siempre pasa
        const ids = selectedArr.map(v => v.id);
        return op === "O"
        ? ids.some(id => projectValues.includes(id))      // “O” (OR)
        : ids.every(id => projectValues.includes(id));    // “Y” (AND)
    };
    const filtered = React.useMemo(() => {
        return projects
        .filter(p => p.status === "PUBLISHED")
        .filter(p => {
            const specs  = p.positions.flatMap(pos => pos.specialties);
            const skills = p.positions.flatMap(pos => pos.skills);
            const ind    = [p.organization.industry];       // array de 1 para reusar matchGroup

            return (
            matchGroup(specs,  selectedSpecialties, specialtiesOp) &&
            matchGroup(skills, selectedSkills,     skillsOp)      &&
            matchGroup(ind,    selectedIndustries, industriesOp)
            );
        })
        .sort((a, b) => {
            return order === "masReciente" ? getTime(b) - getTime(a) : getTime(a) - getTime(b)
        });
    }, [
        selectedSpecialties, specialtiesOp,
        selectedSkills, skillsOp,
        selectedIndustries, industriesOp,
        order
    ]);
    return(
        <div style={{ display: "flex", flexDirection: "column", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem"}}>
            { filtered.map(project =>(
                <CardComponet key={project.id} project={project} />
            ))}
        </div>
    );
}

const cardStyle: React.CSSProperties = {
    height: "100%",
    width: "90vw",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
}