'use client'
import React from 'react'
import { motion } from 'motion/react'
import GroceryItemCart from './GroceryItemCart'

interface IGrocery {
    _id: string;
    name: string;
    category: string;
    price: string;
    unit: string;
    image: string;
}

function GroceryGrid({ groceries }: { groceries: IGrocery[] }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <motion.div
            className="w-[90%] md:w-[80%] mx-auto my-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.h2
                className="text-2xl md:text-3xl font-bold text-purple-700 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
            >
                🛍️ Fresh Products
            </motion.h2>
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {groceries.map((item, index) => (
                    <motion.div
                        key={item._id}
                        variants={itemVariants}
                        custom={index}
                    >
                        <GroceryItemCart item={item} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default GroceryGrid
