import api from '../../../../shared/services/axios.js'

export const getManageCourseApi = async ({
  page = 1,
  limit = 10,
  search = '',
  category = ''
}) => {
  return await api.get('/course/manage-all-courses', {
    params: {
      page,
      limit,
      search,
      category
    }
  })
}
