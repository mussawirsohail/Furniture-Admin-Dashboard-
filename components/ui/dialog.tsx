// "use client"

// import type React from "react"
// import { createContext, useContext, useState } from "react"
// import { X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Anybody } from "next/font/google"

// interface DialogProps {
//   children: React.ReactNode
//   open?: boolean
//   onOpenChange?: (open: boolean) => void
// }

// const DialogContext = createContext<{
//   open: boolean
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>
// } | null>(null)

// export const Dialog: React.FC<DialogProps> = ({ children, open: controlledOpen, onOpenChange }) => {
//   const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
//   const isControlled = controlledOpen !== undefined

//   const open = isControlled ? controlledOpen : uncontrolledOpen
//   const setOpen = (newOpen: boolean) => {
//     if (isControlled) {
//       onOpenChange?.(newOpen)
//     } else {
//       setUncontrolledOpen(newOpen)
//     }
//   }

//   return <DialogContext.Provider value ={{ open, setOpen }}>{children}</DialogContext.Provider>
// }

// export const DialogTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
//   const context = useContext(DialogContext)
//   if (!context) throw new Error("DialogTrigger must be used within a Dialog")

//   return (
//     <button {...props} onClick={() => context.setOpen(true)}>
//       {children}
//     </button>
//   )
// }

// export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
//   const context = useContext(DialogContext)
//   if (!context) throw new Error("DialogContent must be used within a Dialog")

//   if (!context.open) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className={cn("relative bg-background p-6 rounded-lg shadow-lg w-full max-w-lg", className)} {...props}>
//         {children}
//         <button
//           className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
//           onClick={() => context.setOpen(false)}
//         >
//           <X className="h-4 w-4" />
//           <span className="sr-only">Close</span>
//         </button>
//       </div>
//     </div>
//   )
// }

// export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
//   <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
// )

// export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
//   <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
// )

// export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
//   <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
// )

// export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
//   <p className={cn("text-sm text-muted-foreground", className)} {...props} />
// )

"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Ensure the DialogContext is properly initialized
const DialogContext = createContext<{
  open: boolean;
  setDialogOpen: (open: boolean) => void;
} | null>(null);

export const Dialog: React.FC<DialogProps> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;

  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setDialogOpen = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen); // Notify the parent if it's controlled
    } else {
      setUncontrolledOpen(newOpen); // Update the internal state
    }
  };

  return (
    <DialogContext.Provider value={{ open, setDialogOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within a Dialog");

  return (
    <button {...props} onClick={() => context.setDialogOpen(true)}>
      {children}
    </button>
  );
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used within a Dialog");

  if (!context.open) return null; // Only render content when open is true

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={cn("relative bg-background p-6 rounded-lg shadow-lg w-full max-w-lg", className)} {...props}>
        {children}
        {/* Close button */}
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => context.setDialogOpen(false)} // Properly closes the dialog
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
);

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

