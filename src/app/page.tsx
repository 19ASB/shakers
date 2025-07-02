"use client";

import AppBarComponent from "@/components/appBar";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Button, Stack } from "@mui/material";
import DialogComponent from "@/components/dialog";
import CardComponent from "@/components/card";
import CardDetails from "@/components/cardDetails";
import { HiFilter } from "react-icons/hi";
import { FaArrowDown } from "react-icons/fa6";
import FiltersComponent from "@/components/filters";
import type { Values } from "@/components/selects";

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState<Values[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<Values[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<Values[]>([]);
  const [visible, setShowMain] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleApplyFilters = () => {
    setFiltersVisible(true);
    setShowDialog(false);
  };

  return (
    <>
        <AppBarComponent />
        <div style={container}>
          <AnimatePresence>
            {!visible && (<motion.div key="cta-button" initial={{opacity: 1}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.5 }}>
              <Button size="large" style={{ backgroundColor: "#F0FF3D", color: "#000" }} onClick={() => setShowMain(true)}>
                Click here to see the entrance animation
              </Button>
            </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {visible && (
              <motion.div
                key="main-content"
                initial={{ opacity: 1}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.5 }}
              >
              <Box component="div" sx={{ p: 1, paddingTop: 5, paddingRight: 5, justifyContent: "flex-end"}}>
                <Stack direction="row" spacing={3} sx={{ justifyContent: "flex-end" }}>
                    <Button variant="outlined" startIcon={<HiFilter/>} sx={{ color: "#033028", border: "none"}} onClick={() => setShowDialog(true)}>
                        Filtrar
                    </Button>
                    <Button variant="outlined" startIcon={<FaArrowDown />} sx={{color: "#033028", border: "1px solid #033028" }}>
                        Ordenar
                    </Button>
                </Stack>
              </Box>
                {/*<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "12px", fontWeight: "400", color: "#033028", padding: "5px", backgroundColor: "#EDF7F6", alignSelf: "flex-start", width: "fit-content", borderRadius: "4px" }}>
                    € ¡Gana 1500€ por referir!
                  </label>
                  <CardComponent />
                </div>
                {/*
                <CardDetails /> */}
                <DialogComponent visible={showDialog} onHide={() => setShowDialog(false)}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  selectedSpecialties={selectedSpecialties}
                  setSelectedSpecialties={setSelectedSpecialties}
                  selectedIndustries={selectedIndustries}
                  setSelectedIndustries={setSelectedIndustries}
                  onApplyFilters={handleApplyFilters} />
                {filtersVisible && (
                  
                  <FiltersComponent  selectedSkills={selectedSkills} selectedSpecialties={selectedSpecialties} selectedIndustries={selectedIndustries}/>
                )}
                <CardComponent />
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </>
  );
}

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
}