import * as S from "../../pages/search.style.js";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardSkeleton from "../../Skeleton/card-skeleton.jsx";
import CardListSkeleton from "../../Skeleton/CardListSkeleton.jsx";

const SearchMovieList = () => {
    const [searchParams, setSearchParams] = useSearchParams({mq: ''})
    const mq = searchParams.get('mq');
    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;
    const {data: movies, isLoading, isError} = useCustomFetch(url)

    if (!isLoading) {
        return (
            <S.MovieContainer>
                <CardListSkeleton number={20}/>
            </S.MovieContainer>
        )
    }

    if (mq && movies.data?.results.length === 0) {
        return (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <h1 style={{color:'white'}}>해당하는 검색어 {mq}</h1>에
                <h1 style={{color:'white'}}>해당하는 데이터가 없습니다.</h1>
            </div>
        )
    }


    const baseURL = "https://image.tmdb.org/t/p/w500"; 

    return (
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
    )
}

export default SearchMovieList