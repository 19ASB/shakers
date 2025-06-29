import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Typography } from "@mui/material";
import { Values, SelectsComponent} from "./selects";
import { RadioButton } from 'primereact/radiobutton';
import { Button } from "@mui/material";

export default function DialogComponent() {
    const [visible, setVisible] = useState(true);

    const [techs, setTechs] = useState<Values[]>([]);
    const [roles, setRoles] = useState<Values[]>([]);
    const [levels, setLevels] = useState<Values[]>([]);
    const [statuses, setStatuses] = useState<Values[]>([]);

    /* datos de ejemplo */
    const techOptions: Values[] = [
        { id: 1, name: 'React' },
        { id: 2, name: 'Vue' },
        { id: 3, name: 'Angular' },
    ];

    const roleOptions: Values[] = [
        { id: 1, name: 'Frontend' },
        { id: 2, name: 'Backend' },
        { id: 3, name: 'Full Stack' },
    ];

    const levelOptions: Values[] = [
        { id: 1, name: 'Junior' },
        { id: 2, name: 'Mid' },
        { id: 3, name: 'Senior' },
    ];

    const statusOptions: Values[] = [
        { id: 1, name: 'En curso' },
        { id: 2, name: 'Pendiente' },
        { id: 3, name: 'Completado' },
    ];

    return(
        <Dialog visible={visible} position="center" style={{ minWidth: "340px", width: "45%" }} onHide={() => setVisible(false)}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                Filtrar Proyectos
            </Typography>
            <SelectsComponent title="Especialidades" options={roleOptions} state={[roles, setRoles]}/>
            <SelectsComponent title="Habilidades" options={techOptions} state={[techs, setTechs]}/>
            <SelectsComponent title="Tipo de proyecto" options={levelOptions} state={[levels, setLevels]}/>
            <SelectsComponent title="Industria" options={statusOptions} state={[statuses, setStatuses]}/>
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
                    <Button style={{ width: "40%", backgroundColor: "#FFFFFF", color: "#CA4810" }}>
                        Eliminar filtros
                    </Button>
                    <Button style={{ width: "40%", backgroundColor: "#033028", color: "#FFFFFF" }}>
                        Filtrar
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}