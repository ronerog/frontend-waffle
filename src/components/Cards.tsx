import { useState, useEffect } from "react";
import { Box, TextField, CircularProgress, Grid, Button, Typography, Autocomplete } from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import React from "react";

const status = [
    {
        icone: LocalFireDepartmentIcon,
        label: "Quantidade de Streaks Atual",
        quantidade: 0
     },
    {
        icone: LocalFireDepartmentIcon,
        label: "Quantidade de Streaks Atual",
        quantidade: 0
     },
     {
        icone: LocalFireDepartmentIcon,
        label: "Quantidade de Streaks Atual",
        quantidade: 0
     },
]

const CardsFluxo: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [informacoesBox, setInformacoesBox] = useState<any>(status);

  
  return (
      <> 
      <Grid container spacing={2} sx={{ marginTop: '20px', marginBottom: '10px' }}>
        {informacoesBox.map((item: any, index: any) => (
          <Grid key={index} item xs={12} md={12 / status.length}>
            <Box
              bgcolor="#FFCE04"
              p={2}
              sx={{
                border: "1px solid rgb(201, 201, 201)",
                borderRadius: "8px",
               
                minHeight: '150px',
                display: 'flex', 
                flexDirection: 'column', 
                position: 'relative', 
                transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                '&:hover': {
                  transform: 'translateY(-10px)', 
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                },

                transform: selectedIndex === index ? 'translateY(-10px)' : 'translateY(0)',
                boxShadow: selectedIndex === index ? '0 10px 20px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(173, 167, 167, 0.1)',
              }}
            >

              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <item.icone sx={{ fontSize: 42, color: "#FFFFFF"}} />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: "#000000"}}>
                  {item.label}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  fontSize: '1.3rem',
                  textAlign: 'right',
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                }}
              >
                Streaks: {item.quantidade}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default CardsFluxo;
