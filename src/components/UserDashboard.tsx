import React from 'react'
import HeroSection from './HeroSection'
import CategoriesSlider from './CategoriesSlider'
import connectDB from '@/lib/db'
import Grocery from '@/models/grocery.model'
import GroceryGrid from './GroceryGrid'


async function UserDashboard() {
  await connectDB();
  const groceries = await Grocery.find({});
  const plainGroceries = JSON.parse(JSON.stringify(groceries))
  return (
    <>
      <HeroSection />
      <CategoriesSlider />
      <GroceryGrid groceries={plainGroceries} />
    </>
  )
}

export default UserDashboard
