import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  useParams,
  useNavigate,
  createFileRoute,
} from "@tanstack/react-router";
import { useGetItemById } from "@/features/items/hooks/use-get-item-by-id";

export const Route = createFileRoute("/(auth)/_auth/item/$itemId")({
  component: ItemIdPage,
});

function ItemIdPage() {
  const { itemId } = useParams({ from: "/(auth)/_auth/item/$itemId" });
  const { data: item, isLoading } = useGetItemById({ id: itemId });
  const navigate = useNavigate();

  if (isLoading) return <Loader className="size-4 animate-spin" />;
  if (!item)
    return <h1>Something's weird... please report this to your admin</h1>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
      <div className="text-left">
        <Button onClick={() => navigate({ to: "/" })}>Back to Items</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{item.name}</span>
            <Badge variant="outline">{item.category}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-64 object-cover rounded-md"
            />
          )}
          <div>
            <strong>Description:</strong>
            <p>{item.description || "No description provided."}</p>
          </div>
          <div>
            <strong>Price:</strong> ${item.price.toFixed(2)}
          </div>
          <div>
            <strong>Quantity:</strong> {item.quantity}
          </div>
          <div>
            <strong>Created by User ID:</strong> {item.userId}
          </div>
          <div>
            <strong>Created at:</strong>{" "}
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <div className="text-left">
        <Button onClick={() => navigate({ to: "/" })}>Back to Items</Button>
      </div>
    </div>
  );
}
