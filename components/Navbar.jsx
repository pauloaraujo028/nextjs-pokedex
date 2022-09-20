import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import pokeball from "../public/pokeball.png";
import pokeballcolor from "../public/pokeballcolor.png";

const Navbar = () => {
  return (
    <div>
      <div className='h-14 p-2 flex items-center justify-center bg-poke-red'>
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="logo" height={46} width={154} />
          </a>
        </Link>
      </div>
      <div className="h-10 p-2 flex items-center justify-center border-t-4 border-poke-black">
        <div className="w-[40px] flex">
          <Image
            src={pokeballcolor}
            alt="pokeball"
          />
        </div>
        <p className='mx-1'>438</p>
        <div className="w-[40px] flex">
          <Image
            src={pokeball}
            alt="pokeball"
          />
        </div>
        <p className='mx-1'>898</p>
      </div>
    </div>

  )
}

export default Navbar