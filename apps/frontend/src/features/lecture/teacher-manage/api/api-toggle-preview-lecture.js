import api from "../../../../shared/services/axios";

//calls backend to toggle preview status of a lecture

export const togglePreviewLectureApi = async (payload) => {
  return await api.patch("/lecture/preview", payload);
};
