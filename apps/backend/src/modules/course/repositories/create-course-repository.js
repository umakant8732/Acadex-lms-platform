import Course from "../models/course-model.js";

export const createCourse = async data => {
    return await Course.create(data)
}

