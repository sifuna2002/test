"use client";
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function AdminNav() {

const router = useRouter();

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/store');
        const store = await response.json();
        if (store) {
          router.push(`/${store._id}`);
      };       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    return (
        <div>
        </div>
    );
}