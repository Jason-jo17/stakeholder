import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center flex flex-col items-center">
        <div className="size-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="size-10" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Access Denied
        </h1>
        <p className="text-muted-foreground">
          You do not have the required permissions to view this page.
        </p>
        <div className="flex justify-center gap-4 w-full">
          <Button asChild className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
