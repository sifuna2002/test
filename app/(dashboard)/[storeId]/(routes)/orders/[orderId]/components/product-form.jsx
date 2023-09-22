"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";

import {
  categories,
  occasionCategories,
  colorCategories,
  functionalityCategories,
  textureCategories,
  materialCategories,
  placementCategories,
  availabilityCategories,
  allCountryOptions,
  customizationOptions,
  roomCategories,
  symbolismCategories,
  shippingOptions,
  ageGroupCategories,
  genderCategories,
} from '@/data/categories';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";


const formSchema = {
  productName: "",
  images: [{ url: "" }],

};

export const ProductForm = ({
  initialData,

}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create Product';

  const defaultValues = initialData ? {
    ...initialData,
    price: parseFloat(String(initialData?.price)),
  } : {
    productName: '',
    images: [],
    isFeatured: false,
    isArchived: false,
  }

  const form = useForm({
    defaultValues
  });

  

  console.log("Initial Data");


  const onSubmit = async (data) => {
    // Calculate the percentage discount
    const cashPrice = parseFloat(data.cashPrice);
    const sellingPrice = parseFloat(data.sellingPrice);
    const percentageDiscount = Math.round(((cashPrice - sellingPrice) / cashPrice) * 100);

    // Append the storeId and percentageDiscount to the data object
    data.storeId = params.storeId;
    data.percentageDiscount = percentageDiscount;
    data.cashPrice = parseFloat(data.cashPrice);
    data.sellingPrice = parseFloat(data.sellingPrice);
    data.handlingTime = parseFloat(data.handlingTime);
    data.productHeight = parseFloat(data.productHeight);
    data.productWidth = parseFloat(data.productWidth);
    data.productWeight = parseFloat(data.productWeight);    
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Product deleted.');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const inputStyles = { width: '250px', marginRight: '1rem', marginBottom: '1rem' };
  const containerStyles = {
  // This creates vertical spacing
    gap: '1rem',             // Equivalent to space-y-4 in Tailwind CSS
  };
  const checkboxStyles = { marginRight: '1rem', marginBottom: '1rem' };

  return (
    <>
     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={onDelete}
          >
            <Trash style={{ height: '1rem', width: '1rem' }} />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem style={inputStyles}>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload 
                    value={field.value.map((image) => image.url)} 
                    disabled={loading} 
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem style={inputStyles}>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cashPrice"
              render={({ field }) => (
                <FormItem style={inputStyles}>
                  <FormLabel>Cash Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productHeight"
              render={({ field }) => (
                <FormItem style={inputStyles}>
                  <FormLabel>Product Weight</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="1.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productWidth"
              render={({ field }) => (
                <FormItem style={inputStyles}>
                  <FormLabel>Product Width</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="1.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productWeight"
              render={({ field }) => (
                <FormItem style={inputStyles}>
                  <FormLabel>Product Weight</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="1.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="handlingTime"
              render={({ field }) => (
                <FormItem style={inputStyles}>
                  <FormLabel>Handling Time</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellingPrice"
              render={({ field }) => (
                <FormItem style={inputStyles}>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
          control={form.control}
          name="productCategory"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.label === field.value
                          )?.label
                        : "Select category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.label}
                          key={category.label}
                          onSelect={() => {
                            form.setValue("productCategory", category.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productOcassion"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Occassion</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? occasionCategories.find(
                            (occassion) => occassion.label === field.value
                          )?.label
                        : "Select Ocassion"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Occassions..." />
                    <CommandEmpty>No result found.</CommandEmpty>
                    <CommandGroup>
                      {occasionCategories.map((ocassion) => (
                        <CommandItem
                          value={ocassion.label}
                          key={ocassion.label}
                          onSelect={() => {
                            form.setValue("productOcassion", ocassion.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              ocassion.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {ocassion.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productColor"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Color</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? colorCategories.find(
                            (color) => color.label === field.value
                          )?.label
                        : "Select color"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {colorCategories.map((color) => (
                        <CommandItem
                          value={color.label}
                          key={color.label}
                          onSelect={() => {
                            form.setValue("productColor", color.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              color.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {color.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productFunctionality"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Functionality</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? functionalityCategories.find(
                            (functionality) => functionality.label === field.value
                          )?.label
                        : "Select functionality"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search functionality..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {functionalityCategories.map((functionality) => (
                        <CommandItem
                          value={functionality.label}
                          key={functionality.label}
                          onSelect={() => {
                            form.setValue("productFunctionality", functionality.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              functionality.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {functionality.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productTexture"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Texture</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? textureCategories.find(
                            (texture) => texture.label === field.value
                          )?.label
                        : "Select texture"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search texture..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {textureCategories.map((texture) => (
                        <CommandItem
                          value={texture.label}
                          key={texture.label}
                          onSelect={() => {
                            form.setValue("productTexture", texture.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              texture.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {texture.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productMaterial"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Material</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? materialCategories.find(
                            (material) => material.label === field.value
                          )?.label
                        : "Select material"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search material..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {materialCategories.map((material) => (
                        <CommandItem
                          value={material.label}
                          key={material.label}
                          onSelect={() => {
                            form.setValue("productMaterial", material.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              material.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {material.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="productPlacement"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Placement</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? placementCategories.find(
                            (placement) => placement.label === field.value
                          )?.label
                        : "Select placement"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search placement..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {placementCategories.map((placement) => (
                        <CommandItem
                          value={placement.label}
                          key={placement.label}
                          onSelect={() => {
                            form.setValue("productPlacement", placement.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              placement.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {placement.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="productAvailability"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Availability</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? availabilityCategories.find(
                            (availability) => availability.label === field.value
                          )?.label
                        : "Select availability"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search availability..." />
                    <CommandEmpty>No avilability options found.</CommandEmpty>
                    <CommandGroup>
                      {availabilityCategories.map((availability) => (
                        <CommandItem
                          value={availability.label}
                          key={availability.label}
                          onSelect={() => {
                            form.setValue("productAvailability", availability.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              availability.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {availability.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productOrigin"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Origin</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? allCountryOptions.find(
                            (origin) => origin.label === field.value
                          )?.label
                        : "Select origin"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search origin..." />
                    <CommandEmpty>No origins found.</CommandEmpty>
                    <CommandGroup>
                      {allCountryOptions.map((origin) => (
                        <CommandItem
                          value={origin.label}
                          key={origin.label}
                          onSelect={() => {
                            form.setValue("productOrigin", origin.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              origin.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {origin.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productCustomisation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Customization</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? customizationOptions.find(
                            (customization) => customization.label === field.value
                          )?.label
                        : "Select customization"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search customization..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {customizationOptions.map((customization) => (
                        <CommandItem
                          value={customization.label}
                          key={customization.value}
                          onSelect={() => {
                            form.setValue("productCustomisation", customization.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              customization.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {customization.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="suitableRoom"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Suitable Room</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? roomCategories.find(
                            (room) => room.label === field.value
                          )?.label
                        : "Select room"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search room..." />
                    <CommandEmpty>No room found.</CommandEmpty>
                    <CommandGroup>
                      {roomCategories.map((room) => (
                        <CommandItem
                          value={room.label}
                          key={room.label}
                          onSelect={() => {
                            form.setValue("suitableRoom", room.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              room.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {room.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productSymbolism"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Symblolism</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? symbolismCategories.find(
                            (symbolism) => symbolism.label === field.value
                          )?.label
                        : "Select symbolism"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search symbolism..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {symbolismCategories.map((symbolism) => (
                        <CommandItem
                          value={symbolism.label}
                          key={symbolism.label}
                          onSelect={() => {
                            form.setValue("productSymbolism", symbolism.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              symbolism.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {symbolism.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productAgeGroup"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Age Group</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? ageGroupCategories.find(
                            (ageGroup) => ageGroup.label === field.value
                          )?.label
                        : "Select ageGroup"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search ageGroup..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {ageGroupCategories.map((ageGroup) => (
                        <CommandItem
                          value={ageGroup.label}
                          key={ageGroup.label}
                          onSelect={() => {
                            form.setValue("productAgeGroup", ageGroup.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              ageGroup.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {ageGroup.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="productGender"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Gender</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? genderCategories.find(
                            (gender) => gender.label === field.value
                          )?.label
                        : "Select gender"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search gender..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {genderCategories.map((gender) => (
                        <CommandItem
                          value={gender.label}
                          key={gender.label}
                          onSelect={() => {
                            form.setValue("productGender", gender.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              gender.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {gender.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
            />
            <FormField
          control={form.control}
          name="shippingOption"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Shipping Options</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? shippingOptions.find(
                            (shipping) => shipping.label === field.value
                          )?.label
                        : "Select shipping"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search shipping..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {shippingOptions.map((shipping) => (
                        <CommandItem
                          value={shipping.label}
                          key={shipping.label}
                          onSelect={() => {
                            form.setValue("shippingOption", shipping.label)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              shipping.label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {shipping.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Archived
                    </FormLabel>
                    <FormDescription>
                        This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Featured
                    </FormLabel>
                    <FormDescription>
                        This product will appear on the home page
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem style={{marginBottom : "10px"}}>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Give The Product Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button disabled={loading} type="submit" style={{marginRight: 'auto' }}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
