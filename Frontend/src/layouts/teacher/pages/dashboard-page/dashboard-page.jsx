import AnalyticsCard from './components/dashboard-analytics-card.jsx'
import DashboardStats from './components/dashboard-stats.jsx'
import RecentCourses from './components/dashboard-recent-courses.jsx'
import RecentStudents from './components/dashboard-recent-students.jsx'

function DashboardPage () {
  return (
    <section className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.2em] text-black/40 sm:text-sm'>
          Teacher Dashboard
        </p>

        <h1 className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl xl:text-5xl'>
          Welcome Back
        </h1>
      </div>

      <DashboardStats />

      <div className='grid gap-6 xl:grid-cols-[1.2fr_0.8fr]'>
        <AnalyticsCard />
        <RecentCourses />
      </div>

      <RecentStudents />
    </section>
  )
}

export default DashboardPage
