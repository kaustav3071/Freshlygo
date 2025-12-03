"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Truck, ShieldCheck, ArrowRight, Loader2, Phone } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Role = 'user' | 'deliveryPartner' | 'admin';

export default function EditRoleMobile() {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const roles = [
        { id: 'admin', label: 'Admin', icon: ShieldCheck },
        { id: 'user', label: 'User', icon: User },
        { id: 'deliveryPartner', label: 'Delivery Partner', icon: Truck },
    ] as const;

    const { update } = useSession();

    const handleSubmit = async () => {
        setError('');

        if (!selectedRole) {
            setError('Please select a role');
            return;
        }

        if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);

        try {
            await axios.post('/api/user/edit-role-mobile', {
                role: selectedRole,
                mobile: mobile
            });
            await update({ role: selectedRole });
            window.location.reload();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Select Your Role</h1>
                    <p className="text-gray-500">Complete your profile to continue</p>
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        const isSelected = selectedRole === role.id;

                        return (
                            <motion.button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 aspect-square bg-white shadow-sm
                                    ${isSelected
                                        ? 'border-purple-600 bg-purple-50 shadow-purple-100'
                                        : 'border-gray-100 hover:border-purple-200 hover:shadow-lg'
                                    }`}
                            >
                                <div className={`p-4 rounded-full ${isSelected ? 'bg-purple-100 text-purple-600' : 'bg-gray-50 text-gray-500'}`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <span className={`font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                                    {role.label}
                                </span>
                                {isSelected && (
                                    <motion.div
                                        layoutId="check"
                                        className="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Mobile Input */}
                <div className="max-w-md mx-auto space-y-8">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 text-center">
                            Enter Your Mobile No.
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                placeholder="eg. 9876543210"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm text-gray-700 placeholder-gray-400 text-center text-lg tracking-wider"
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        onClick={handleSubmit}
                        disabled={loading || !selectedRole || mobile.length !== 10}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
                            ${loading || !selectedRole || mobile.length !== 10
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-purple-200'
                            }`}
                    >
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                Go to Home
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}