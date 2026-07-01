import TeacherStatCard from '../../../components/teacher-stat-card.jsx'

const stats = [
  {
    title: 'Total Courses',
    value: '12',
    growth: '18'
  },
  {
    title: 'Students',
    value: '1.2K',
    growth: '24'
  },
  {
    title: 'Revenue',
    value: 'Rs 48K',
    growth: '30'
  },
  {
    title: 'Active Users',
    value: '842',
    growth: '12'
  }
]

function DashboardStats () {
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      {stats.map(item => (
        <TeacherStatCard
          key={item.title}
          title={item.title}
          value={item.value}
          growth={item.growth}
        />
      ))}
    </div>
  )
}

export default DashboardStats
