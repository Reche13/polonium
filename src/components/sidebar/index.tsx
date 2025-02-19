"use client";
import Link from "next/link";
import { NavItem, navlist } from "./sidebar-navlist";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const Sidebar = () => {
  return (
    <div className="bg-bg-light-pri dark:bg-bg-dark-pri border-r border-stroke-light-ter dark:border-stroke-dark-ter">
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
        "relative px-4 py-4 flex flex-col gap-1 items-center justify-center hover:bg-bg-light-ter dark:hover:bg-bg-dark-ter",
        isActive ? "bg-bg-light-sec dark:bg-bg-dark-sec" : ""
      )}
      href={item.href}
    >
      {isActive && (
        <div className="h-full w-0.5 bg-primary absolute top-0 bottom-0 left-0" />
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
          "text-[10px] font-normal",
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
