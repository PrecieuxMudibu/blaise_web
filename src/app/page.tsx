"use client"
import React, { useEffect, useState } from 'react';
import QRCode from "qrcode";

export default function App () {
  const [url, setUrl] = useState('https://www.instagram.com/precieuxmudibu');
  const [src, setSrc] = useState('');

  const generateQrCode = () => {
    QRCode.toDataURL(url).then(setSrc)
  };


  useEffect(()=>{
    generateQrCode()
  },[])
  
  return (
    <div className='bg-white h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-center mb-8'>Scannez le code QR pour visiter notre chaîne</h1>
      <img className='w-fit h-52 text-4xl' src={src} alt="" />
      <p className='text-sm text-center mt-8'>Par Précieux Mudibu (+243 979 544 988)</p>
    </div>
  );
};

