import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { LogOut, PlusCircle, User } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={`px-5 py-3 shadow-sm bg-white font-work-sans`}>
      <nav className={`flex justify-between items-center`}>
        <Link href="/">
          <Image src={"/logo.png"} alt={"Logo"} width={144} height={39} />
        </Link>

        <div className={`flex items-center gap-5`}>
          {session && session?.user ? (
            <>
              <Link
                href={`/startup/create`}
                className="flex items-center gap-2"
              >
                <PlusCircle className="size-6 text-primary" />
                <span className="max-sm:hidden text-16-medium ">create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type={"submit"} className="flex items-center gap-2">
                  <LogOut className="size-6 text-red-500" />
                  <span className="max-sm:hidden text-16-medium ">logout</span>
                </button>
              </form>

              <Link
                href={`/user/${session?.id}`}
              >
                <Avatar className="size-10">
                    <AvatarImage 
                        src={session?.user?.image || ''}
                        alt={session?.user?.name || ''}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit">Login</button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
