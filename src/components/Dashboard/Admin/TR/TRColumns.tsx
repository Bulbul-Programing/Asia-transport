/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TTRResponse } from "@/types/Dashboard/TRType";



export const TRColumns: Column<TTRResponse>[] = [
    {
        header: "TR ID",
        accessor: (transaction) => (
            <span className="text-sm font-medium">
                {transaction.TRID}
            </span>
        ),
        sortKey: "TRID",
    },
    {
        header: "Shop Name",
        accessor: (transaction) => (
            <span className="text-sm">
                {transaction.shopName}
            </span>
        ),
        sortKey: "shopName",
    },
    {
        header: "Quantity",
        accessor: (transaction) => (
            <span className="text-sm font-medium">
                {transaction.quantity}
            </span>
        ),
        sortKey: "quantity",
    },
    {
        header: "Amount",
        accessor: (transaction) => (
            <span className="text-sm font-semibold">
                ৳ {transaction.taka.toLocaleString()}
            </span>
        ),
        sortKey: "taka",
    },
    {
        header: "Payment Status",
        accessor: (transaction) => (
            <span
                className={`text-sm font-medium ${
                    transaction.paymentStatus
                        ? "text-green-600"
                        : "text-red-600"
                }`}
            >
                {transaction.paymentStatus ? "Paid" : "Unpaid"}
            </span>
        ),
        sortKey: "paymentStatus",
    },
    {
        header: "Booking Date",
        accessor: (transaction) => (
            <span className="text-sm">
                {new Date(transaction.bookingDate).toLocaleDateString()}
            </span>
        ),
        sortKey: "bookingDate",
    },
    {
        header: "Delivery",
        accessor: (transaction) => (
            <span className="text-sm">
                {transaction.isOfficeDelivery
                    ? "Office Delivery"
                    : "Self Pickup"}
            </span>
        ),
        sortKey: "isOfficeDelivery",
    },
    {
        header: "Note",
        accessor: (transaction) => (
            <span className="text-sm">
                {transaction.note ?? "—"}
            </span>
        ),
    },
];