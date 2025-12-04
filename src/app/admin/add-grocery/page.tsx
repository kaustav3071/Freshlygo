"use client"
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Plus, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function AddGrocery() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        unit: '',
        price: '',
        image: null as File | null
    });

    const categories = [
        "Fruits & Vegetables",
        "Dairy & Eggs",
        "Rice, Atta & Grains",
        "Snacks & Biscuits",
        "Spices & Masalas",
        "Beverages & Drinks",
        "Personal Care",
        "Household Essentials",
        "Instant & Packaged Food",
        "Baby & Pet Care"
    ];

    const units = [
        "kg", "g", "l", "ml", "pcs", "dozen", "pack"
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.unit || !formData.price || !formData.image) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('unit', formData.unit);
        data.append('price', formData.price);
        data.append('image', formData.image);

        try {
            const response = await axios.post('/api/admin/add-grocery', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                toast.success("Grocery added successfully!");
                setFormData({
                    name: '',
                    category: '',
                    unit: '',
                    price: '',
                    image: null
                });
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                router.push('/admin/view-grocery');
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-4 group"
                    >
                        <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all mr-3 border border-gray-100">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Back to home</span>
                    </Link>
                </div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                                <Plus className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Grocery</h1>
                            <p className="text-gray-500">Fill out the details below to add a new grocery item.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">
                                    Grocery Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="eg: Sweets, Milk..."
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>

                            {/* Category and Unit Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">
                                        Unit <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="unit"
                                            value={formData.unit}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Unit</option>
                                            {units.map(unit => (
                                                <option key={unit} value={unit}>{unit}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="eg. 120"
                                        className="w-full pl-10 pr-5 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">
                                    Product Image <span className="text-red-500">*</span>
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`
                                        relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all duration-300
                                        ${preview ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'}
                                    `}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    {preview ? (
                                        <div className="relative w-full h-48">
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                fill
                                                className="object-contain rounded-lg"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                <p className="text-white font-medium flex items-center gap-2">
                                                    <Upload className="w-5 h-5" /> Change Image
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-purple-600 transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center mb-3 transition-colors">
                                                <Upload className="w-6 h-6" />
                                            </div>
                                            <p className="font-medium">Click to upload image</p>
                                            <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className={`
                                    w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-purple-200
                                    bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700
                                    transition-all duration-300 flex items-center justify-center gap-2
                                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                                `}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Adding Grocery...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-6 h-6" />
                                        Add Grocery
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AddGrocery