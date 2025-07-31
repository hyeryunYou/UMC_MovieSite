import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiFilm } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import '../index.css';
import axios from 'axios';

export default function Header() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [nickname, setNickname] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/user/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const email = response.data.email;
                    setNickname(email.split('@')[0]);
                    setIsLoggedIn(true); 
                } catch (error) {
                    console.error('유저 정보를 불러오는 중 오류 발생:', error);
                    handleLogout(); 
                }
            }
        };
        
        // 로그인 상태 변경 감지 (localStorage 변경 감지)
        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem('accessToken');
            if (updatedToken) {
                fetchUserInfo();
            } else {
                setIsLoggedIn(false);
                setNickname('');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        // 로그아웃 시 토큰 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false); //로그아웃 -> isLoggedIn = false
        setNickname('');
        navigate('/');
    };

    return (
        <>
            <div className="logo-and-menu">
                <Link style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} to='/'>
                    <span className='logo-text'>
                        YONGCHA
                    </span>
                </Link>
                <ul className="left-wrap">
                    <li>
                        <Link className="header-nav-item" to="/search">
                            <HiSearch style={{marginRight: '7px'}} />
                            찾기
                        </Link>
                    </li>
                    <li>
                        <Link className="header-nav-item" to="/category">
                            <HiFilm style={{marginRight: '7px'}}/>
                            영화
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="auth-section">
                <ul className="top-wrap">
                    {isLoggedIn===false ? (
                        <>
                            <li>
                                <Link className="header-nav-item login-btn" to="/login">
                                    로그인
                                </Link>
                            </li>
                            <li>
                                <Link className="header-nav-item" to="/signup">
                                    회원가입
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li style={{ display: 'flex', marginRight: '10px', fontSize: '15px', fontWeight: 'bold', color: 'white'}}>
                                <span>
                                    {nickname}님 반갑습니다.
                                </span>
                            </li>
                            <li>
                                <button className="header-nav-item logout-btn" onClick={handleLogout}>
                                    로그아웃
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
}