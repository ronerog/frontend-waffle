import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://waffle-production.up.railway.app";

interface Streak {
    email: string;
    streak: number;
    created_at: string;
}

export const useApi = (endpoint: string) => {
    const [data, setData] = useState<Streak[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Streak[]>(`${API_URL}/${endpoint}`);
                setData(response.data);
            } catch (err) {
                setError("Erro ao carregar os dados");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};
