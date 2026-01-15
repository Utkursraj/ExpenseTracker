import React from 'react';
import { LuTrendingUpDown } from "react-icons/lu";
import Card from "../../assets/images/card.png"; 

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      {/* Left Side: Form */}
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
      </div>

      {/* Right Side: Image & Stats */}
      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        
        {/* Background Shapes */}
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5' />
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10' />
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5' />

        <img 
          src={Card} 
          className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15'
          alt="Dashboard Preview"
        />

       
        <StatsInfoCard 
          icon={<LuTrendingUpDown />}
          label="Track Your Income & Expenses"
          value="430,000"
          color="bg-violet-500"
        />
      </div>
    </div>
  );
};

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-md absolute top-10 right-10 z-20'> 
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      
      <div>
        <h6 className='text-gray-500 text-xs md:text-sm'>{label}</h6>
        <span className='text-[20px] font-semibold'>${value}</span>
      </div>
    </div>
  );
};

export default AuthLayout;