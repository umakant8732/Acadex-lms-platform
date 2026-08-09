import api from "@/shared/services/axios";

//calls backend to fetch purchase invoices history for the current loggedin student

export const getInvoicesApi = async () => {
  const response = await api.get("/payment/student/invoices");
  return response.data;
};
