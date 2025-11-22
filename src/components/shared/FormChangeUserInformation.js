// import { Select } from 'antd';
// import React, { useState } from 'react';

// const FormChangeUserInformation = () => {
//     const [selectedCode, setSelectedCode] = useState('+880');
//     const [loading, setLoading] = useState(false);

//     const userId = localStorage.getItem('userId');

//     const countryCodes = [
//         { code: '+880', name: '+880 (BD)' },
//         { code: '+91', name: '+91 (IN)' },
//         { code: '+1', name: '+1 (US)' },
//         { code: '+44', name: '+44 (UK)' },
//         { code: '+81', name: '+81 (JP)' },
//         { code: '+61', name: '+61 (AU)' },
//         { code: '+49', name: '+49 (DE)' },
//         { code: '+33', name: '+33 (FR)' },
//         { code: '+86', name: '+86 (CN)' },
//         { code: '+82', name: '+82 (KR)' },
//         { code: '+39', name: '+39 (IT)' },
//         { code: '+34', name: '+34 (ES)' },
//         { code: '+7', name: '+7 (RU)' },
//         { code: '+55', name: '+55 (BR)' },
//         { code: '+63', name: '+63 (PH)' },
//         { code: '+60', name: '+60 (MY)' },
//         { code: '+65', name: '+65 (SG)' },
//         { code: '+64', name: '+64 (NZ)' },
//         { code: '+94', name: '+94 (LK)' },
//         { code: '+62', name: '+62 (ID)' },
//         { code: '+92', name: '+92 (PK)' },
//         { code: '+27', name: '+27 (ZA)' },
//         { code: '+234', name: '+234 (NG)' },
//         { code: '+20', name: '+20 (EG)' },
//         { code: '+31', name: '+31 (NL)' },
//         { code: '+32', name: '+32 (BE)' },
//         { code: '+47', name: '+47 (NO)' },
//         { code: '+46', name: '+46 (SE)' },
//         { code: '+45', name: '+45 (DK)' },
//         { code: '+41', name: '+41 (CH)' },
//         { code: '+52', name: '+52 (MX)' },
//         { code: '+351', name: '+351 (PT)' },
//         { code: '+48', name: '+48 (PL)' },
//         { code: '+43', name: '+43 (AT)' },
//         { code: '+90', name: '+90 (TR)' },
//         { code: '+98', name: '+98 (IR)' },
//         { code: '+353', name: '+353 (IE)' },
//         { code: '+359', name: '+359 (BG)' },
//         { code: '+420', name: '+420 (CZ)' },
//         { code: '+386', name: '+386 (SI)' },
//         { code: '+598', name: '+598 (UY)' },
//         { code: '+51', name: '+51 (PE)' },
//         { code: '+56', name: '+56 (CL)' },
//         { code: '+54', name: '+54 (AR)' },
//         { code: '+356', name: '+356 (MT)' },
//         { code: '+372', name: '+372 (EE)' },
//     ];

//     const validatePhoneNumber = (_, value) => {
//         const regexMap = {
//             '+880': /^(\+8801)[3-9]\d{8}$/,
//             '+91': /^(\+91)[6-9]\d{9}$/,
//             '+1': /^(\+1)\d{10}$/,
//         };

//         if (!value) {
//             return Promise.reject('Please input your phone number!');
//         }

//         if (!regexMap[selectedCode]?.test(`${selectedCode}${value}`)) {
//             return Promise.reject(`Invalid phone number for ${selectedCode}!`);
//         }

//         return Promise.resolve();
//     };

//     const handleUpdateUserInformation = async (values) => {
//         const { phoneNumber } = values;

//         setLoading(true);

//         try {
//             const response = await fetch(
//                 `https://backend.eaconsultancy.info/api/v1/user/${userId}`,
//                 {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         Phone: phoneNumber,
//                     }),
//                 }
//             );

//             const data = await response.json();

//             if (response.ok && data.success === true) {
//                 notification.success({
//                     message: 'Success',
//                     description: data.message,
//                 });
//             } else {
//                 notification.error({
//                     message: 'Update Failed',
//                     description: data.message || 'Something went wrong!',
//                 });
//             }
//         } catch (err) {
//             notification.error({
//                 message: 'Update Failed',
//                 description: err.message || 'Something went wrong!',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form
//             className="ps-form--account-setting"
//             onSubmit={handleUpdateUserInformation}>
//             <div className="ps-form__header">
//                 <h3>Account Information</h3>
//             </div>
//             <div className="ps-form__content">
//                 {/* <div className="form-group">
//                     <input
//                         className="form-control"
//                         type="text"
//                         placeholder="Username or email address"
//                     />
//                 </div> */}
//                 <div className="row">
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="First name"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Last name"
//                             />
//                         </div>
//                     </div>

//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Phone Number"
//                                 rules={[
//                                     {
//                                         validator: validatePhoneNumber,
//                                     },
//                                 ]}
//                                 addonBefore={
//                                     <Select
//                                         defaultValue={selectedCode}
//                                         style={{ width: 160 }}
//                                         onChange={(value) =>
//                                             setSelectedCode(value)
//                                         }>
//                                         {countryCodes.map((country) => (
//                                             <Select.Option
//                                                 key={country.code}
//                                                 value={country.code}>
//                                                 {country.name}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 }
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Email Address"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-sm-12">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Address"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="form-group submit">
//                     <button className="ps-btn" disabled={loading}>
//                         {' '}
//                         {loading ? 'Submit...' : 'Update Profile'}
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );
// };

// export default FormChangeUserInformation;

import React, { useState } from 'react';
import { Form, Input, Button, notification, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { getUserInfo } from '../services/auth.service';

const FormChangeUserInformation = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    console.log('imageFile', imageFile);
    console.log('previewUrl', previewUrl);

    const token = getUserInfo();
    const id = token?.userId; // ✅ user_id fix করা হলো

    const handleUpdateUserInformation = async (values) => {
        const formData = new FormData();
        formData.append('FirstName', values.firstName);
        formData.append('LastName', values.lastName);
        formData.append('Email', values.email);
        formData.append('Address', values.address);
        formData.append('Phone', values.phoneNumber);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        console.log('FormDate', formData);
        setLoading(true);

        try {
            const response = await fetch(
                `https://backend.eaconsultancy.info/api/v1/user/${id}`,
                {
                    method: 'PUT',
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok && data.success === true) {
                notification.success({
                    message: 'Success',
                    description:
                        data.message || 'Profile updated successfully!',
                });
            } else {
                notification.error({
                    message: 'Update Failed',
                    description: data.message || 'Something went wrong!',
                });
            }
        } catch (err) {
            notification.error({
                message: 'Update Failed',
                description: err.message || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    // const handleImageChange = (info) => {
    //     const file = info.file.originFileObj;
    //     if (file) {
    //         setImageFile(file);
    //         setPreviewUrl(URL.createObjectURL(file));
    //     }
    // };

    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList && fileList.length > 0) {
            const file = fileList[0].originFileObj;
            if (file) {
                setImageFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            }
        }
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleUpdateUserInformation}
            form={form}
            className="ps-form--account-setting">
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>

            <div className="ps-form__content">
                <div className="form-group mb-4">
                    <label>Profile Image</label>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}>
                        <Avatar
                            size={64}
                            src={previewUrl}
                            icon={!previewUrl && <UserOutlined />}
                        />
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                            accept="image/*">
                            <Button icon={<UploadOutlined />}>
                                Choose Image
                            </Button>
                        </Upload>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <Form.Item name="firstName" label="First Name">
                            <Input
                                className="form-control"
                                placeholder="First name"
                            />
                        </Form.Item>
                    </div>

                    <div className="col-sm-6">
                        <Form.Item name="lastName" label="Last Name">
                            <Input
                                className="form-control"
                                placeholder="Last name"
                            />
                        </Form.Item>
                    </div>

                    <div className="col-sm-6">
                        <Form.Item name="phoneNumber" label="Phone Number">
                            <Input
                                className="form-control"
                                placeholder="Phone number"
                            />
                        </Form.Item>
                    </div>

                    <div className="col-sm-6">
                        <Form.Item name="email" label="Email Address">
                            <Input
                                className="form-control"
                                placeholder="Email Address"
                            />
                        </Form.Item>
                    </div>

                    <div className="col-sm-6">
                        <Form.Item name="address" label="Address">
                            <Input
                                className="form-control"
                                placeholder="Address"
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className="form-group submit">
                    <Form.Item>
                        <Button htmlType="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Update Profile'}
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default FormChangeUserInformation;
