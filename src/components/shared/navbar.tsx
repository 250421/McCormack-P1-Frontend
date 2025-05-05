import { UserDropdown } from "@/features/auth/components/user-dropdown";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-15 py-3 bg-amber-200">
      <ul>
        <h1 className="text-3xl">
          Plumbers <span className="font-extrabold">Helper</span>
        </h1>
      </ul>
      <ul>
        <UserDropdown />
      </ul>
    </nav>
  );
};
