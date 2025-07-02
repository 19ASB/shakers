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

type GroupedOptions = {
    label: string;
    items: Option[];
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
    onApplyFilters: () => void;
}
const { specialties, skills, categories, industries, subcategories } = data as Record<string, Option[]>;

export default function DialogComponent({ visible, onHide, selectedSkills, setSelectedSkills, selectedSpecialties, setSelectedSpecialties, selectedIndustries, setSelectedIndustries, onApplyFilters,}: Props) {
    const [selectedCategories, setSelectedCategories] = useState<Values[]>([]);

    const groups: {
        title: string;
        options: Option[];
        state: [Values[], React.Dispatch<React.SetStateAction<Values[]>>];
    }[] = [
        {
            title: "Especialidades",
            options: specialties,
            state: [selectedSpecialties, setSelectedSpecialties]        
        },
        {
            title: "Habilidades",
            options: skills,
            state: [selectedSkills, setSelectedSkills]
        },
        {
            title: "Industrias",
            options: industries,
            state: [selectedIndustries, setSelectedIndustries]
        },
        {
            title: "Categorías",
            options: categories,
            state: [selectedCategories, setSelectedCategories]
        }
    ]

    return(
        <Dialog appendTo="self" visible={visible} onHide={onHide} position="center" style={{ minWidth: "340px", width: "45%", backgroundColor: "white", padding: "1rem", borderRadius: "8px" }} maskStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }} pt={{ root: { style: { zIndex: 1200 } } }} modal>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                Filtrar Proyectos
            </Typography>
            {groups.map(({ title, options, state }) => (
                <SelectsComponent key={title} title={title} options={options} state={state} />
            ))}
            <div>
                <Typography component="div" sx={{ width: "50%", fontSize: "16px", color: "#181B1A", marginBottom: 1 }}>Ordenar por</Typography>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <RadioButton inputId="masReciente" value="masReciente" name="ordenarReciente" />
                    <Typography component="label" htmlFor="masReciente" sx={{ cursor: "pointer" }}>
                        Fecha de publicación (Más reciente primero)
                    </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                    <RadioButton inputId="masAntiguo" value="masAntiguo" name="ordenarAntiguo" />
                    <Typography component="label" htmlFor="masReciente" sx={{ cursor: "pointer" }}>
                        Fecha de publicación (Más antiguo primero)
                    </Typography>
                </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "row", alignContent: "center", marginLeft: "2rem", marginRight: "2rem", gap: "2rem" }}>
                    <Button style={{ width: "40%", backgroundColor: "#FFFFFF", color: "#CA4810"}} onClick={() => { setSelectedSkills([]); setSelectedSpecialties([]); setSelectedIndustries([]);}}>
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