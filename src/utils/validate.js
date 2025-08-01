const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z]{2,}$/;

function validateUser(values={}) {
    const errors = {
        email: '',
        password: '',
    }


    if (emailPattern.test(values.email) === false) {
        errors.email = '올바른 이메일 형식이 아닙니다!';
    }

    if (!values.password) {
        errors.password = '비밀번호는 8~16자 사이로 입력해주세요!';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = '비밀번호는 8~16자 사이로 입력해주세요!';
    }

    return errors;
}

function validateLogin(values) {
    return validateUser(values);
}

export {validateLogin}