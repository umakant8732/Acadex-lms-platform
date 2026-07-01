import CourseCheckoutCard from './course-checkout-card.jsx'
import CourseHeroSummary from './course-hero-summary.jsx'
import CourseValueList from './course-value-list.jsx'

const CoursePreviewContent = ({
  course,
  checkoutAction,
  checkoutIdentity
}) => {
  return (
    <section className='min-h-screen bg-[#f5f5f5] px-4 py-10 sm:px-6 lg:py-14'>
      <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start'>
        <div className='space-y-8'>
          <CourseHeroSummary course={course} />
          <CourseValueList />
        </div>

        <CourseCheckoutCard
          course={course}
          checkoutAction={checkoutAction}
          checkoutIdentity={checkoutIdentity}
        />
      </div>
    </section>
  )
}

export default CoursePreviewContent
