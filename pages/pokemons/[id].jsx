/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react'

const Details = ({ pokemon, styles }) => {
  //console.log(pokemon)
  return (
    <div title={pokemon.name.english}>
      <div className='absolute flex justify-end items-center w-full'>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Voltar
          </button>
        </Link>
      </div>
      <div className="min-h-screen pt-8 flex flex-wrap sm:flex-nowrap justify-center mx-auto bg-gray-200">
        <div className="flex mx-20 pt-24 w-[400px] drop-shadow-[5px_0_10px_rgb(0,0,0)]">
          <img src={pokemon.image.hires} alt="pokemon" />
        </div>
        <div className="flex-1 mx-20 py-18 text-black font-bold">
          <p className="text-4xl font-semibold">
            <span className="mr-4">#{pokemon.id}</span>
            <span>{pokemon.name.english}</span>
          </p>
          <p className='my-1'>
            <span className="text-sm">{pokemon.name.japanese} • </span>
            <span className="text-sm">{pokemon.name.chinese} • </span>
            <span className="text-sm">{pokemon.name.french} • </span>
          </p>
          <p className='my-2'>
            <span className='font-semibold'>Species:&nbsp;</span>
            <span>{pokemon.species}</span>
          </p>
          <p>
            {pokemon.description}
          </p>
          <p className='mt-2'>
            <span className='font-semibold'>Height:&nbsp;</span>
            <span>{pokemon.profile.height}</span>
          </p>
          <p>
            <span className='font-semibold'>Weight:&nbsp;</span>
            <span>{pokemon.profile.weight}</span>
          </p>
          <p className='my-2'>
            {pokemon.type.map((type, j) => {
              return (
                <span
                  key={type}
                  className="text-white text-2xl font-semibold mr-2 px-4 rounded"
                  style={{
                    backgroundColor: styles[type.toLowerCase()],
                  }}
                >
                  {type}
                </span>
              );
            })}
          </p>
          <div>
            {Object.keys(pokemon.base).map((stat, i) => {
              let statPercentFactor = 0
              let statColor
              switch (stat) {
                case "HP":
                  statPercentFactor = 2.55;
                  statColor = "#da4343";
                  break;
                case "Attack":
                  statPercentFactor = 1.81;
                  statColor = "#f38d45";
                  break;
                case "Defense":
                  statPercentFactor = 2.3;
                  statColor = "#f3d14a";
                  break;
                case "Sp. Attack":
                  statPercentFactor = 1.73;
                  statColor = "#547fe4";
                  break;
                case "Sp. Defense":
                  statPercentFactor = 2.3;
                  statColor = "#84df57";
                  break;
                case "Speed":
                  statPercentFactor = 2.0;
                  statColor = "#f75887";
                  break;
              }
              return (
                <div key={stat}>
                  <div className='flex justify-between'>
                    <span>{stat.toUpperCase()}</span>
                    <span>{pokemon.base[stat]}</span>
                  </div>
                  <div className='h-4 w-full bg-gray-900 rounded-full'>
                    <div className='h-4 rounded-full' style={{ backgroundColor: statColor, width: parseInt(pokemon.base[stat]) * statPercentFactor }}>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div >
  )
}

export async function getServerSideProps({ query }) {
  try {
    const res = await fetch(`https://api.pikaserve.xyz/pokemon/${query.id}`)
    const data = await res.json()
    return {
      props: {
        pokemon: data,
        styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default Details