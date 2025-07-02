import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Values } from "@/components/selects";

export interface FilterProps {
    selectedSpecialties: Values[];
    selectedSkills: Values[];
    selectedIndustries: Values[];
}

export default function FiltersComponent({selectedSpecialties = [], selectedSkills = [], selectedIndustries = []}: FilterProps) {
    const groups = [
        { title: "Especialidad", values: selectedSpecialties },
        { title: "Habilidades", values: selectedSkills },
        { title: "Tipo de proyecto", values: selectedIndustries },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "20px", backgroundColor: "#EDF7F6", borderRadius: "8px", width: "90vw", gap: "20px", marginBottom: "20px" }}>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", justifyContent: "space-between", cursor: "pointer" }}>
                <label style={{ fontSize: "16px", fontWeight: "400", color: "#181B1A", marginBottom: "10px", fontStyle: "italic" }}>Filtros aplicados</label>
                <MdKeyboardArrowDown />
            </div>
            {groups.map(({ title, values }) => values.length > 0 ?(
                <div key={title} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                    <label style={{ fontSize: "14px", fontWeight: "400", color: "#555E5C", backgroundColor: "#F4F5F5" }}>{title}</label>
                    { values.map((val, index) => (
                        <label key={`${title}-${val.id}-${index}`} style={{ fontSize: "12px", fontWeight: 400, color: "#033028", backgroundColor: "#FFFFFF", padding: "5px 8px 5px 8px" }}>{val.name}</label>
                    ))}
                </div> 
            ) : null)}
        </div>
    );
};