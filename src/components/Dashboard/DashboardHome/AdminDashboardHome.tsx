/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
} from "recharts";

type Props = {
    data: any;
};

const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F97316",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];
const AdminDashboardHome = ({ data }: Props) => {
    const { kpis, charts, recent } = data;
    return (
        <div className="space-y-6">

            {/* ================= KPI CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Total Collection</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        ৳ {kpis.collection.total}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Expense</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-red-500">
                        ৳ {kpis.expenses.total}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent
                        className={`text-2xl font-bold ${kpis.profit.net >= 0 ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        ৳ {kpis.profit.net}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Deliveries</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {kpis.deliveries.total}
                    </CardContent>
                </Card>

            </div>

            {/* ================= CHARTS ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* EXPENSE PIE */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Expense Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={charts.expensePie}
                                    dataKey="value"
                                    nameKey="label"
                                    outerRadius={90}
                                    fill="#8884d8"
                                >
                                    {charts.expensePie.map((_: any, index: number) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* DELIVERY TYPE BAR */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Delivery Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={[charts.trDeliveryType]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" hide />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="officeDelivery" fill="#6366F1" />
                                <Bar dataKey="vanDelivery" fill="#22C55E" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* TOP SHOPS */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Top Shops</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={charts.topShops}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="shopName" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#F97316" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>

            {/* ================= RECENT TRANSACTIONS ================= */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>TR ID</TableHead>
                                <TableHead>Shop</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {recent.trs.map((tr: any) => (
                                <TableRow key={tr.id}>
                                    <TableCell>{tr.TRID}</TableCell>
                                    <TableCell>{tr.shopName}</TableCell>
                                    <TableCell>{tr.quantity}</TableCell>
                                    <TableCell>৳ {tr.taka}</TableCell>
                                    <TableCell>
                                        {tr.paymentStatus ? (
                                            <span className="text-green-600 font-medium">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="text-red-500 font-medium">
                                                Unpaid
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(tr.bookingDate).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
};

export default AdminDashboardHome;