import { atom } from "jotai";

export const itemPageStateAtom = atom({
  filter: "",
  sortBy: "createdAt",
  ascending: false,
  category: "ALL",
  userId: "ALL",
  page: 1,
  pageSize: 6,
});
