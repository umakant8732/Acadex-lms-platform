import Lecture from "../models/lecture-model.js";

//find one active lecture by id and optionally loads its video assets

export const findLectureById = async lectureId => {
    return await Lecture.findOne({
        _id : lectureId,
        delete : {$ne : true}
    }).populate('videoAssetId')
}