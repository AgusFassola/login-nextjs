'use client';
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">Home</Link>
        <div>
        {session?.user ? (
            <Link href="/dashboard/profile" className="text-white mr-4">Perfil</Link>

        ): (
            <>
                <Link href="/about" className="text-white mr-4">About</Link>
                <Link href="/register" className="text-white mr-4">Registro</Link>
                <Link href="/login" className="text-white mr-4">Login</Link>
            </>
        )}
            
        </div>
      </div>
    </nav>
  );
}