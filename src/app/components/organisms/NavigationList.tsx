"use client";

import { usePathname } from "next/navigation";
import { GrGroup } from "react-icons/gr";
import { TfiTarget } from "react-icons/tfi";
import { MdDataObject } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbAccessPoint } from "react-icons/tb";
import { MdAltRoute } from "react-icons/md";
import MenuItem from "@/components/molecules/MenuItem";

export default function NavigationList({}: {}) {
  const menuItems = [
    {
      icon: <GrGroup className="navigation-icon" />,
      label: "User Group",
      href: "/user-group",
    },
    {
      icon: <MdOutlineAdminPanelSettings className="navigation-icon" />,
      label: "Role",
      href: "/role",
    },
    {
      icon: <TbAccessPoint className="navigation-icon" />,
      label: "Endpoint",
      href: "/endpoint",
    },
    {
      icon: <MdAltRoute className="navigation-icon" />,
      label: "Path",
      href: "/path",
    },
    {
      icon: <MdDataObject className="navigation-icon" />,
      label: "Object Group",
      href: "/target-group",
    },
    {
      icon: <TfiTarget className="navigation-icon" />,
      label: "Object",
      href: "/target",
    },
  ];

  const pathname = usePathname();

  return (
    <nav className="fixed top-20 left-0 h-full w-64 p-4 space-y-2 border-r-2 bg-white border-gray-200">
      <ol className="space-y-2">
        {menuItems.map((menuItem) => (
          <li key={menuItem.label}>
            <MenuItem
              icon={menuItem.icon}
              label={menuItem.label}
              href={menuItem.href}
              selected={menuItem.href === pathname}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}