"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Search, ShoppingCart, User, Package, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from 'next-auth/react';

interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    mobile?: string;
    role: "user" | "deliveryPartner" | "admin";
    image?: string;
}

function Nav({ user }: { user: IUser }) {
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full bg-gradient-to-r from-purple-600 to-violet-600 shadow-md relative z-50">
            <div className="px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="text-white text-2xl font-bold tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer">
                    <Link href="/">FreshlyGo</Link>
                </div>

                {/* Desktop Search Bar */}
                <div className="hidden md:block flex-1 max-w-2xl mx-8 relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search groceries..."
                            className="w-full bg-white rounded-full py-2 pl-10 pr-4 focus:outline-none text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Mobile Search Icon */}
                    <div className="md:hidden text-white cursor-pointer">
                        <Search className="h-6 w-6" onClick={() => setMobileMenuOpen(true)}/>
                    </div>

                    {/* Cart */}
                    <div className="relative cursor-pointer hover:scale-110 transition-all duration-300">
                        <Link href="/cart">
                            <ShoppingCart className="text-white h-6 w-6" />
                            <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-purple-600">
                                <span>3</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop User Profile */}
                    <div className="hidden md:block relative" ref={dropdownRef}>
                        <div
                            className="h-9 w-9 bg-[#ff4500] rounded-full flex items-center justify-center text-white font-medium cursor-pointer border-2 border-white/20 overflow-hidden"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt="user"
                                    width={36}
                                    height={36}
                                    className="rounded-full object-cover w-full h-full"
                                />
                            ) : (
                                <User />
                            )}
                        </div>

                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl py-4 px-2 z-50"
                                >
                                    <div className="flex items-center gap-3 px-3 pb-4 border-b border-gray-100">
                                        <div className="h-10 w-10 bg-[#ff4500] rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0">
                                            {user.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt="user"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover w-full h-full"
                                                />
                                            ) : (
                                                user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-gray-800 font-semibold truncate">{user.name}</span>
                                            <span className="text-gray-500 text-xs capitalize">{user.role}</span>
                                        </div>
                                    </div>

                                    <div className="mt-2 space-y-1">
                                        <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
                                            onClick={() => setOpen(false)}>
                                            <Package className="w-5 h-5 text-green-600" />
                                            <span className="font-medium">My Orders</span>
                                        </Link>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                                            onClick={() => {
                                                setOpen(false)
                                                signOut({ callbackUrl: "/login" })
                                            }}>
                                            <LogOut className="w-5 h-5" />
                                            <span className="font-medium">Log Out</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="p-4 space-y-4">
                            {/* Mobile Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search groceries..."
                                    className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {/* Mobile User Info */}
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="h-10 w-10 bg-[#ff4500] rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt="user"
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover w-full h-full"
                                        />
                                    ) : (
                                        user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                                    )}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-gray-800 font-semibold truncate">{user.name}</span>
                                    <span className="text-gray-500 text-xs capitalize">{user.role}</span>
                                </div>
                            </div>

                            {/* Mobile Links */}
                            <div className="space-y-2">
                                <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    <Package className="w-5 h-5 text-green-600" />
                                    <span className="font-medium">My Orders</span>
                                </Link>
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                                    onClick={() => {
                                        setMobileMenuOpen(false)
                                        signOut({ callbackUrl: "/login" })
                                    }}>
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Nav