import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Category() {
    return (
        <div className='page-container'>
            <div style={{
            marginTop: '15px',
            fontSize: '40px',
            fontWeight: 'bold',
            marginBottom: '32px',
            color: 'white'
            }}>카테고리</div>

            <div className="category-grid">
                <div className="category-item">
                    <Link className="category-link" to="/now-playing">
                        <div className="category-content">
                            <img src="https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/13/119271053.1.jpg" alt="현재 상영 중" />
                            <span className="category-text">현재 상영중인</span>
                        </div>
                    </Link>
                </div>
                <div className="category-item">
                    <Link className="category-link" to="/popular">
                        <div className="category-content">
                            <img src="https://cdn.imweb.me/thumbnail/20200204/3cf256fff6aa8.jpg" alt="인기 있는" />
                            <span className="category-text">인기있는</span>
                        </div>
                    </Link>
                </div>
                <div className="category-item">
                    <Link className="category-link" to="/top-rated">
                        <div className="category-content">
                            <img src="https://i.namu.wiki/i/9qwvY95bmkj5R6XA43VifN7uu2dPTSfs6N2HboeD3g1zS0ONoDtMuaheUzl02Sh2bytDdLA8DoOqbbrXWtKxTQ.webp" alt="높은 평가를 받은" />
                            <span className="category-text">높은 평가를 받은</span>
                        </div>
                    </Link>
                </div>
                <div className="category-item">
                    <Link className="category-link" to="/upcoming">
                        <div className="category-content">
                            <img src="https://dimg.donga.com/wps/NEWS/IMAGE/2019/04/03/94866263.3.jpg" alt="개봉 예정작" />
                            <span className="category-text">개봉 예정중인</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
