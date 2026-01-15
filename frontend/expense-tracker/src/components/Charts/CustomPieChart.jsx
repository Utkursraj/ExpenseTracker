import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// IMPORT the legend we fixed in the previous step
// (Make sure CustomLegend.jsx is in the same folder)
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors = [], // FIX: Added default empty array to prevent crash
  showTextAnchor,
}) => {

  // FIX: Defined the missing CustomTooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-xs font-semibold text-purple-800 mb-1'>
            {payload[0].name}
          </p>
          <p className='text-sm text-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>
              ${payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {/* FIX: Changed square brackets [] to parentheses () */}
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Pie>
        
        <Tooltip content={<CustomTooltip />} />
        
        {/* FIX: Passed the CustomLegend component correctly */}
        <Legend content={<CustomLegend />} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor='middle'
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor='middle'
              fill='#333'
              fontSize="24px"
              fontWeight="600" // 'semi-bold' is not valid SVG, use numeric or 'bold'
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;