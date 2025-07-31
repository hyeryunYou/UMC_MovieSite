import { useState, useEffect } from 'react';
import * as S from './search.style.js'
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCustomFetch from '../../hooks/useCustomFetch.js';
import SearchMovieList from '../components/Movie/search-movie-list.jsx';

const search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    })

    const mq = searchParams.get('mq')

    const handleSearchMovie = () => {
        if (mq===searchValue) 
            return;
        navigate(`./search?mq=${searchValue}`)
    }

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    }

    const fetchMovies = async () => {
        // 사용 중인 `useCustomFetch` 또는 `fetch`로 데이터를 가져옵니다.
        const data = await useCustomFetch(`/movies?query=${mq}`);
        if (data) {
            setMovies(data.results); // 데이터 상태 업데이트
        }
    };

    useEffect(() => {
        if (mq) {
            fetchMovies();
        }
    }, [mq]);
    
    const baseURL = "https://image.tmdb.org/t/p/w500"; 

    return (
        <>
            <S.SearchContainer>
                <input placeholder="영화 제목을 입력해주세요..." value={searchValue} onChange={onChangeSearchValue}
                   onKeyDown={handleSearchMovieWithKeyboard}/>
                <button onClick ={(handleSearchMovie)}>검색</button>
            </S.SearchContainer>

            <S.MovieContainer>
                <S.Main>
                    {movies.map((movie, index) => (
                        <S.MainItem 
                            key={index}
                            onClick={() => navigate(`/movies/${movie.id}`)}
                        >
                            <S.MovieImage 
                                src={baseURL + movie.poster_path}
                                alt={movie.title}
                            />
                            <S.MovieTitle>{movie.title}</S.MovieTitle>
                            <S.MovieDate>{movie.release_date}</S.MovieDate>
                        </S.MainItem>
                    ))}
                </S.Main>
            </S.MovieContainer>

            <SearchMovieList/>
        </>
    )
}

export default search;