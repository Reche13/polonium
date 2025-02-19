import { CloudCog, LucideIcon, Rss, Settings } from "lucide-react";

export type NavItem = {
  icon: LucideIcon;
  title: string;
  href: string;
};

export const navlist: NavItem[] = [
  {
    icon: CloudCog,
    title: "REST",
    href: "/",
  },
  {
    icon: Rss,
    title: "Realtime",
    href: "/realtime",
  },
  {
    icon: Settings,
    title: "Settings",
    href: "/settings",
  },
];
