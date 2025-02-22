import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container, CircularProgress, LinearProgress, Grid2 } from "@mui/material";
import { Star } from "@mui/icons-material";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = "https://waffle-production.up.railway.app/streaks";
const userEmail = localStorage.getItem("userEmail");

const motivationalMessages = [
  "Cada leitura conta! Continue progredindo! 📖",
  "Ótimo trabalho! Seu XP está aumentando! ⭐",
  "Continue lendo para alcançar o próximo nível! 🚀",
  "Sua jornada de conhecimento está incrível! 🏆",
];

const Home = () => {
  const [streakData, setStreakData] = useState<{ streak: number; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await axios.get(`${API_URL}/${userEmail}`);
        setStreakData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os streaks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreaks();
    setRandomMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
  }, []);

  const totalLeituras = streakData.length;
  const xpAtual = totalLeituras * 50;
  const nivel = Math.floor(xpAtual / 100);
  const xpParaProximoNivel = 100 - (xpAtual % 100);
  const progressoXP = ((xpAtual % 100) / 100) * 100;

  return (
    <>
      <Header />

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bolder",
          color: "#240E0B",
          mt: { xs: 5, md: 10 },
          textShadow: "0.5px 0.5px 1.5px white",
          textAlign: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        Olá, será que você está informado o suficiente?
      </Typography>

      <Box
        sx={{
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: { xs: 3, sm: 5, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Container maxWidth="md" sx={{ flex: 1 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid2
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: "center",
                  mb: 10,
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#240E0B" }}>
                  Nível do Usuário
                </Typography>
                <Typography variant="h3" sx={{ color: "#FFCE04", mt: 1 }}>
                  {nivel}
                </Typography>

                <Typography sx={{ mt: 1, fontSize: { xs: "14px", sm: "16px" } }}>
                  XP: {xpAtual} / {xpAtual + xpParaProximoNivel}
                </Typography>

                <Box sx={{ width: "100%", mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progressoXP}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#ddd",
                      "& .MuiLinearProgress-bar": { backgroundColor: "#FFCE04" },
                    }}
                  />
                </Box>
                <Typography sx={{ mt: 1, fontSize: { xs: "14px", sm: "16px" } }}>
                  A cada leitura que você faz na nossa news, você ganha 50xp!
                </Typography>
              </Grid2>



              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: "center",
                  mb: 3,
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#240E0B" }}>
                  Progresso de Níveis
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      sx={{
                        fontSize: { xs: 30, sm: 40 },
                        mx: 0.5,
                        color: index < Math.min(nivel, 5) ? "#FFCE04" : "#bdbdbd",
                      }}
                    />
                  ))}
                </Box>
                <Typography sx={{ mt: 1, fontSize: { xs: "14px", sm: "16px" } }}>
                  {xpParaProximoNivel === 0 ? "Você atingiu um novo nível! 🎉" : `Faltam ${xpParaProximoNivel} XP para o próximo nível!`}
                </Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, md: 3 },
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#240E0B" }}>
                  Motivação do Dia
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: "center", fontSize: { xs: "14px", sm: "16px" } }}>
                  {randomMessage}
                </Typography>
              </Paper>
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
