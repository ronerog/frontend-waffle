import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import Header from "../components/Header";

const API_URL = "https://waffle-production.up.railway.app/streaks";
const userEmail = localStorage.getItem("userEmail");

const motivationalMessages = [
  "Cada dia conta! Continue com sua rotina de leitura!",
  "Parabéns! Você está construindo um ótimo hábito!",
  "Persistência é a chave do sucesso! Continue lendo!",
  "Seu streak está incrível! Mantenha o ritmo!",
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

  const streakAtual = streakData.length > 0 ? streakData[0].streak : 0;
  const historicoAberturas = streakData.slice(0, 7);

  return (
    <>
      <Header />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bolder",
          color: "#240E0B",
          mt: 10,
          textShadow: "0.5px 0.5px 1.5px white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Olá, será que você está informado o suficiente?
      </Typography>
      <Box
        sx={{
          minHeight: "calc(100vh - 55px)",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: 15,
        }}
      >
        <Container maxWidth="md">
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#240E0B" }}>
                  Seu Streak Atual
                </Typography>
                <Typography variant="h3" sx={{ color: "#FFCE04", mt: 1 }}>
                  {streakAtual} dias
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  {streakAtual === 0
                    ? "Vamos aumentar esse streak aí, faça já uma leitura diária!"
                    : streakAtual < 5
                      ? "Você está indo bem, continue se informando!"
                      : "Sua informação é mais de 9000! Você está muito informado!"}
                </Typography>
              </Paper>

              <Paper elevation={3} sx={{ p: 3, textAlign: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#240E0B" }}>
                  Progresso de Níveis
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 30,
                        height: 30,
                        mx: 1,
                        borderRadius: "50%",
                        backgroundColor: index < Math.min(streakAtual, 5) ? "#FFCE04" : "#bdbdbd",
                      }}
                    />
                  ))}
                </Box>
                <Typography sx={{ mt: 1 }}>
                  {streakAtual >= 10 ? "Você atingiu o nível máximo!" : "Continue para chegar ao próximo nível!"}
                </Typography>
              </Paper>

              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#240E0B" }}>
                  Histórico de Aberturas
                </Typography>
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                  {historicoAberturas.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#FFCE04",
                        borderRadius: "50%",
                        mx: 0.5,
                      }}
                      title={new Date(item.created_at).toLocaleDateString()}
                    />
                  ))}
                </Grid>
              </Paper>

              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#240E0B" }}>
                  Motivação do Dia
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
                  {randomMessage}
                </Typography>
              </Paper>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home;
