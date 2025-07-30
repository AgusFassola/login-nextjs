"use client";
import React, { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,  
      });
      if (res?.error)  return setError(res.error as string);

      if (res?.ok) {
        console.log("Login successful:", res);
        return router.push('/dashboard/profile');
      }

    } catch (error) {
      console.error("error:", error);

    }
  };

  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={ handleSubmit } className='flex flex-col w-96 mx-auto mt-10 bg-neutral-950'>

        {error && <p className='text-red-500'>{error}</p>}

        <h1 className='text-4xl font-bold mb-7'>Signin</h1>

        <input type="email" placeholder='agus@gmail.com' name='email' 
          className='bg-zinc-800 px-4 py-2 block mb-2'/>
        <input type="password" placeholder='********' name='password' 
          className='bg-zinc-800 px-4 py-2 block mb-2'/>
        <button type='submit' className='bg-indigo-500 px-4 py-2'>Login</button>
      </form>
    </div>
  )
}
