"use client";

import AppBarComponent from "@/components/appBar";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";
import DialogComponent from "@/components/dialog";


export default function Home() {
  const [visible, setShowMain] = useState(false);
  return (
    <html lang="en">
      <body>
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
                <DialogComponent/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </body>
    </html>
  );
}

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
}