import { FiPlus } from 'react-icons/fi'

import ManageCourseTable from '../../components/manage-course-components/manage-course-table'
import DeleteCourseModal from '../../components/manage-course-components/delete-course-modal'
import ManageCourseFilters from '../../components/manage-course-components/manage-course-filters.jsx'
import ManageCoursePagination from '../../components/manage-course-components/manage-course-pagination.jsx'
import { useManageCoursePage } from '../../hooks/use-manage-course-page.js'
import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.jsx'

function ManageCoursePage() {
  const {
    courses,
    pagination,
    filterControls,
    isLoading,
    isError,
    error,
    refetchCourses,
    courseToDelete,
    isDeleteModalOpen,
    isDeletingCourse,
    deleteCourseError,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteCourse,
    goToCreateCoursePage,
    goToUpdateCoursePage,
    goToViewCoursePage,
    handleTogglePublishStatus,
    publishingCourseId,
    handleThumbnailFileSelect,
    uploadingThumbnailCourseId
  } = useManageCoursePage()

  return (
    <section className='space-y-6'>
      <div className='border border-black/10 bg-white p-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <h1 className='mt-3 text-2xl font-semibold tracking-tight text-black'>
              Manage Courses
            </h1>
          </div>

          <button
            type='button'
            onClick={goToCreateCoursePage}
            className='btn rounded-none border-black bg-black text-white hover:bg-black/90'
          >
            <FiPlus size={16} />
            Create Course
          </button>
        </div>
      </div>

      <ManageCourseFilters
        searchValue={filterControls.searchInput}
        selectedCategory={filterControls.category}
        hasActiveFilters={filterControls.hasActiveFilters}
        onSearchChange={filterControls.handleSearchChange}
        onCategoryChange={filterControls.handleCategoryChange}
        onResetFilters={filterControls.resetFilters}
      />

      {isLoading ? (
        <div className='border border-black/10 bg-white p-6 text-sm text-black/60'>
          Loading courses...
        </div>
      ) : isError ? (
        <SectionQueryError
          variant='error'
          title='Unable to load your courses'
          message={
            error?.response?.data?.message ||
            'Something went wrong while fetching courses.'
          }
          actionLabel='Try Again'
          onAction={refetchCourses}
        />
      ) : courses.length === 0 ? (
        <SectionQueryError
          variant='empty'
          title='No courses found'
          message='Start by creating your first course and it will appear here.'
          actionLabel='Create Course'
          onAction={goToCreateCoursePage}
        />
      ) : (
        <>
          <ManageCourseTable
            courses={courses}
            onViewClick={goToViewCoursePage}
            onEditClick={goToUpdateCoursePage}
            onDeleteClick={openDeleteModal}
            onPublishClick={handleTogglePublishStatus}
            publishingCourseId={publishingCourseId}
            onThumbnailChange={handleThumbnailFileSelect}
            uploadingThumbnailCourseId={uploadingThumbnailCourseId}
          />

          <ManageCoursePagination
            pagination={pagination}
            onPageChange={filterControls.handlePageChange}
            onLimitChange={filterControls.handleLimitChange}
          />
        </>
      )}

      <DeleteCourseModal
        course={courseToDelete}
        isOpen={isDeleteModalOpen}
        isPending={isDeletingCourse}
        errorMessage={deleteCourseError?.response?.data?.message}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteCourse}
      />
    </section>
  )
}

export default ManageCoursePage
