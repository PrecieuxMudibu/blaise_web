"use client"
import ProfessorsAllList from '@/components/allList'
import React from 'react'

export default function page() {
  return (
    <div className='bg-gray-100 h-screen p-4'>
        <h2 className="w-full mb-4 text-basicColorDark text-lg font-medium">
                    Professeurs
                </h2>
      <ProfessorsAllList />
    </div>
  )
}
