import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { ItemComp } from "@/features/items/components/item-component";
import { useGetItems } from "@/features/items/hooks/use-get-items";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useConfirm } from "@/hooks/use-confirm";
import { useBulkDeleteItems } from "@/features/items/hooks/use-bulk-delete";
import { useAtom } from "jotai";
import { itemPageStateAtom } from "@/features/items/atoms/itemPageState";

export const Route = createFileRoute("/(auth)/_auth/")({
  component: Index,
});

function Index() {
  const { data: items } = useGetItems();
  const { data: auth } = useAuth();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [confirm, ConfirmDialog] = useConfirm();
  const bulkDelete = useBulkDeleteItems();
  const [state, setState] = useAtom(itemPageStateAtom);

  const userIds = Array.from(new Set(items?.map((it) => it.userId.toString())));

  const filteredItems = items
    ?.filter((it) => it.name.toLowerCase().includes(state.filter.toLowerCase()))
    .filter((it) => state.category === "ALL" || it.category === state.category)
    .filter(
      (it) => state.userId === "ALL" || it.userId.toString() === state.userId
    )
    .sort((a, b) => {
      const dir = state.ascending ? 1 : -1;
      if (state.sortBy === "name") return dir * a.name.localeCompare(b.name);
      if (state.sortBy === "price") return dir * (a.price - b.price);
      return (
        dir *
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
    });

  const totalPages = Math.ceil((filteredItems?.length ?? 0) / state.pageSize);
  const paginatedItems = filteredItems?.slice(
    (state.page - 1) * state.pageSize,
    state.page * state.pageSize
  );

  const handleBulkDelete = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      bulkDelete.mutate(selectedItems, {
        onSuccess: () => setSelectedItems([]),
      });
    }
  };

  const handleResetFilters = () => {
    setState({
      filter: "",
      sortBy: "createdAt",
      ascending: false,
      category: "ALL",
      userId: "ALL",
      page: 1,
      pageSize: 6,
    });
  };

  return (
    <section className="flex flex-col items-center px-15">
      <h1 className="text-4xl font-bold mt-6 mb-2">
        Number one in the number two business!
      </h1>
      <p className="mb-10">
        Here at Plumbers Helper, we have the tools to get the job done.
      </p>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <Input
          placeholder="Filter by name..."
          className="w-64"
          value={state.filter}
          onChange={(e) =>
            setState((s) => ({
              ...s,
              filter: e.target.value,
              page: 1,
            }))
          }
        />

        <Select
          value={state.category}
          onValueChange={(val) =>
            setState((prev) => ({
              ...prev,
              category: val,
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            <SelectItem value="EXPENDIBLE">Expendible</SelectItem>
            <SelectItem value="ASSET">Asset</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={state.userId}
          onValueChange={(val) =>
            setState((prev) => ({
              ...prev,
              userId: val,
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="User ID" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Users</SelectItem>
            {userIds.map((id) => (
              <SelectItem key={id} value={id}>
                User {id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={state.sortBy}
          onValueChange={(val) =>
            setState((prev) => ({ ...prev, sortBy: val, page: 1 }))
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() =>
            setState((prev) => ({
              ...prev,
              ascending: !prev.ascending,
            }))
          }
          className="flex items-center gap-1 w-36"
        >
          {state.ascending ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {state.ascending ? "Ascending" : "Descending"}
        </Button>

        {/* Reset Filters Button */}
        <Button variant="outline" onClick={handleResetFilters} className="w-36">
          Reset Filters
        </Button>
      </div>

      {/* Page Size */}
      <div className="mt-10">
        <Select
          value={state.pageSize.toString()}
          onValueChange={(val) =>
            setState((prev) => ({
              ...prev,
              pageSize: Number(val),
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6 per page</SelectItem>
            <SelectItem value="12">12 per page</SelectItem>
            <SelectItem value="24">24 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination (Top) */}
      <div className="flex items-center gap-4 mb-10 mt-5">
        <Button
          disabled={state.page === 1}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              page: Math.max(prev.page - 1, 1),
            }))
          }
          variant="outline"
        >
          <ChevronLeft size={16} />
          Prev
        </Button>
        <span>
          Page {state.page} of {totalPages}
        </span>
        <Button
          disabled={state.page === totalPages}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              page: Math.min(prev.page + 1, totalPages),
            }))
          }
          variant="outline"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Items */}
      <div className="flex justify-start flex-wrap gap-x-3 gap-y-6">
        {paginatedItems?.map((it) => (
          <ItemComp
            key={it.id}
            item={it}
            isAdmin={auth?.role === "ADMIN"}
            onClick={() =>
              navigate({
                to: "/item/$itemId",
                params: { itemId: it.id.toString() },
              })
            }
            isSelected={selectedItems.includes(it.id)}
            onToggleSelect={(checked) =>
              setSelectedItems((prev) =>
                checked ? [...prev, it.id] : prev.filter((id) => id !== it.id)
              )
            }
          />
        ))}
      </div>

      {/* Pagination (Bottom) + Delete */}
      <div className="flex items-center gap-4 my-10">
        <Button
          disabled={state.page === 1}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              page: Math.max(prev.page - 1, 1),
            }))
          }
          variant="outline"
        >
          <ChevronLeft size={16} />
          Prev
        </Button>
        <span>
          Page {state.page} of {totalPages}
        </span>
        <Button
          disabled={state.page === totalPages}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              page: Math.min(prev.page + 1, totalPages),
            }))
          }
          variant="outline"
        >
          Next
          <ChevronRight size={16} />
        </Button>
        {auth?.role === "ADMIN" && selectedItems.length > 0 && (
          <>
            <Button
              variant="destructive"
              className="fixed bottom-6 right-6 z-50"
              onClick={handleBulkDelete}
            >
              Delete {selectedItems.length} Selected
            </Button>
            <ConfirmDialog
              title="Delete selected items?"
              description="This will permanently delete all selected items. Continue?"
              confirmLabel="Delete"
              cancelLabel="Cancel"
              destructive
            />
          </>
        )}
      </div>
    </section>
  );
}
