import styled from "styled-components"

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 18px;

    input {
        flex: 1;
        padding: 4px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        border: 1px solid rgb(220,220,220);
    }

    button {
        width: 80px;
        background-color: red;
        color: white;
        cursor: pointer;
        border: none;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        }
`

const MovieContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    flex-wrap: wrap;
    gap: 10px;
`;

const MovieItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px; 
    box-sizing: border-box;
    padding: 5px;
    height: 280px; 
    background-image: cover;
`;

const Main = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
`;

const MainItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: left;
    width: 165px;
    height: 300px;
    border-radius: 10px;
`;

const MovieImage = styled.img`
    width: 150px;
    height: 225px;
    margin: 0px;
    margin-bottom: 10px;
    border-radius: 10px;
`;

const MovieTitle = styled.h4`
    color: white;
    font-size: 14px;
    line-height: 1;
    height: 22px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    width: 100%;
    text-align: left;
    margin-left: 10px;
`;

const MovieDate = styled.span`
    color: white;
    font-size: 11px !important;
    text-align: left;
    height: 25px;
    width: 100%;
    margin-left: 10px;
`;

export {
    SearchContainer,
    MovieContainer,
    MovieItem,
    Main,
    MainItem,
    MovieImage,
    MovieTitle,
    MovieDate
};
