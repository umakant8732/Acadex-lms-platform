import { getInvoicesApi } from "../api/api-get-invoices.js";
import type { InvoiceItem } from "../types/invoice-types";

//extract and return the clean array of invoices from the api response payload

export const getInvoicesService = async (): Promise<InvoiceItem[]> => {
    const response = await getInvoicesApi()
    return response.data
}