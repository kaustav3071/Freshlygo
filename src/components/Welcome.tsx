'use client';
import { motion } from "motion/react";
import { ShoppingBasket, Bike, ArrowRight, ShoppingCart } from 'lucide-react';

type propType = {
    nextStep: (nextStep: number) => void
}

// Animation variants
const blobAnimation = {
    animate: {
        x: [0, 30, -20, 0],
        y: [0, -50, 20, 0],
        scale: [1, 1.1, 0.9, 1],
        transition: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const floatAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const fadeInVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
} as const;

const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
    }
} as const;

function Welcome({nextStep}: {nextStep: (step: number) => void}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -50, 20, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -50, 20, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -50, 20, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />
            </div>

            <div className="relative z-10 max-w-2xl w-full">
                {/* Logo and Brand */}
                <motion.div
                    className="mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariant}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                            className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-2xl shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ShoppingCart className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </motion.div>
                        <motion.h1
                            className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            FreshlyGo
                        </motion.h1>
                    </div>

                    <motion.p
                        className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Your one-stop destination for fresh groceries, organic produce, and daily essentials delivered right to your doorstep.
                    </motion.p>
                </motion.div>

                {/* Icons Section */}
                <div className="flex items-center justify-center gap-12 mb-12">
                    {/* Shopping Basket Icon */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-purple-500 to-violet-600 p-8 rounded-3xl shadow-2xl"
                            whileHover={{
                                scale: 1.1,
                                boxShadow: "0 20px 50px rgba(147, 51, 234, 0.4)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ShoppingBasket className="w-20 h-20 text-white" strokeWidth={2} />
                        </motion.div>
                    </motion.div>

                    {/* Delivery Bike Icon */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-3xl shadow-2xl"
                            whileHover={{
                                scale: 1.1,
                                boxShadow: "0 20px 50px rgba(249, 115, 22, 0.4)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Bike className="w-20 h-20 text-white" strokeWidth={2} />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Next Button */}
                <motion.div
                    className="flex justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariant}
                >
                    <motion.button
                        className="bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold px-10 py-4 rounded-2xl shadow-lg flex items-center gap-3 relative overflow-hidden"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 50px rgba(147, 51, 234, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.span
                            className="text-lg relative z-10"
                            initial={{ opacity: 1 }}
                            whileHover={{ opacity: 1 }}
                            onClick={() => nextStep(2)}
                        >
                            Next
                        </motion.span>
                        <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>

                        {/* Gradient overlay on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-700 to-violet-700 rounded-2xl"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

export default Welcome;