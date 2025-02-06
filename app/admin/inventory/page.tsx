// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"

// const furnitureInventory = [
//   { id: "1", name: "Leather Sofa", category: "Living Room", price: 1299.99, stock: 15 },
//   { id: "2", name: "Dining Table Set", category: "Dining Room", price: 899.99, stock: 8 },
//   { id: "3", name: "Queen Size Bed", category: "Bedroom", price: 799.99, stock: 12 },
//   { id: "4", name: "Wardrobe", category: "Bedroom", price: 599.99, stock: 20 },
//   { id: "5", name: "Recliner Chair", category: "Living Room", price: 499.99, stock: 25 },
// ]

// export default function InventoryPage() {
//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Furniture Inventory</h1>
//         <Button>Add New Item</Button>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>ID</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Stock</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {furnitureInventory.map((item) => (
//             <TableRow key={item.id}>
//               <TableCell>{item.id}</TableCell>
//               <TableCell>{item.name}</TableCell>
//               <TableCell>{item.category}</TableCell>
//               <TableCell>${item.price.toFixed(2)}</TableCell>
//               <TableCell>
//                 {/* <Badge variant={item.stock > 10 ? "success" : item.stock > 5 ? "warning" : "destructive"}>
//                   {item.stock}
//                 </Badge> */}
//               </TableCell>
//               <TableCell>
//                 <Button variant="outline" size="sm" className="mr-2">
//                   Edit
//                 </Button>
//                 <Button variant="destructive" size="sm">
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type FurnitureItem = {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

const initialInventory: FurnitureItem[] = [
  { id: "1", name: "Leather Sofa", category: "Living Room", price: 1299.99, stock: 15 },
  { id: "2", name: "Dining Table Set", category: "Dining Room", price: 899.99, stock: 8 },
  { id: "3", name: "Queen Size Bed", category: "Bedroom", price: 799.99, stock: 12 },
  { id: "4", name: "Wardrobe", category: "Bedroom", price: 599.99, stock: 20 },
  { id: "5", name: "Recliner Chair", category: "Living Room", price: 499.99, stock: 25 },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<FurnitureItem[]>(initialInventory)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<FurnitureItem | null>(null)

  const addItem = (item: Omit<FurnitureItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() }
    setInventory([...inventory, newItem])
    setIsAddDialogOpen(false)
  }

  const editItem = (item: FurnitureItem) => {
    const updatedInventory = inventory.map((i) => (i.id === item.id ? item : i))
    setInventory(updatedInventory)
    setIsEditDialogOpen(false)
  }

  const deleteItem = (id: string) => {
    const updatedInventory = inventory.filter((item) => item.id !== id)
    setInventory(updatedInventory)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Furniture Inventory</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger>
            <Button onClick={() => setIsAddDialogOpen(true)}>Add New Item</Button>
          </DialogTrigger>
          {isAddDialogOpen && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Furniture Item</DialogTitle>
              </DialogHeader>
              <InventoryForm
                onSubmit={(newItem) => {
                  addItem(newItem)
                  setIsAddDialogOpen(false)
                }}
              />
            </DialogContent>
          )}
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge className={item.stock > 10 ? "bg-green-500" : item.stock > 5 ? "bg-yellow-500" : "bg-red-500"}>
                  {item.stock}
                </Badge>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setCurrentItem(item)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  {isEditDialogOpen && currentItem?.id === item.id && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Furniture Item</DialogTitle>
                      </DialogHeader>
                      {currentItem && (
                        <InventoryForm
                          onSubmit={(updatedItem) => editItem({ ...currentItem, ...updatedItem })}
                          initialData={currentItem}
                        />
                      )}
                    </DialogContent>
                  )}
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => deleteItem(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type InventoryFormProps = {
  onSubmit: (item: Omit<FurnitureItem, "id">) => void
  initialData?: FurnitureItem
}

function InventoryForm({ onSubmit, initialData }: InventoryFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [price, setPrice] = useState(initialData?.price.toString() || "")
  const [stock, setStock] = useState(initialData?.stock.toString() || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      category,
      price: Number.parseFloat(price),
      stock: Number.parseInt(stock, 10),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
      </div>
      <Button type="submit">{initialData ? "Update" : "Add"} Item</Button>
    </form>
  )
}

