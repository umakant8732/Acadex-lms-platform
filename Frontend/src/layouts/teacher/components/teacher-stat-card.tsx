import React from 'react'
import { motion } from 'framer-motion'

export interface TeacherStatCardProps {
  title: string
  value: string | number
  growth: string | number
}

const TeacherStatCard: React.FC<TeacherStatCardProps> = ({
  title,
  value,
  growth
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className='border border-black/5 bg-white p-5 sm:p-6'
    >
      <p className='text-sm text-black/40'>
        {title}
      </p>

      <h2 className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl'>
        {value}
      </h2>

      <p className='mt-3 text-sm'>
        +{growth}% this month
      </p>
    </motion.div>
  )
}

export default TeacherStatCard
