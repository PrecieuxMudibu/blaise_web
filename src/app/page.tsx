"use client"
import React, { useEffect, useState } from 'react';
import QRCode from "qrcode";

import { useRouter } from 'next/navigation';
export default function App () {
  const { push } = useRouter();

  useEffect(()=>{
    push("/auth/login")
  },[])
  
  return (
    <></>
  );
};

