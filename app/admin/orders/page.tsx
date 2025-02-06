import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const furnitureOrders = [
  { id: "1", customer: "John Doe", product: "Leather Sofa", amount: 1299.99, status: "Completed", date: "2023-05-15" },
  {
    id: "2",
    customer: "Jane Smith",
    product: "Dining Table Set",
    amount: 899.99,
    status: "Processing",
    date: "2023-05-16",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    product: "Queen Size Bed",
    amount: 799.99,
    status: "Shipped",
    date: "2023-05-14",
  },
  { id: "4", customer: "Alice Brown", product: "Wardrobe", amount: 599.99, status: "Completed", date: "2023-05-13" },
  {
    id: "5",
    customer: "Charlie Wilson",
    product: "Recliner Chair",
    amount: 499.99,
    status: "Processing",
    date: "2023-05-17",
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Furniture Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {furnitureOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>${order.amount.toFixed(2)}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                {/* <Badge
                  variant={
                    order.status === "Completed" ? "success" : order.status === "Shipped" ? "warning" : "default"
                  }
                >
                  {order.status}
                </Badge> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

