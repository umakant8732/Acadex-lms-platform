import { useQuery } from "@tanstack/react-query";
import { getInvoicesService } from "../services/service-get-invoices";

//Custom hook to fetch and cache the student's purchase invoice list.

export const useGetInvoices = () => {
  return useQuery({
    queryKey: ["student-invoices"],
    queryFn: getInvoicesService,
  });
};
