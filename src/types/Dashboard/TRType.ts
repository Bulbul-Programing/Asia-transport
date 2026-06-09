export type TTRResponse = {
    id: string;
    TRID: string;
    shopId: string;
    shopName: string;
    quantity: number;
    paymentStatus: boolean;
    taka: number;
    bookingDate: string;
    isOfficeDelivery: boolean;
    note: string | null;
    createdAt: string;
    updateAt: string;
};

export type TTR = {
    id: string;
    TRID: string;
    shopId: string;
    shopName: string;
    quantity: number;
    paymentStatus: boolean;
    taka: number;
    bookingDate: Date;
    isOfficeDelivery: boolean;
    note?: string;
    createdAt: Date;
    updateAt: Date;
}

export interface TRPayload {
    TRID: string;
    shopName: string;
    quantity: number;
    paymentStatus: boolean;
    taka: number;
    bookingDate: Date;
    isOfficeDelivery: boolean;
    note?: string;
}