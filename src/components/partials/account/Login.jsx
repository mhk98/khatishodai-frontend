import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Input, Select, notification } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { storgeUserInfo } from '~/components/services/auth.service';
import { useCreateUserMutation } from '~/react-redux/features/user/user';

export default function Login() {
    const Router = useRouter();
    const searchParams = useSearchParams();

    const [phone, setPhone] = useState('');
    const [selectedCode, setSelectedCode] = useState('+880');
    const [loading, setLoading] = useState(false);

    const countryCodes = [
        { code: '+880', name: '+880 (BD)' },
        { code: '+91', name: '+91 (IN)' },
        { code: '+1', name: '+1 (US)' },
        { code: '+44', name: '+44 (UK)' },
        { code: '+81', name: '+81 (JP)' },
        { code: '+61', name: '+61 (AU)' },
        { code: '+49', name: '+49 (DE)' },
        { code: '+33', name: '+33 (FR)' },
        { code: '+86', name: '+86 (CN)' },
        { code: '+82', name: '+82 (KR)' },
        { code: '+39', name: '+39 (IT)' },
        { code: '+34', name: '+34 (ES)' },
        { code: '+7', name: '+7 (RU)' },
        { code: '+55', name: '+55 (BR)' },
        { code: '+63', name: '+63 (PH)' },
        { code: '+60', name: '+60 (MY)' },
        { code: '+65', name: '+65 (SG)' },
        { code: '+64', name: '+64 (NZ)' },
        { code: '+94', name: '+94 (LK)' },
        { code: '+62', name: '+62 (ID)' },
        { code: '+92', name: '+92 (PK)' },
        { code: '+27', name: '+27 (ZA)' },
        { code: '+234', name: '+234 (NG)' },
        { code: '+20', name: '+20 (EG)' },
        { code: '+31', name: '+31 (NL)' },
        { code: '+32', name: '+32 (BE)' },
        { code: '+47', name: '+47 (NO)' },
        { code: '+46', name: '+46 (SE)' },
        { code: '+45', name: '+45 (DK)' },
        { code: '+41', name: '+41 (CH)' },
        { code: '+52', name: '+52 (MX)' },
        { code: '+351', name: '+351 (PT)' },
        { code: '+48', name: '+48 (PL)' },
        { code: '+43', name: '+43 (AT)' },
        { code: '+90', name: '+90 (TR)' },
        { code: '+98', name: '+98 (IR)' },
        { code: '+353', name: '+353 (IE)' },
        { code: '+359', name: '+359 (BG)' },
        { code: '+420', name: '+420 (CZ)' },
        { code: '+386', name: '+386 (SI)' },
        { code: '+598', name: '+598 (UY)' },
        { code: '+51', name: '+51 (PE)' },
        { code: '+56', name: '+56 (CL)' },
        { code: '+54', name: '+54 (AR)' },
        { code: '+356', name: '+356 (MT)' },
        { code: '+372', name: '+372 (EE)' },
    ];

    const validatePhoneNumber = (_, value) => {
        const regexMap = {
            '+880': /^(\+8801)[3-9]\d{8}$/,
            '+91': /^(\+91)[6-9]\d{9}$/,
            '+1': /^(\+1)\d{10}$/,
        };

        if (!value) {
            return Promise.reject('Please input your phone number!');
        }

        if (!regexMap[selectedCode]?.test(`${selectedCode}${value}`)) {
            return Promise.reject(`Invalid phone number for ${selectedCode}!`);
        }

        return Promise.resolve();
    };

    const [createUser] = useCreateUserMutation();

    // const handleLogin = async (values) => {
    //     const { phoneNumber } = values;
    //     const redirectTo = searchParams.get('redirect') || '/'; // Get redirect URL from query params

    //     setLoading(true);

    //     try {
    //         const response = await axios.post('https://backend.eaconsultancy.info/api/v1/user/login', {
    //             // phone: `${selectedCode}${phoneNumber}`,
    //             Phone: phoneNumber
    //         });
    //         // const Phone = phoneNumber;

    //         // const response = await createUser({ Phone });

    //         if (response.data.success) {
    //             notification.success({
    //                 message: 'Success',
    //                 description: response.data.message,
    //             });

    //             console.log('userId', response)
    //             storgeUserInfo({ accessToken: response.data.data.accessToken});

    //             Router.push(redirectTo); // Redirect to the intended page after login
    //         }

    //         console.log("response", response)
    //     } catch (err) {
    //         notification.error({
    //             message: 'Login Failed',
    //             description: err.response?.data?.message || 'Something went wrong!',
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleLogin = async (values) => {
        const { phoneNumber } = values;
        const redirectTo = searchParams.get('redirect') || '/';

        setLoading(true);

        try {
            const response = await fetch(
                'https://backend.eaconsultancy.info/api/v1/user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Phone: phoneNumber,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success === true) {
                notification.success({
                    message: 'Success',
                    description: data.message,
                });

                console.log('loginResponse', data.data.user.Id);
                localStorage.setItem('userId', data.data.user.Id);
                storgeUserInfo({ accessToken: data.data.accessToken });

                Router.push(redirectTo);
            } else {
                notification.error({
                    message: 'Login Failed',
                    description: data.message || 'Something went wrong!',
                });
            }
        } catch (err) {
            notification.error({
                message: 'Login Failed',
                description: err.message || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form className="ps-form--account" onFinish={handleLogin}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href={'/account/login'}>Login</Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <h5 className="text-center">
                                Please Enter Your Mobile Phone Number
                            </h5>
                            <div className="form-group">
                                <Form.Item
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            validator: validatePhoneNumber,
                                        },
                                    ]}>
                                    <Input
                                        addonBefore={
                                            <Select
                                                defaultValue={selectedCode}
                                                style={{ width: 160 }}
                                                onChange={(value) =>
                                                    setSelectedCode(value)
                                                }>
                                                {countryCodes.map((country) => (
                                                    <Select.Option
                                                        key={country.code}
                                                        value={country.code}>
                                                        {country.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        }
                                        placeholder="Enter phone number"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    disabled={loading}>
                                    {loading
                                        ? 'Logging in...'
                                        : 'Login / Sign Up'}
                                </button>
                                <p className="mt-4 text-xs text-center text-gray-500">
                                    This site is protected by reCAPTCHA and the
                                    Google{' '}
                                    <a
                                        href="https://policies.google.com/privacy"
                                        style={{ color: '#5fa30f' }}>
                                        Privacy Policy
                                    </a>{' '}
                                    and{' '}
                                    <a
                                        href="https://policies.google.com/terms"
                                        style={{ color: '#5fa30f' }}>
                                        Terms of Service
                                    </a>{' '}
                                    apply.
                                </p>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
