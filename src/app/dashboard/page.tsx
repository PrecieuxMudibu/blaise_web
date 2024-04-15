"use client"
import ProfessorsAllList from '@/components/allList'
import React from 'react'
// import havilaImage from "@/public/havila.jpeg"
import havilaImage from "@/havila.jpeg"
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
  return (
    <div className='bg-gray-100 h-screen p-4'>
      {/* <div className='flex '> */}

      <div className='flex justify-end'>
          <Link href="/auth/login"
          >
            Déconnexion
          </Link>
        </div>
      
      <div className=''>

        <Image
          src={havilaImage}
          alt="Havila"
          height={400}
          width={400}
          className='w-24 h-24 mx-auto'
          />

          <h1 className='text-center text-basicColorDark text-xl'>Collège Havila</h1>
          </div>
      
             <ProfessorsAllList />
    </div>
  )
}
