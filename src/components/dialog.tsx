import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Typography } from "@mui/material";
import { Values, SelectsComponent } from "./selects";
import { RadioButton } from 'primereact/radiobutton';
import { Button } from "@mui/material";
import data from "../data/Static_data.json";

type Option = {
    id: number;
    name: string;
};

type Props = {
    visible: boolean;
    onHide: () => void;
    selectedSkills: Values[];
    setSelectedSkills: React.Dispatch<React.SetStateAction<Values[]>>;
    setSkillsOp: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    skillsOp: "O" | "Y";
    selectedSpecialties: Values[];
    setSelectedSpecialties: React.Dispatch<React.SetStateAction<Values[]>>;
    setSpecialtiesOp: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    specialtiesOp: "O" | "Y";
    selectedIndustries: Values[];
    setSelectedIndustries: React.Dispatch<React.SetStateAction<Values[]>>;
    setIndustriesOp: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    industriesOp: "O" | "Y";
    selectedCategories: Values[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<Values[]>>;
    categoriesOp: "O" | "Y";
    setCategoriesOp: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    order: "masReciente" | "masAntiguo";
    onApplyFilters: () => void;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
    setOrder: React.Dispatch<React.SetStateAction<"masReciente" | "masAntiguo">>;
}
const { specialties, skills, categories, industries } = data as Record<string, Option[]>;

export default function DialogComponent({ visible, onHide, 
    selectedSkills, setSelectedSkills, setSkillsOp, skillsOp,
    selectedSpecialties, setSelectedSpecialties, setSpecialtiesOp, specialtiesOp,
    selectedIndustries, setSelectedIndustries, setIndustriesOp, industriesOp,
    selectedCategories, setSelectedCategories, setCategoriesOp, categoriesOp,
    onApplyFilters, setShowFilters, setOrder, order }: Props) {

    const handleChangeOrder = (value: "masReciente" | "masAntiguo") => {
        setOrder(value);
    };

    const groups: {
        title: string;
        options: Option[];
        state: [Values[], React.Dispatch<React.SetStateAction<Values[]>>];
        operator?: "O" | "Y";
        onOperatorChange?: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    }[] = [
            {
                title: "Especialidades",
                options: specialties,
                state: [selectedSpecialties, setSelectedSpecialties],
                operator: specialtiesOp,
                onOperatorChange: setSpecialtiesOp,
            },
            {
                title: "Habilidades",
                options: skills,
                state: [selectedSkills, setSelectedSkills],
                operator: skillsOp,
                onOperatorChange: setSkillsOp,
            },
            {
                title: "Industrias",
                options: industries,
                state: [selectedIndustries, setSelectedIndustries],
                operator: industriesOp,
                onOperatorChange: setIndustriesOp,
            },
            {
                title: "Categorías",
                options: categories,
                state: [selectedCategories, setSelectedCategories],
                operator: categoriesOp,
                onOperatorChange: setCategoriesOp,
            }
        ]

    return (
        <Dialog appendTo="self" visible={visible} onHide={onHide} position="center" style={dialog} maskStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }} pt={{ root: { style: { zIndex: 1200 } } }} modal>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                Filtrar Proyectos
            </Typography>
            {groups.map(({ title, options, state, operator, onOperatorChange }) => (
                <SelectsComponent key={title} title={title} options={options} state={state} operator={operator ?? "O"} onOperatorChange={onOperatorChange} />
            ))}
            <div>
                <Typography component="div" sx={{ width: "50%", fontSize: "16px", color: "#181B1A", marginBottom: 1 }}>Ordenar por</Typography>
                <div style={divRadioButton}>
                    <RadioButton inputId="masReciente" value="masReciente" name="ordenarReciente" checked={order === "masReciente"} onChange={() => handleChangeOrder("masReciente")} />
                    <Typography component="label" htmlFor="masReciente" sx={{ cursor: "pointer" }}>
                        Fecha de publicación (Más reciente primero)
                    </Typography>
                </div>
                <div style={divRadioButton}>
                    <RadioButton inputId="masAntiguo" value="masAntiguo" name="ordenarAntiguo" checked={order === "masAntiguo"} onChange={() => handleChangeOrder("masAntiguo")} />
                    <Typography component="label" htmlFor="masReciente" sx={{ cursor: "pointer" }}>
                        Fecha de publicación (Más antiguo primero)
                    </Typography>
                </div>
            </div>
            <div style={{marginTop: "1rem"}}>
                <div style={divBotones}>
                    <Button style={buttonEliminar} onClick={() => { setSelectedSkills([]); setSelectedSpecialties([]); setSelectedIndustries([]); setSelectedCategories([]), setShowFilters(false); }}>
                        Eliminar filtros
                    </Button>
                    <Button style={buttonFiltrar} onClick={onApplyFilters}>
                        Filtrar
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

const dialog: React.CSSProperties = { 
    minWidth: "340px", 
    width: "45%", 
    backgroundColor: "white", 
    padding: "1rem", 
    borderRadius: "8px" 
}

const divRadioButton: React.CSSProperties = { display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    gap: "10px", 
    marginBottom: "10px" 
}

const divBotones: React.CSSProperties = { display: "flex", 
    flexDirection: "row", 
    alignContent: "center", 
    marginLeft: "2rem",
    marginRight: "2rem", 
    gap: "2rem" 
}

const buttonEliminar: React.CSSProperties = { 
    width: "40%", 
    backgroundColor: "#FFFFFF", 
    color: "#CA4810" 
}

const buttonFiltrar: React.CSSProperties = { 
    width: "40%",
    backgroundColor: "#033028", 
    color: "#FFFFFF" 
}