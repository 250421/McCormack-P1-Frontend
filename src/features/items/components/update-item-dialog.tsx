import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateItem } from "../hooks/use-update-item";
import { Item } from "../models/Item";
import {
  updateItemSchema,
  UpdateItemSchema,
} from "../schemas/update-item-schema";

interface UpdateItemDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: Item;
}

export const UpdateItemDialog = ({
  open,
  setOpen,
  item,
}: UpdateItemDialogProps) => {
  const { mutate: updateItem } = useUpdateItem(item.id);
  const form = useForm<UpdateItemSchema>({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {
      name: item.name,
      description: item.description || "",
      quantity: item.quantity || 0,
      price: item.price.toString(),
      imageUrl:
        item.imageUrl || "https://placehold.co/600x400?text=Plumbers+Helper",
      category: (item.category as "ASSET") || "EXPENDIBLE",
    },
  });

  const onSubmit = (values: UpdateItemSchema) => {
    const parsedPrice = parseFloat(values.price);
    if (isNaN(parsedPrice)) return;
    updateItem(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new inventory item</DialogTitle>
          <DialogDescription>
            Add an inventory item to the public registry.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Add a description" {...field} />
                  </FormControl>
                  {/* <FormDescription>Login here.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quanity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {/* <FormDescription>Login here.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="$0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EXPENDIBLE">Expendible</SelectItem>
                      <SelectItem value="ASSET">Asset</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Include an image URL"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>Login here.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
