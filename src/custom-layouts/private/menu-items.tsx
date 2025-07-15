import React from "react";
import { Button, Drawer, message } from "antd";
import {
  Banknote,
  CalendarClock,
  Contact,
  GraduationCap,
  LayoutDashboard,
  List,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
interface MenuItemsProps {
  showMenuItems: boolean;
  setShowMenuItems: (showMenuItems: boolean) => void;
}

function MenuItems({ showMenuItems, setShowMenuItems }: MenuItemsProps) {
  const iconSize = 16;
  const pathname = usePathname();
  const router = useRouter();

  const { signOut } = useAuth();
  const menuItems = [
    {
      name: "داشبورد",
      icon: <LayoutDashboard size={iconSize} />,
      path: "/admin/dashboard",
    },
    {
      name: "پزشکان",
      icon: <GraduationCap size={iconSize} />,
      path: "/admin/doctors",
    },
    {
      name: "رزروها",
      icon: <CalendarClock size={iconSize} />,
      path: "/admin/appointments",
    },
    {
      name: "بیماران",
      icon: <Contact size={iconSize} />,
      path: "/admin/patients",
    },
    {
      name: "گزارش ها",
      icon: <Banknote size={iconSize} />,
      path: "/admin/reports",
    },
    {
      name: "کارکنان / کاربران",
      icon: <List size={iconSize} />,
      path: "/admin/users",
    },
  ];

  const handleSignOut = async () => {
    try {
      message.success("با موفقیت از سیستم خارج شد");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Drawer
      open={showMenuItems}
      onClose={() => setShowMenuItems(false)}
      title="منو "
    >
      <div className="flex flex-col gap-7 mt-10">
        {menuItems.map((item, index) => (
          <div
            className={`p-2 flex gap-5 items-center cursor-pointer ${
              pathname === item.path
                ? "border-primary bg-gray-200 border-solid border"
                : ""
            }`}
            key={index}
            onClick={() => {
              router.push(item.path);
              setShowMenuItems(false);
            }}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
        <Button icon={<LogOut size={iconSize} />} onClick={handleSignOut}>
          خروج
        </Button>
      </div>
    </Drawer>
  );
}

export default MenuItems;
