import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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

const Signup = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('이메일을 반드시 입력해주세요.')
            .email('올바른 이메일 형식이 아닙니다.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8~16자 사이로 입력해주세요.')
            .max(16, '비밀번호는 8~16자 사이로 입력해주세요.')
            .required(),
        passwordcheck: yup
            .string()
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호 검증 또한 필수 입력요소입니다.'),
    });

    const {register, handleSubmit, formState: { errors }, trigger,} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            setError(null);
    
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    passwordCheck: data.passwordcheck,
                }),
            });

            console.log('Response Status:', response.status);
    
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error Data:', errorData); 
    
                if (errorData.message === 'Email already exists') {
                    throw new Error('이미 가입한 이메일입니다.');
                } else if (errorData.message === 'Invalid email format') {
                    throw new Error('올바른 이메일 형식이 아닙니다.');
                } else if (errorData.message === 'Passwords do not match') {
                    throw new Error('비밀번호가 일치하지 않습니다.');
                } else {
                    throw new Error(errorData.message || '회원가입 요청에 실패했습니다.');
                }
            }
    
            const result = await response.json();
            console.log('회원가입 성공:', result);
            alert('회원가입이 완료되었습니다!');
            navigate('/login')
        } catch (error) {
            console.error('회원가입 에러:', error.message);
            setError(error.message);
        }
    };
    
    return (
        <div>
            {error ? (
                <ErrorPage
                    message={error}
                    onRetry={() => setError(null)}
                />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className={S.signupform}>
                    <h1>회원가입</h1>
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
                            {...register('password')}
                            placeholder="비밀번호를 입력해주세요!"
                            onFocus={() => trigger('password')}
                        />
                        <p>{errors.password?.message}</p>
                    </div>

                    <div>
                        <input
                            type="password"
                            {...register('passwordcheck')}
                            placeholder="비밀번호를 다시 입력해주세요!"
                            onFocus={() => trigger('passwordcheck')}
                        />
                        <p>{errors.passwordcheck?.message}</p>
                    </div>

                    <button type="submit">회원가입</button>
                </form>
            )}
        </div>
    );
}; 

export default Signup;
