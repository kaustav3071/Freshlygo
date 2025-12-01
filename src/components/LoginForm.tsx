'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
} as const;

const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
} as const;

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const validateEmail = (email: string): string => {
        if (!email.trim()) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePassword = (password: string): string => {
        if (!password) {
            return 'Password is required';
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (touched[name as keyof typeof touched]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleBlur = (field: keyof typeof formData) => {
        setTouched({
            ...touched,
            [field]: true
        });

        let error = '';
        if (field === 'email') {
            error = validateEmail(formData.email);
        } else if (field === 'password') {
            error = validatePassword(formData.password);
        }

        setErrors({
            ...errors,
            [field]: error
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                alert('Invalid email or password');
                setLoading(false);
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const isFormValid = formData.email !== '' && formData.password !== '' &&
        errors.email === '' && errors.password === '';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -30, 40, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        x: [0, -40, 30, 0],
                        y: [0, 40, -30, 0],
                        scale: [1, 0.8, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            {/* Form Container */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariant}
                className="relative z-10 w-full max-w-md"

            >
                {/* Form Card */}
                <motion.div
                    variants={itemVariant}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20"
                    whileHover={{ boxShadow: "0 25px 60px rgba(147, 51, 234, 0.15)" }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <motion.div variants={itemVariant} className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h1>
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-gray-500 text-sm">Login to FreshlyGo</p>
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                className="text-lg"
                            >
                                👋
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <motion.div variants={itemVariant}>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <motion.input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('email')}
                                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-700 placeholder-gray-400 ${touched.email && errors.email
                                        ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                                        : 'border-gray-200 focus:ring-purple-500 focus:border-transparent'
                                        }`}
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                            </div>
                            <AnimatePresence>
                                {touched.email && errors.email && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 mt-2 text-red-500 text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.email}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password Input */}
                        <motion.div variants={itemVariant}>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <motion.input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Your Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('password')}
                                    className={`w-full pl-12 pr-12 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-700 placeholder-gray-400 ${touched.password && errors.password
                                        ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                                        : 'border-gray-200 focus:ring-purple-500 focus:border-transparent'
                                        }`}
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <AnimatePresence>
                                {touched.password && errors.password && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 mt-2 text-red-500 text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.password}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Register Button */}
                        <motion.div variants={itemVariant}>
                            <motion.button
                                type="submit"
                                disabled={!isFormValid && (touched.email || touched.password)}
                                className={`w-full font-semibold py-4 rounded-xl shadow-lg relative overflow-hidden transition-all duration-200 ${!isFormValid && (touched.email || touched.password)
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white'
                                    }`}
                                whileHover={isFormValid ? {
                                    scale: 1.02,
                                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
                                } : {}}
                                whileTap={isFormValid ? { scale: 0.98 } : {}}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : 'Login'}
                                </span>
                                {isFormValid && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-700 to-violet-700"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Divider */}
                        <motion.div variants={itemVariant} className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-gray-400 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </motion.div>

                        {/* Google Sign In */}
                        <motion.div variants={itemVariant}>
                            <motion.button
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                                type="button"
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-medium py-4 rounded-xl hover:border-purple-300 transition-all duration-200"
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: "rgb(196, 181, 253)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span>Continue with Google</span>
                            </motion.button>
                        </motion.div>

                        {/* Sign In Link */}
                        <motion.div variants={itemVariant} className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{' '}
                                <Link href="/register">
                                    <motion.span
                                        className="text-purple-600 font-semibold hover:text-purple-700 cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        Sign Up
                                    </motion.span>
                                </Link>
                            </p>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default LoginForm;