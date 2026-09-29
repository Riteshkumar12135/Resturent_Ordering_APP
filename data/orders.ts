import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "ORD-1001", customerName: "Rahul Shah", mobile: "9876543210", email: "rahul@example.com", address: "Bhubaneswar, Odisha",
    status: "Pending", items: [], subtotal: 598, tax: 29.9, total: 627.9, createdAt: "2026-09-29T09:20:00.000Z"
  },
  {
    id: "ORD-1002", customerName: "Priya Das", mobile: "9123456780", email: "priya@example.com", address: "Patia, Bhubaneswar",
    status: "Preparing", items: [], subtotal: 478, tax: 23.9, total: 501.9, createdAt: "2026-09-29T10:05:00.000Z"
  },
  {
    id: "ORD-1003", customerName: "Arjun Mehta", mobile: "9988776655", email: "arjun@example.com", address: "Cuttack Road, Bhubaneswar",
    status: "Completed", items: [], subtotal: 697, tax: 34.85, total: 731.85, createdAt: "2026-09-28T18:30:00.000Z"
  }
];
