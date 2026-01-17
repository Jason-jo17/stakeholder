import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Authentication Error
        </h1>
        <p className="text-muted-foreground">
          {error === "Configuration"
            ? "There is a problem with the server configuration. Check if all environment variables are set correctly."
            : error === "AccessDenied"
            ? "You do not have permission to sign in."
            : "An error occurred during authentication."}
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
