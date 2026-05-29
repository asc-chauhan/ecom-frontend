import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../store/action';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-[420px]">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-2.5 bg-indigo-600 rounded-xl">
                            <FaStore className="text-white text-lg" />
                        </div>
                        <span className="text-2xl font-bold text-slate-800">E-Shop</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">Create account</h1>
                        <p className="text-slate-500 text-sm mt-1">Join us and start shopping</p>
                    </div>

                    <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
                        <InputField
                            label="Username"
                            required
                            id="username"
                            type="text"
                            message="*Username is required"
                            placeholder="Choose a username"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Email"
                            required
                            id="email"
                            type="email"
                            message="*Email is required"
                            placeholder="Enter your email"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Password"
                            required
                            id="password"
                            min={6}
                            type="password"
                            message="*Password is required"
                            placeholder="Create a password"
                            register={register}
                            errors={errors}
                        />

                        <button
                            disabled={loader}
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
                            type="submit"
                        >
                            {loader ? (
                                <>
                                    <Spinners /> Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            className="font-semibold text-indigo-600 hover:text-indigo-700"
                            to="/login"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
