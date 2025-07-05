import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Values } from "@/components/selects";
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';

export interface FilterProps {
    selectedSpecialties: Values[];
    specialtiesOp: "O" | "Y";
    selectedSkills: Values[];
    skillsOp: "O" | "Y";
    selectedIndustries: Values[];
    industriesOp: "O" | "Y";
    selectedCategories: Values[];
    categoriesOp: "O" | "Y";
}

export default function FiltersComponent({ selectedSpecialties = [], selectedSkills = [], selectedIndustries = [], selectedCategories = [], skillsOp, specialtiesOp, industriesOp, categoriesOp }: FilterProps) {
    const groups = [
        { title: "Especialidad", values: selectedSpecialties, operator: specialtiesOp },
        { title: "Habilidades", values: selectedSkills, operator: skillsOp },
        { title: "Tipo de proyecto", values: selectedIndustries, operator: industriesOp },
        { title: "Categorías", values: selectedCategories, operator: categoriesOp }
    ];
    const remove = (e: React.MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        const label = target.parentElement;
        if (label) {
            label.remove();
        }
    };
    return (
        <div style={divFilters}>
            <div style={divTitle}>
                <label style={title}>Filtros aplicados</label>
                <MdKeyboardArrowDown />
            </div>
            {groups.map(({ title, values, operator }) => values.length > 0 ? (
                <div key={title} style={divFiltersApplied}>
                    <label style={option}>{title}</label>
                    {values.map((val, index) => (
                        <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                            <label key={`${title}-${val.id}-${index}`} style={filtersApplied}>
                                {val.name} <span onClick={remove} style={span}><DisabledByDefault style={iconDefault} /></span>
                            </label>
                            <label style={option}>({operator})</label>
                        </div>
                    ))}
                </div>
            ) : null)}
        </div>
    );
};

const divFilters: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    padding: "20px", 
    backgroundColor: "#EDF7F6", 
    borderRadius: "8px", 
    width: "90vw", 
    gap: "20px",
    marginBottom: "20px" 
}

const divTitle: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: "10px", 
    justifyContent: "space-between", 
    cursor: "pointer" 
}

const divFiltersApplied: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: "10px", 
    alignItems: "center" 
}

const title: React.CSSProperties = { 
    fontSize: "16px", 
    fontWeight: "400", 
    color: "#181B1A", 
    marginBottom: "10px", 
    fontStyle: "italic" 
}

const option: React.CSSProperties = { 
    fontSize: "14px", 
    fontWeight: "400", 
    color: "#555E5C", 
    backgroundColor: "#F4F5F5" 
}

const filtersApplied: React.CSSProperties = { 
    fontSize: "12px", 
    fontWeight: 400, 
    color: "#033028", 
    backgroundColor: "#FFFFFF", 
    padding: "5px 8px 5px 8px", 
    alignItems: "center",
    justifyContent: "center",
    display: "inline-flex",
}

const span: React.CSSProperties = { 
    display: "inline-flex", 
    cursor: "pointer" 
}

const iconDefault: React.CSSProperties = { 
    backgroundColor: "#EDF7F6", 
    color: "#033028" 
}