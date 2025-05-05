import { Item } from "../models/Item";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UpdateItemDialog } from "./update-item-dialog";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteItem } from "../hooks/use-delete-item";

interface ItemProps {
  item: Item;
  isAdmin?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  onToggleSelect?: (checked: boolean) => void;
}

export const ItemComp = ({
  item,
  isAdmin,
  onClick,
  isSelected,
  onToggleSelect,
}: ItemProps) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [confirm, ConfirmDialog, confirmOpen] = useConfirm();
  const deleteItem = useDeleteItem(item.id);

  const handleClick = () => {
    if (updateOpen || confirmOpen) return;
    onClick?.();
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = await confirm();
    if (confirmed) {
      deleteItem.mutate();
    }
  };
  return (
    <div
      className="w-64 h-80 rounded-md p-6 border shadow-md hover:outline-2 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={
          item?.imageUrl || "https://placehold.co/600x400?text=Plumbers+Helper"
        }
        alt={item?.description}
        className="object-cover rounded-md h-36"
      />
      <h2 className="text-l font-bold my-3">{item.name}</h2>

      <p>
        <span className="text-muted-foreground">In Stock:</span> {item.quantity}
      </p>
      <p>
        <span className="text-muted-foreground">Current Price:</span> $
        {item.price}
      </p>
      {isAdmin && (
        <div className="flex justify-between items-center mt-1">
          <Checkbox
            checked={isSelected}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={(checked) => onToggleSelect?.(!!checked)}
            className="cursor-pointer hover:outline-2 z-50"
          />
          <div className="flex gap-x-1">
            <Button
              variant="ghost"
              className="z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setUpdateOpen(true);
              }}
            >
              <Pencil size={18} />
            </Button>

            <Button
              variant="ghost"
              className="z-10 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 size={18} color="red" />
            </Button>
          </div>
        </div>
      )}
      {isAdmin && (
        <UpdateItemDialog
          open={updateOpen}
          setOpen={setUpdateOpen}
          item={item}
        />
      )}
      <ConfirmDialog
        title="Delete Item?"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
      />
    </div>
  );
};
