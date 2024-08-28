import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui";
import { Brand } from "./Brand";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <Brand />
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/learn"
              signUpForceRedirectUrl="/learn"
            >
              <Button size="lg" variant="ghost">
                login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
