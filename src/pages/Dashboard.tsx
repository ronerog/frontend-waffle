import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = "https://waffle-production.up.railway.app/streaks";
const USER_API = "https://waffle-production.up.railway.app/users";

interface StreakData {
    email: string;
    streak: number;
    utm_campaign?: string;
}

const Dashboard = () => {
    const [streakData, setStreakData] = useState<StreakData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<{ email: string; adm: number } | null>(null);
    const [filter, setFilter] = useState<string>("all");

    useEffect(() => {
        const fetchUser = async () => {
            const email = localStorage.getItem("userEmail");
            if (!email) {
                window.location.href = "/";
                return;
            }
            try {
                const response = await axios.get(`${USER_API}/${email}`);
                if (response.data.adm !== 1) {
                    window.location.href = "/home";
                }
                setUser(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                window.location.href = "/";
            }
        };

        const fetchStreaks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token não encontrado, redirecionando para login...");
                    window.location.href = "/login";
                    return;
                }

                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setStreakData(response.data as StreakData[]);
            } catch (error) {
                console.error("Erro ao buscar streaks:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchUser();
        fetchStreaks();
    }, []);

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilter(event.target.value as string);
    };

    const filteredData = streakData.filter(item =>
        filter === "all" || item.utm_campaign === filter
    );

    const readerRanking: Record<string, number> = filteredData.reduce((acc, { email, streak }) => {
        acc[email] = (acc[email] || 0) + (typeof streak === "number" ? streak : 0);
        return acc;
      }, {} as Record<string, number>);
      

      const sortedRanking: [string, number][] = Object.entries(readerRanking)
      .map(([email, streak]) => [email, Number(streak)] as [string, number])
      .sort((a, b) => b[1] - a[1]); 


    const chartData = {
        labels: sortedRanking.slice(0, 5).map(([email]) => email),
        datasets: [
            {
                label: "Streaks Acumulados",
                data: sortedRanking.slice(0, 5).map(([_, streak]) => streak),
                backgroundColor: "#FFCE04",
            },
        ],
    };

    return (
        <>
            <Header />
            <Container>
                <Typography variant="h4" sx={{ fontWeight: "bold", mt: 5, textAlign: "center" }}>
                    Dashboard Administrativo
                </Typography>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/* Nao recebi os dados corretos via webhook para serem filtrados. Neste caso, para filtrar utilizei os dados que gerei para criar o DB*/}
                        <Paper sx={{ p: 3, mt: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Filtrar por Newsletter
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Newsletter</InputLabel>
                                <Select value={filter} onChange={handleFilterChange}>
                                    <MenuItem value="all">Todas</MenuItem>
                                    <MenuItem value="newsletter">Newsletter</MenuItem>
                                    <MenuItem value="weekly_newsletter">Weekly Newsletter</MenuItem>
                                    <MenuItem value="invite_friends">Convites</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>

                        <Paper sx={{ p: 3, mt: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Ranking dos Leitores Mais Engajados
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Streak Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sortedRanking.slice(0, 10).map(([email, streak]) => (
                                            <TableRow key={email}>
                                                <TableCell>{email}</TableCell>
                                                <TableCell>{streak}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper sx={{ p: 3, mt: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Gráfico de Engajamento
                            </Typography>
                            <Bar data={chartData} />
                        </Paper>
                    </>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Dashboard;
