"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import CreateStoreMain from "./CreateStoreMain";

export default function StoreSwitcher({ className }) {
  const params = useParams();
  const router = useRouter();

  const [formattedItems, setFormattedItems] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [popopen, setPopOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stores");
        const stores = await response.json();

        const formattedItems = stores.map((item) => ({
          label: item.storeName,
          value: item._id,
        }));

        const currentStore = formattedItems.find((item) => item.value === params.storeId);
        if (!currentStore) {
          router.push("/");
        }
        setFormattedItems(formattedItems);
        setCurrentStore(currentStore);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onStoreSelect = (store) => {
    setPopOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={popopen} onOpenChange={setPopOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={popopen}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Stores">
              {formattedItems.length === 0 ? (
                <CommandItem>No store found.</CommandItem>
              ) : (
                formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                  >
                    <Store className="mr-2 h-4 w-4" />
                    {store.label}
                    {currentStore?.value === store.value && (
                      <Check className="ml-auto h-4 w-4 opacity-100" />
                    )}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <PlusCircle className="mr-2 h-5 w-5" />
                <CreateStoreMain />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
