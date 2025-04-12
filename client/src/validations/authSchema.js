import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string().required('Username không được để trống').min(3),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập địa chỉ email'),
    password: yup.string().min(6).required('Vui lòng nhập mật khẩu của bạn'),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập địa chỉ email'),
    password: yup.string().required('Vui lòng nhập mật khẩu của bạn'),
});
