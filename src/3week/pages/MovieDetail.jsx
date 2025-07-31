import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import S from "../detail.module.css";

const baseURL = import.meta.env.VITE_MOVIE_API_URL;
const token = import.meta.env.VITE_TMDB_TOKEN;

export default function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${baseURL}/movie/${movieId}?language=ko-kr`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMovie(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    return (
        <div className={S.container}>
            <div className={S.posterWrapper}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            </div>
            <div className={S.infoWrapper}>
                <h1>{movie.title}</h1>
                <p>평균 {movie.vote_average}</p>
                <p>{movie.release_date}</p>
                <p>{movie.runtime}분</p>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
}