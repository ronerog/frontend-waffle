import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container, Grid, CircularProgress } from "@mui/material";
import axios from "axios";

const API_URL = "https://waffle-production.up.railway.app/streaks";

const Home = () => {
  const [streakData, setStreakData] = useState<{ email: string; streak: number; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail] = useState(localStorage.getItem("userEmail") || "ronero@teste");

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await axios.get(API_URL);
        const userStreaks = response.data.filter((item: any) => item.email === userEmail);
        setStreakData(userStreaks);
      } catch (error) {
        console.error("Erro ao buscar os streaks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreaks();
  }, [userEmail]);

  const streakAtual = streakData.length > 0 ? streakData[0].streak : 0;
  const historicoAberturas = streakData.map((item) => item.created_at).slice(0, 7);

  const mensagensMotivacionais = [
    "Mantenha o ritmo! Seu streak está incrível!",
    "A constância gera resultados, continue assim!",
    "A leitura diária faz toda a diferença. Não pare agora!",
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 55px)',
        backgroundColor: "#ffffff",
        color: "#000000",
        paddingTop: '55px',
      }}
    >
      <Container maxWidth="md">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Streak Atual */}
            <Paper elevation={3} sx={{ p: 3, textAlign: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#240E0B" }}>
                Seu Streak Atual
              </Typography>
              <Typography variant="h3" sx={{ color: "#FFCE04", mt: 1 }}>
                {streakAtual} dias
              </Typography>
            </Paper>

            {/* Histórico de Aberturas */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#240E0B" }}>
                Histórico de Aberturas
              </Typography>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                {historicoAberturas.map((date, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: "#4caf50",
                      borderRadius: "50%",
                      mx: 0.5,
                    }}
                    title={new Date(date).toLocaleDateString()}
                  />
                ))}
              </Grid>
            </Paper>

            {/* Mensagens Motivacionais */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#240E0B" }}>
                Mantenha o Ritmo!
              </Typography>
              <Box sx={{ mt: 2 }}>
                {mensagensMotivacionais.map((mensagem, index) => (
                  <Typography key={index} variant="body1" sx={{ mb: 1, textAlign: "center" }}>
                    {mensagem}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Home;
