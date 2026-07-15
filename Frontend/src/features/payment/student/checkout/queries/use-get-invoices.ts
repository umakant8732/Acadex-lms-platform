import { useQuery } from '@tanstack/react-query';
import { getInvoicesService } from '../services/service-get-invoices';
import type { InvoiceItem } from '../types/invoice-types';

 //Custom hook to fetch and cache the student's purchase invoice list.

export const useGetInvoices = () => {
  return useQuery<InvoiceItem[], Error>({    queryKey: ['student-invoices'],
    queryFn: getInvoicesService
  });
};
