'use client'
import React, { useState } from 'react'
import mongoose from 'mongoose'
import { motion } from 'motion/react'
import { ShoppingCart } from 'lucide-react'

interface IGrocery {
    id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: string;
    unit: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

function GroceryItemCart({ item }: { item: IGrocery }) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
        // TODO: Add actual cart logic here
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm hover:shadow-lg 
                       transition-all duration-300 overflow-hidden
                       w-full flex flex-col h-full border border-gray-100"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
            {/* Image Container */}
            <div className="relative h-48 bg-white flex items-center justify-center p-10">
                <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300
                               hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="px-5 pb-4 flex flex-col flex-grow">
                {/* Category */}
                <span className="text-xs text-gray-400 mb-1">
                    {item.category}
                </span>

                {/* Product Name */}
                <h3 className="text-gray-800 font-semibold text-base leading-tight 
                               line-clamp-2 mb-2 capitalize">
                    {item.name}
                </h3>

                {/* Unit and Price Row */}
                <div className="flex items-center justify-between mt-auto mb-3">
                    <span className="text-gray-400 text-sm">{item.unit}</span>
                    <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
                </div>
            </div>

            {/* Add to Cart Button */}
            <div className="px-4 pb-4">
                <motion.button
                    className={`w-full py-3 font-medium flex items-center justify-center gap-2
                               transition-all duration-300 rounded-full ${isAdded
                            ? 'bg-purple-700 text-white'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdded ? 'Added!' : 'Add to Cart'}
                </motion.button>
            </div>
        </motion.div>
    );
}

export default GroceryItemCart

