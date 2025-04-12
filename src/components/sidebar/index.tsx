"use client";
import Link from "next/link";
import { NavItem, navlist } from "./sidebar-navlist";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const Sidebar = () => {
  return (
    <div className="bg-bg-light-pri flex flex-row md:flex-col border-t md:border-t-0  dark:bg-bg-dark-pri border-r-0 md:border-r border-stroke-light-ter dark:border-stroke-dark-ter">
      {navlist.map((item: NavItem) => (
        <SidebarItem item={item} key={item.title} />
      ))}
    </div>
  );
};

export default Sidebar;

const SidebarItem = ({ item }: { item: NavItem }) => {
  const path = usePathname();
  const isActive = item.href === path;

  return (
    <Link
      className={cn(
        "relative px-4 py-4 w-full flex flex-col gap-1 items-center justify-center hover:bg-bg-light-ter dark:hover:bg-bg-dark-ter",
        isActive ? "bg-bg-light-sec dark:bg-bg-dark-sec" : ""
      )}
      href={item.href}
    >
      {isActive && (
        <div className="h-0.5 md:h-full w-full md:w-0.5 bg-primary absolute top-0 left-0 md:bottom-0" />
      )}
      <item.icon
        size={16}
        className={cn(
          isActive
            ? "text-text-b-pri dark:text-text-w-pri"
            : "text-text-b-sec dark:text-text-w-sec"
        )}
      />
      <span
        className={cn(
          "text-[10px] font-normal hidden md:inline-block",
          isActive
            ? "text-text-b-pri dark:text-text-w-pri"
            : "text-text-b-sec dark:text-text-w-sec"
        )}
      >
        {item.title}
      </span>
    </Link>
  );
};
