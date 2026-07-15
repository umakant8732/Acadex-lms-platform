import asyncHandler from "../../../../utils/async-handler.js";
import ApiResponse from "../../../../utils/api-response.js";

import { getInvoicesService } from "../../services/student/get-invoices-service.js";


//controller to fetch purchase invoices for the current student

export const getInvoices = asyncHandler(async (req, res) => {

    const userId = req.user._id
    const invoices = await getInvoicesService(userId)

    return res.status(200).json(new ApiResponse(
        200,
        'Invoices fetched successfully',
        invoices
    ))


})