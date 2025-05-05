import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../hooks/use-auth";

export const UserProfile = () => {
  const { data: user } = useAuth();
  const getInitials = (name: string) => {
    return (name[0] + name[1]).toUpperCase();
  };
  return (
    <Avatar className="size-12 hover:outline-2 cursor-pointer">
      <AvatarImage src="https://mario.nintendo.com/static/4196026f23693189f7cf7ebdf1482982/4d6e7/mario.png" />
      <AvatarFallback>{getInitials(user?.username ?? "")}</AvatarFallback>
    </Avatar>
  );
};
