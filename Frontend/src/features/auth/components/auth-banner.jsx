import { motion } from 'framer-motion'

const AuthBanner = () => {
  return (
    <div className='relative hidden items-center justify-center overflow-hidden bg-black p-16 text-white lg:flex'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,white,transparent_40%)] opacity-20' />

      <div className='relative z-10 max-w-xl'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-5xl font-semibold tracking-tight'
        >
          Acadex
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className='mt-12 text-6xl font-semibold leading-none tracking-tight'
        >
          Learn.
          <br />
          Build.
          <br />
          Grow.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mt-10 text-lg leading-8 text-white/60'
        >
          Modern learning platform for students and teachers
          to build real-world development skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-16 flex items-center gap-12'
        >
          <div>
            <h3 className='text-4xl font-semibold'>
              10K+
            </h3>

            <p className='mt-2 text-sm text-white/50'>
              Students
            </p>
          </div>

          <div>
            <h3 className='text-4xl font-semibold'>
              120+
            </h3>

            <p className='mt-2 text-sm text-white/50'>
              Courses
            </p>
          </div>

          <div>
            <h3 className='text-4xl font-semibold'>
              40+
            </h3>

            <p className='mt-2 text-sm text-white/50'>
              Teachers
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthBanner
