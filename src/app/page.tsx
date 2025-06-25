"use client";

import AppBarComponent from "@/components/appBar";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  return (
    <html lang="en">
      <body>
        <AppBarComponent />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden p-4">
          {/* Botón centrado que se difumina al pulsar */}
          <AnimatePresence>
            {!showMain && (
              <motion.div
                key="cta-button"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <Button
                  size="large"
                  style={{
                    backgroundColor: "#F0FF3D",
                    color: "black",
                  }}
                  className="text-lg px-8 py-4 rounded-2xl shadow-xl"
                  onClick={() => setShowMain(true)}
                >
                  Click here to see the entrance animation
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contenido principal que entra desde la izquierda */}
          <AnimatePresence>
            {showMain && (
              <motion.section
                key="main-screen"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="w-full max-w-2xl"
              >
                <Card className="p-8 rounded-2xl shadow-xl bg-white">
                  <CardContent className="space-y-6 text-center">
                    <h1 className="text-3xl font-extrabold">Pantalla principal</h1>
                    <p className="text-lg text-gray-700">
                      ¡Bienvenido a tu aplicación Next.js con animaciones suaves! Aquí
                      verás tus datos después de pulsar el botón.
                    </p>
                  </CardContent>
                </Card>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </body>
    </html>
  );
}
