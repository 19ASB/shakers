import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Typography } from "@mui/material";
import { Values, SelectsComponent} from "./selects";
import { RadioButton } from 'primereact/radiobutton';
import { Button } from "@mui/material";
import data from "../data/Static_data.json";

type Option = {
    id: number;
    name: string;
};

type Props ={
    visible: boolean;
    onHide: () => void;
    selectedSkills: Values[];
    setSelectedSkills: React.Dispatch<React.SetStateAction<Values[]>>;
    selectedSpecialties: Values[];
    setSelectedSpecialties: React.Dispatch<React.SetStateAction<Values[]>>;
    selectedIndustries: Values[];
    setSelectedIndustries: React.Dispatch<React.SetStateAction<Values[]>>;
    setSpecialtiesOp: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    setSkillsOp: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    setIndustriesOp: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    setCategoriesOp?: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    order: "masReciente" | "masAntiguo";
    onApplyFilters: () => void;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
    setOrder: React.Dispatch<React.SetStateAction<"masReciente" | "masAntiguo">>;
}
const { specialties, skills, categories, industries } = data as Record<string, Option[]>;

export default function DialogComponent({ visible, onHide, selectedSkills, setSelectedSkills, selectedSpecialties, setSelectedSpecialties, selectedIndustries, setSelectedIndustries, setSpecialtiesOp, setSkillsOp, setIndustriesOp, setCategoriesOp, onApplyFilters, setShowFilters}: Props) {
    const [selectedCategories, setSelectedCategories] = useState<Values[]>([]);
    const [order, setOrder] = useState("masReciente");
    const [localOrder, setLocalOrder] = useState<"masReciente" | "masAntiguo">("masReciente");

    const handleChangeOrder = (value: "masReciente" | "masAntiguo") => {
        setLocalOrder(value);
        setOrder(value); // <- actualiza el padre
    };

    const groups: {
        title: string;
        options: Option[];
        state: [Values[], React.Dispatch<React.SetStateAction<Values[]>>];
        onOperatorChange?: React.Dispatch<React.SetStateAction<"O" | "Y">>;
    }[] = [
        {
            title: "Especialidades",
            options: specialties,
            state: [selectedSpecialties, setSelectedSpecialties],
            onOperatorChange: setSpecialtiesOp,   
        },
        {
            title: "Habilidades",
            options: skills,
            state: [selectedSkills, setSelectedSkills],
            onOperatorChange: setSkillsOp,
        },
        {
            title: "Industrias",
            options: industries,
            state: [selectedIndustries, setSelectedIndustries],
            onOperatorChange: setIndustriesOp,
        },
        {
            title: "Categorías",
            options: categories,
            state: [selectedCategories, setSelectedCategories],
            onOperatorChange: setCategoriesOp,
        }
    ]

    return(
        <Dialog appendTo="self" visible={visible} onHide={onHide} position="center" style={{ minWidth: "340px", width: "45%", backgroundColor: "white", padding: "1rem", borderRadius: "8px" }} maskStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }} pt={{ root: { style: { zIndex: 1200 } } }} modal>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                Filtrar Proyectos
            </Typography>
            {groups.map(({ title, options, state, onOperatorChange}) => (
                <SelectsComponent key={title} title={title} options={options} state={state} onOperatorChange={onOperatorChange}/>
            ))}
            <div>
                <Typography component="div" sx={{ width: "50%", fontSize: "16px", color: "#181B1A", marginBottom: 1 }}>Ordenar por</Typography>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <RadioButton inputId="masReciente" value="masReciente" name="ordenarReciente" checked={order === "masReciente"} onChange={() => handleChangeOrder("masReciente")}/>
                    <Typography component="label" htmlFor="masReciente" sx={{ cursor: "pointer" }}>
                        Fecha de publicación (Más reciente primero)
                    </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                    <RadioButton inputId="masAntiguo" value="masAntiguo" name="ordenarAntiguo" checked={order === "masAntiguo"} onChange={() =>  handleChangeOrder("masAntiguo")}/>
                    <Typography component="label" htmlFor="masReciente" sx={{ cursor: "pointer" }}>
                        Fecha de publicación (Más antiguo primero)
                    </Typography>
                </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "row", alignContent: "center", marginLeft: "2rem", marginRight: "2rem", gap: "2rem" }}>
                    <Button style={{ width: "40%", backgroundColor: "#FFFFFF", color: "#CA4810"}} onClick={() => { setSelectedSkills([]); setSelectedSpecialties([]); setSelectedIndustries([]); setShowFilters(false);}}>
                        Eliminar filtros
                    </Button>
                    <Button style={{ width: "40%", backgroundColor: "#033028", color: "#FFFFFF" }} onClick={onApplyFilters}>
                        Filtrar
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}