"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TDailyExpenseResponse } from "@/types/Dashboard/TDailyExpence";

const formatMoney = (amount: number) => `৳ ${amount.toLocaleString()}`;

export const DailyExpenseColumns: Column<TDailyExpenseResponse>[] = [
    {
        header: "Date",
        accessor: (expense) => (
            <span className="text-sm">
                {new Date(expense.date).toLocaleDateString()}
            </span>
        ),
        sortKey: "date",
    },

    {
        header: "Labour Salary *",
        accessor: (expense) => (
            <span className="text-sm font-semibold">
                {formatMoney(expense.labourSalary)}
            </span>
        ),
        sortKey: "labourSalary",
    },

    {
        header: "Office Cost *",
        accessor: (expense) => (
            <span className="text-sm font-semibold">
                {formatMoney(expense.officeCost)}
            </span>
        ),
        sortKey: "officeCost",
    },

    {
        header: "Party Les",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.partyLes || 0)}
            </span>
        ),
        sortKey: "partyLes",
    },

    {
        header: "Car Rent",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.carRent || 0)}
            </span>
        ),
        sortKey: "carRent",
    },

    {
        header: "Car Number",
        accessor: (expense) => (
            <span className="text-sm">
                {expense.carNumber}
            </span>
        ),
        sortKey: "carNumber",
    },

    {
        header: "Van Repair",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.vanRepair || 0)}
            </span>
        ),
        sortKey: "vanRepair",
    },

    {
        header: "Mobile Bill",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.mobileBill || 0)}
            </span>
        ),
        sortKey: "mobileBill",
    },

    {
        header: "Transport Cost",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.transportationCost || 0)}
            </span>
        ),
        sortKey: "transportationCost",
    },

    {
        header: "Manager Salary",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.managerSalary || 0)}
            </span>
        ),
        sortKey: "managerSalary",
    },

    {
        header: "Stationery",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.stationery || 0)}
            </span>
        ),
        sortKey: "stationery",
    },

    {
        header: "Security Salary",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.securitySalary || 0)}
            </span>
        ),
        sortKey: "securitySalary",
    },

    {
        header: "Donation",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.donation || 0)}
            </span>
        ),
        sortKey: "donation",
    },

    {
        header: "Compensation",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.compensation || 0)}
            </span>
        ),
        sortKey: "compensation",
    },

    {
        header: "Bkash Bill",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.bkashBill || 0)}
            </span>
        ),
        sortKey: "bkashBill",
    },

    {
        header: "Electricity Bill",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.electricityBill || 0)}
            </span>
        ),
        sortKey: "electricityBill",
    },

    {
        header: "Office Rent",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.officeRent || 0)}
            </span>
        ),
        sortKey: "officeRent",
    },

    {
        header: "Misc",
        accessor: (expense) => (
            <span className="text-sm">
                {formatMoney(expense.misc || 0)}
            </span>
        ),
        sortKey: "misc",
    },

    {
        header: "Created At",
        accessor: (expense) => (
            <span className="text-sm">
                {new Date(expense.createdAt).toLocaleString()}
            </span>
        ),
        sortKey: "createdAt",
    },
];