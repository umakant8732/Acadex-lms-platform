import api from '../../../../../shared/services/axios.js'

import type { InvoiceItem } from '../types/invoice-types'

export interface GetInvoicesApiResponse {
    success: boolean,
    message: string,
    data : InvoiceItem[]
}

//calls backend to fetch purchase invoices history for the current loggedin student

export const getInvoicesApi = async () => {
    const response = await api.get<GetInvoicesApiResponse>('/payment/student/invoices')
    return response.data
}

