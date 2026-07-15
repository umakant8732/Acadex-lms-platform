import React from 'react'
import { motion } from 'framer-motion'

const HeroSection: React.FC = () => {
  const handleScrollToCourses = () => {
    const section = document.getElementById('courses')

    section?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <section className='overflow-hidden px-6 pb-20 pt-28'>
      <div className='mx-auto max-w-7xl text-center'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='text-sm uppercase tracking-[0.3em] text-black/40'
        >
          Modern Learning Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='mt-8 text-6xl font-semibold leading-none tracking-tight md:text-8xl'
        >
          Learn Modern
          <br />
          Tech Skills
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mx-auto mt-10 max-w-2xl text-lg leading-8 text-black/60'
        >
          Explore web development, backend engineering, system design, cloud, security, and other practical IT courses built for real-world work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='mt-12 flex items-center justify-center'
        >
          <button
            onClick={handleScrollToCourses}
            className='btn btn-neutral rounded-none px-8 py-3 text-xs uppercase tracking-widest font-bold transition-all hover:bg-black/90 hover:scale-[1.03] active:scale-95 shadow-md'
          >
            Explore Courses
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
