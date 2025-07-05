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
  const [skillsOp, setSkillsOp] = useState<"O" | "Y">("O");
  const [selectedSpecialties, setSelectedSpecialties] = useState<Values[]>([]);
  const [specialtiesOp, setSpecialtiesOp] = useState<"O" | "Y">("O");
  const [selectedIndustries, setSelectedIndustries] = useState<Values[]>([]);
  const [industriesOp, setIndustriesOp] = useState<"O" | "Y">("O");
  const [selectedCategories, setSelectedCategoriesOp] = useState<Values[]>([]);
  const [categoriesOp, setCategoriesOp] = useState<"O" | "Y">("O");
  const [order, setOrder] = useState<"masReciente" | "masAntiguo">("masReciente");
  const [visible, setShowMain] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleApplyFilters = () => {
    setFiltersVisible(true);
    setOrder(order);
    setShowDialog(false);
  };
  
  const [arrowRotated, setArrowRotated] = useState(false);
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
                    <Button variant="outlined" startIcon={<FaArrowDown style={{transform: arrowRotated ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease-in-out"}} />} 
                    sx={{color: "#033028", border: "1px solid #033028" }} onClick={() => {setOrder(order === "masReciente" ? "masAntiguo" : "masReciente"); setArrowRotated(prev => !prev)}}>
                        Ordenar
                    </Button>
                </Stack>
              </Box>
                <DialogComponent visible={showDialog} onHide={() => setShowDialog(false)}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  skillsOp={skillsOp}
                  setSkillsOp={setSkillsOp}
                  selectedSpecialties={selectedSpecialties}
                  setSelectedSpecialties={setSelectedSpecialties}
                  specialtiesOp={specialtiesOp}
                  setSpecialtiesOp={setSpecialtiesOp}
                  selectedIndustries={selectedIndustries}
                  setSelectedIndustries={setSelectedIndustries}
                  setIndustriesOp={setIndustriesOp}
                  industriesOp={industriesOp}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategoriesOp}
                  setCategoriesOp={setCategoriesOp}
                  categoriesOp={categoriesOp}
                  order={order}
                  setOrder={setOrder}
                  onApplyFilters={handleApplyFilters} 
                  setShowFilters={setShowFilters}/>
                {filtersVisible && showFilters && (
                  <FiltersComponent  
                    selectedSkills={selectedSkills} 
                    skillsOp={skillsOp}
                    selectedSpecialties={selectedSpecialties} 
                    specialtiesOp={specialtiesOp}
                    selectedIndustries={selectedIndustries}
                    industriesOp={industriesOp}
                    selectedCategories={selectedCategories}
                    categoriesOp={categoriesOp} />
                )}
                <div style={{ marginBottom: "20px" }}>
                  <label style={mensaje}>
                      € ¡Gana 1500€ por referir!
                  </label>
                </div>
                <CardComponent 
                  selectedSpecialties={selectedSpecialties}
                  specialtiesOp={specialtiesOp}
                  selectedSkills={selectedSkills}
                  skillsOp={skillsOp}
                  selectedIndustries={selectedIndustries}
                  industriesOp={industriesOp}
                  selectedCategories={selectedCategories}
                  categoriesOp={categoriesOp}
                  order={order}/>
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

const mensaje: React.CSSProperties = { 
  fontSize: "12px", 
  fontWeight: "400", 
  color: "#033028", 
  padding: "5px", 
  backgroundColor: "#EDF7F6", 
  alignSelf: "flex-start", 
  width: "fit-content", 
  borderRadius: "4px" 
}