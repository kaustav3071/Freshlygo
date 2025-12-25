"use client"
import { Apple, Milk, Wheat, Cookie, Flame, Coffee, Sparkles, Home, Package, Baby, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "motion/react";
import { useRef, useState, useEffect } from 'react';

function CategoriesSlider() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const categories = [
        { id: 1, name: "Fruits & Vegetables", icon: Apple, color: "bg-green-100" },
        { id: 2, name: "Dairy & Eggs", icon: Milk, color: "bg-yellow-100" },
        { id: 3, name: "Rice, Atta & Grains", icon: Wheat, color: "bg-red-100" },
        { id: 4, name: "Snacks & Biscuits", icon: Cookie, color: "bg-blue-100" },
        { id: 5, name: "Spices & Masalas", icon: Flame, color: "bg-orange-100" },
        { id: 6, name: "Beverages & Drinks", icon: Coffee, color: "bg-purple-100" },
        { id: 7, name: "Personal Care", icon: Sparkles, color: "bg-pink-100" },
        { id: 8, name: "Household Essentials", icon: Home, color: "bg-green-100" },
        { id: 9, name: "Instant & Packaged Food", icon: Package, color: "bg-yellow-100" },
        { id: 10, name: "Baby & Pet Care", icon: Baby, color: "bg-red-100" }
    ]

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 10);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

                if (scrollLeft >= scrollWidth - clientWidth - 10) {
                    scrollContainerRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    scrollContainerRef.current.scrollBy({
                        left: 300,
                        behavior: 'smooth'
                    });
                }
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            checkScroll();
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);

            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, []);

    return (
        <motion.div
            className='w-[90%] md:w-[80%] mx-auto mt-10 mb-10 relative'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            {/* Title */}
            <motion.h2
                className='text-2xl md:text-3xl font-bold text-purple-700 mb-6 text-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                🛒 Shop by Categories
            </motion.h2>

            {/* Left Scroll Button */}
            {showLeftButton && (
                <motion.button
                    onClick={scrollLeft}
                    className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg
                    hover:bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center
                    transition-all duration-300 ease-in-out hover:scale-110'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft className="text-purple-600" />
                </motion.button>
            )}

            {/* Right Scroll Button */}
            {showRightButton && (
                <motion.button
                    onClick={scrollRight}
                    className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg
                    hover:bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center
                    transition-all duration-300 ease-in-out hover:scale-110'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight className="text-purple-600" />
                </motion.button>
            )}

            {/* Scrollable Categories Container */}
            <motion.div
                ref={scrollContainerRef}
                className='flex gap-5 overflow-x-scroll scrollbar-hide pb-4'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                        <motion.div
                            key={category.id}
                            className={`min-w-[150px] md:min-w-[180px] ${category.color} rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300`}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.1 * index,
                                duration: 0.5,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: false, amount: 0.5 }}
                        >
                            {/* Icon */}
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <IconComponent className="w-12 h-12 md:w-14 md:h-14 text-purple-600 mb-3" />
                            </motion.div>

                            {/* Category Name */}
                            <h3 className='text-sm md:text-base font-semibold text-gray-800 text-center leading-tight'>
                                {category.name}
                            </h3>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    )
}

export default CategoriesSlider