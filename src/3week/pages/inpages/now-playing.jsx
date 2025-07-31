import { useEffect, useState } from "react";
import axios from "axios";
import S from "../../style.module.css"; 
import { axiosInstance } from "../../../apis/axios-instance";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { useNavigate } from "react-router-dom";

const baseURL = "https://image.tmdb.org/t/p/w500"; 

export default function Now() {
    const {data:movies=[], isLoading, isError} = useCustomFetch('/movie/now_playing?language=ko-kr&page=1');
    const navigate = useNavigate();


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading data. Please check your API configuration.</p>;
    }

    console.log("Movies data:", movies); // 데이터 구조 확인

    return (
        <div className= {S.moviecontainer}>
            <main className={S.main}>
                {movies.map((movie, index) => (
                    <div 
                        key={index} 
                        style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '165px', height: '300px' }}
                        onClick={() => navigate(`/movies/${movie.id}`)} 
                    >
                        <img 
                            src={baseURL + movie.poster_path} 
                            alt={movie.title} 
                        />
                        <h4>{movie.title}</h4>
                        <span>{movie.release_date}</span>
                    </div>
                ))}
            </main>
        </div>
    );
}
