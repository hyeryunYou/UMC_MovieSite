import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom';
import S from './Login.module.css';

//에러관리
const ErrorPage = ({ message, onRetry }) => {
    return (
        <div className={S.errorPage}>
            <h2>오류 발생</h2>
            <p>{message}</p>
            <button onClick={onRetry}>다시 시도</button>
        </div>
    );
};

const Login = () => {
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required('이메일을 반드시 입력해주세요.').email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!'),
        password: yup.string().min(8, '비밀번호는 8~16자 사이로 입력해주세요!').max(16, '비밀번호는 8~16자 사이로 입력해주세요!').required(),
    })

    const {register, handleSubmit, formState: {errors}, trigger} = useForm({
        resolver: yupResolver(schema), mode:'onChange',
    });

    const onSubmit = async (data) => {
        try {
            setError(null);
        
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });


            const result = await response.json();

            if (!response.ok) {
                if (result.message === 'User not found') { 
                    throw new Error('잘못된 로그인 정보입니다.');
                } else {
                    throw new Error(result.message || '로그인 요청에 실패했습니다.');
                }
            }

            console.log('로그인 성공:', result);
            alert('로그인이 완료되었습니다!');

            //AccessToken, RefreshToken  저장
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);

            window.dispatchEvent(new Event('storage'));

            //AccessToken 만료 시 새로운 AccessToken 발급
            if (result.accessToken && result.refreshToken) {
                const refreshResponse = await fetch('http://localhost:3000/auth/token/access', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${result.refreshToken}`,
                    },
                });

                const refreshResult = await refreshResponse.json();

                if (refreshResponse.ok) {
                    localStorage.setItem('accessToken', refreshResult.accessToken);
                    console.log('AccessToken 갱신 성공:', refreshResult.accessToken);
                } else {
                    console.error('AccessToken 갱신 실패:', refreshResult.message);
                }
            }

            navigate('/');
        } catch (error) {
            console.error('로그인 에러:', error.message);
            setError(error.message);
        }
    };

    const handleRetry = () => {
        setError(null);
    };

    return (
        <>
            {error ? ( 
                <ErrorPage message={error} onRetry={handleRetry} />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className={S.signupform}>
                    <h1>로그인</h1>
                    <div>
                        <input
                            type="email"
                            {...register('email')}
                            placeholder="이메일을 입력해주세요!"
                            onFocus={() => trigger('email')}
                        />
                        <p>{errors.email?.message}</p>
                    </div>

                    <div>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="비밀번호를 입력해주세요!"
                            onFocus={() => trigger("password")}
                        />
                        <p>{errors.password?.message}</p>
                    </div>

                    <button type="submit">로그인</button>
                </form>
            )}
        </>
    );
};
export default Login;