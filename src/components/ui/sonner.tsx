"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-900 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-md",
          description: "group-[.toast]:text-neutral-500",
          actionButton: "group-[.toast]:bg-primary-500 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500",
        },
      }}
    />
  );
}

export { toast } from "sonner";
