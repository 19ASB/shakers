"use client";
import React, { useState } from 'react';
import { Checkbox, Typography } from '@mui/material';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';
import { Dropdown } from 'primereact/dropdown';
import "@/app/globals.css";

export interface Values{
    id: number;
    name: string;
}

interface SelectsProps {
    title: string;
    options: Values[];
    state: [Values[], React.Dispatch<React.SetStateAction<Values[]>>];
    onOperatorChange?: (op: "O" | "Y") => void;
}

const multiSelect: React.CSSProperties = {
    width: "75%",
    padding: "10px",
    border: "1px solid #E4E7E7",
    borderRadius: "4px",
    justifyContent: "space-between",
    marginBottom: "1rem",
};

const select: React.CSSProperties = {
    width: "10%",
    padding: "10px",
    border: "1px solid #E4E7E7",
    borderRadius: "4px",
    justifyContent: "space-between",
    marginBottom: "1rem",
};

export function SelectsComponent({title, options, state, onOperatorChange}: SelectsProps) {
    const [selectedValues, setSelectedValues] = state;
    const [selectedOption, setSelectedOption] = useState({ name: "O" });
    const option = [
        { name: "O" },
        { name: "Y" },
    ]
    const [operator, setOperator] = useState<"O" | "Y">("O");

    /* cuando cambie O/Y */
    const handleOp = (op: "O" | "Y") => {
        setOperator(op);
        onOperatorChange?.(op); // avisa al padre solo de este grupo
    };

    const optionTemplate = (option: Values) => {
        const isChecked = selectedValues.some((v) => v.id === option.id);

        const toggle = (e: React.MouseEvent) => {
            e.preventDefault();
            setSelectedValues((prev) =>
            isChecked
                ? prev.filter((v) => v.id !== option.id)
                : [...prev, option]
            );
        };
            
        if (!option) return null;
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox checked={isChecked} onClick={toggle} style={{ marginRight: '8px' }}/>
                    <span style={{ marginLeft: '8px' }}>{option.name}</span>
                </div>
            );
        }

    const selectTemplate = (options: Values) => {
        const remove = (e: React.MouseEvent) => {
            e.stopPropagation();
            setSelectedValues((prev) => prev.filter((v: { id: number; }) => v.id !== options.id));
        };
        if (!options) return null; 
        return(
            <Tag style={{ borderRadius: "4px", background: "#EDF7F6", marginRight: "10px"}} value={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginLeft: '5px', marginRight: "5px" }}>{options.name}</span>
                    <DisabledByDefault style={{ backgroundColor: "#EDF7F6", color: "#033028"}} onClick={remove} />
                </span>
            }
            className='mr-1'/>
        );
    }
    return(
        <div>
            <Typography component="div" sx={{ width: "50%", fontSize: "16px", color: "#181B1A", marginBottom: 1 }}>
                { title }
            </Typography>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2rem" }}>
                <MultiSelect appendTo={document.body} style={multiSelect} value={selectedValues} onChange={(e: MultiSelectChangeEvent) => setSelectedValues(e.value)} options={options}
                    optionLabel='name' placeholder='Busca y añade' itemTemplate={optionTemplate} selectedItemTemplate={selectTemplate} panelClassName="no-default-checkbox"/>
                <Dropdown value={selectedOption} options={option} optionLabel="name" style={select} panelClassName="p-dropdown-panel p-dropdown-items-wrapper p-focus"/>
            </div>
        </div>
    )
}
