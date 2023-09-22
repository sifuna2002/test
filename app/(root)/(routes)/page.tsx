"use client"
 
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input" 
import { UserButton } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusCircle, Store } from "lucide-react";
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z.object({
  storeName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function SetUpPage() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
    },
  });

useEffect(() => {
  setIsOpen(true);
  }, []);
  
async function onSubmit(values: z.infer<typeof formSchema>) {
  const store = await axios.post('/api/store', values);
  toast.success('Store Successfully Created');
  await setIsOpen(false);
  router.push(`/${store.data._id}`); // Navigate to the store's page
}
  
const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null;
  }

const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-center h-full pt-32">
      <UserButton afterSignOutUrl="/"/>
      <div className="ml-6">
          <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogTrigger asChild>
            <Button variant="outline" className="space-x-3 rounded-fullpx-4"><div>
              <PlusCircle />
            </div>
              <div>
                Create New Store
              </div><Store /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-full">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="storeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Name</FormLabel>
                          <FormControl>
                            <Input placeholder="My Store" {...field} />
                          </FormControl>
                          <FormDescription>
                            This Will Be The Name Of Your Store
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
            </DialogContent>
          </Dialog>
      </div>
    </div>
    )
}
// CSHsoa1zMwzftZpW