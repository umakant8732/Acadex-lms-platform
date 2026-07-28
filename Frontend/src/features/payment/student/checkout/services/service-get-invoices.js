import { getInvoicesApi } from "../api/api-get-invoices";

//extract and return the clean array of invoices from the api response payload

export const getInvoicesService = async () => {
  const response = await getInvoicesApi();
  return response.data;
};
