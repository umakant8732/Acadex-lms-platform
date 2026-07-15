export interface InvoiceCourse {
    _id: string,
    title: string,
    price: number,
    originalPrice: number,
    thumbnailKey: string
}

export interface InvoiceItem {
    _id: string,
    userId: string,
    courseId: InvoiceCourse, //populate course details from backend
    amount: number,
    currency: string,
    receipt: string,
    providerOrderId: string,
    providerPaymentId?: string,
    status: string,
    paidAt: string,
    createdAt: string,
    updatedAt: string
}





