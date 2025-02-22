import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container, CircularProgress, LinearProgress, Grid2, Grid } from "@mui/material";
import { Star, Today, DateRange, CalendarToday, AllInclusive } from "@mui/icons-material";
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

  function calcularNivel(xp: number): { nivel: number; xpParaProximoNivel: number; progressoXP: number } {
    let nivel = 1; 
    let xpNecessario = 100; 
    let xpAcumulado = 0;

    while (xp >= xpAcumulado + xpNecessario) {
      xpAcumulado += xpNecessario;
      nivel++;
      xpNecessario = 100 * Math.pow(nivel, 2);
    }

    const xpParaProximoNivel = xpNecessario - (xp - xpAcumulado);
    const progressoXP = ((xp - xpAcumulado) / xpNecessario) * 100;

    return {
      nivel,
      xpParaProximoNivel,
      progressoXP,
    };
  }

  const { nivel, xpParaProximoNivel, progressoXP } = calcularNivel(xpAtual);


  const leiturasHoje = streakData.filter(item => new Date(item.created_at).toDateString() === new Date().toDateString()).length;
  const leiturasMes = streakData.filter(item => new Date(item.created_at).getMonth() === new Date().getMonth()).length;
  const leiturasAno = streakData.filter(item => new Date(item.created_at).getFullYear() === new Date().getFullYear()).length;


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
                  mb: 5,
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

              <Box
                sx={{
                  backgroundColor: "#FFFAE5",
                  borderRadius: "12px",
                  p: { xs: 3, md: 4 },
                  mb: 3,
                  textAlign: "center",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#240E0B", mb: 2 }}>
                  Histórico de Leituras 📊
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        backgroundColor: "#FFCE04",
                        color: "#240E0B",
                        borderRadius: "8px",
                        p: 2,
                        textAlign: "center",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Today sx={{ fontSize: 30 }} />
                      <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                        Hoje
                      </Typography>
                      <Typography variant="h6">{leiturasHoje} news</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        backgroundColor: "#FFCE04",
                        color: "#240E0B",
                        borderRadius: "8px",
                        p: 2,
                        textAlign: "center",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <DateRange sx={{ fontSize: 30 }} />
                      <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                        Mensal
                      </Typography>
                      <Typography variant="h6">{leiturasMes} news</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        backgroundColor: "#FFCE04",
                        color: "#240E0B",
                        borderRadius: "8px",
                        p: 2,
                        textAlign: "center",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CalendarToday sx={{ fontSize: 30 }} />
                      <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                        Anual
                      </Typography>
                      <Typography variant="h6">{leiturasAno} news</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        backgroundColor: "#FFCE04",
                        color: "#240E0B",
                        borderRadius: "8px",
                        p: 2,
                        textAlign: "center",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <AllInclusive sx={{ fontSize: 30 }} />
                      <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                        Total
                      </Typography>
                      <Typography variant="h6">{totalLeituras} news</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

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
