"use client";

import { UserButton } from "@clerk/nextjs";
import * as React from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useParams } from "next/navigation"; // Use "next/router" instead of "next/navigation"
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AlignVerticalSpaceAround, ArrowLeftRight, LineChart, Settings, ShoppingBasket } from "lucide-react";
import StoreSwitcher from "./StoreSwitcher";

export default function AdminRootPage() {
  const [isClient, setIsClient] = useState(false);
  const { storeId } = useParams(); // Use "next/router" to retrieve the "storeId" parameter

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center pt-2 pb-2 mt-32">
      <div className="flex justify-center mt-16 pb-20">
        <NavigationMenu className="mt-64 pt-64">
          <NavigationMenuList>
            <NavigationMenuItem>
              <StoreSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={`/${storeId}`} passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <LineChart className="w-6 h-6 mr-2 p-2" />
                  Overview
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={`/${storeId}/billboards`} passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <AlignVerticalSpaceAround className="w-6 h-6 mr-2" />
                  Billboards
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={`/${storeId}/products`} passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <ShoppingBasket className="w-6 h-6 mr-2" />
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={`/${storeId}/orders`} passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <ArrowLeftRight className="w-6 h-6 mr-2" />
                  Orders
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={`/${storeId}/settings`} passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Settings className="w-6 h-6 mr-2" />
                  Settings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <UserButton afterSignOutUrl="/" />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator />
    </div>
  );
}
