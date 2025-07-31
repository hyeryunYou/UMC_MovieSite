import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Category from "./pages/category";
import Home from "./pages/home";
import Login from "./pages/login2";
import Search from "./pages/search";
import Signup from "./pages/signup";
import Nowplaying from "./pages/inpages/now-playing";
import Popular from "./pages/inpages/popular";
import Toprated from "./pages/inpages/top-rated";
import Upcoming from "./pages/inpages/upcoming";
import MovieDetail from "./pages/movieDetail";

function App() {
    return (
        <div className="root-layout">
                <BrowserRouter>
                    <Header />
                    <div className="content-wrap">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/now-playing" element={<Nowplaying />} />
                            <Route path="/popular" element={<Popular />} />
                            <Route path="/top-rated" element={<Toprated />} />
                            <Route path="/upcoming" element={<Upcoming />} />
                            <Route path="/movies/:movieId" element={<MovieDetail />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
    );
}

export default App;
