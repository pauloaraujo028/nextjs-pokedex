/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home({ styles, pokeData }) {
  // console.log(pokeData)
  const [searchResults, setSearchResults] = useState(pokeData);
  const [pokeArr, setPokeArr] = useState(searchResults.slice(0, 20));
  const [page, setPage] = useState(0);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  // console.log(pokeArr);
  useEffect(() => {
    setPokeArr(searchResults.slice(page * 20, page * 20 + 20));
  }, [page]);
  useEffect(() => {
    setPokeArr(searchResults.slice(0, 20));
  }, [searchResults]);
  useEffect(() => {
    if (input.length === 0 && filter === "All") {
      setSearchResults(pokeData);
      return;
    }
    if (input.length !== 0 && filter === "All") {
      setSearchResults(
        (c) =>
          (c = pokeData.filter((pokeman) => {
            return pokeman.name.english
              .toLowerCase()
              .includes(input.toLowerCase());
          }))
      );
      return;
    }
    if (input.length === 0 && filter !== "All") {
      setSearchResults(
        (c) =>
          (c = pokeData.filter((pokeman) => {
            return pokeman.type.includes(filter);
          }))
      );
      return;
    }
    if (input.length !== 0 && filter !== "All") {
      setSearchResults(
        (c) =>
          (c = pokeData.filter((pokeman) => {
            return (
              pokeman.type.includes(filter) &&
              pokeman.name.english.toLowerCase().includes(input.toLowerCase())
            );
          }))
      );
      return;
    }
  }, [input, filter]);
  const handlePrev = () => {
    setPage((c) => {
      return c - 1;
    });
  };
  const handleNext = () => {
    setPage((c) => {
      return c + 1;
    });
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  console.log(input, filter);
  return (
    <Layout title={"Next Pokédex"}>
      <div className="flex justify-between py-6">
        <div className="flex w-full px-8 sm:px-16 py-4 items-center">
          <label
            htmlFor="types"
            className="block mr-6 font-medium text-gray-900 text-lg sm:text-2xl"
          >
            Buscar
          </label>
          <input
            type="text"
            placeholder="A a Z..."
            className="w-full sm:w-full bg-gray-100 px-6 py-1 rounded-lg border border-poke-yellow outline-none"
            onChange={handleInputChange}
            value={input}
          />
        </div>
        <div className="flex w-full px-8 sm:px-16 py-4 items-center">
          <label
            htmlFor="types"
            className="block mr-6 font-medium text-gray-900 text-lg sm:text-2xl"
          >
            Tipo
          </label>
          <select
            name="types"
            id="types"
            defaultValue={"All"}
            className="bg-gray-50 border border-poke-yellow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 sm:p-2.5"
            onChange={handleFilterChange}
            value={filter}
          >
            <option value="All">Todos</option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Grass">Grass</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mx-auto">
        {pokeArr.map((pokeman, i) => {
          return (
            <div key={pokeman.name.english} className="p-4">
              <a>
                <div className="bg-gray-200 py-4 px-6 rounded">
                  <img
                    src={pokeman.image.hires}
                    alt=""
                    className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px] drop-shadow-[2px_4px_4px_rgb(0,0,0)]"
                  />
                  <div className="text-center">
                    {pokeman.type.map((type, j) => {
                      return (
                        <span
                          key={type}
                          className="text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                          style={{
                            backgroundColor: styles[type.toLowerCase()],
                          }}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-center">
                    <span className="font-semibold text-3xl mr-2">
                      {`${pokeman.id}.`}
                    </span>
                    <span className="text-3xl">{pokeman.name.english}</span>
                  </p>
                  <div className="flex justify-center items-center pt-4">
                    <Link href={`/pokemons/${pokeman.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700">
                        Detalhes
                      </button>
                    </Link>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <div className="container mx-auto flex flex-wrap justify-evenly py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
          onClick={handlePrev}
          disabled={page === 0 ? true : false}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
          onClick={handleNext}
          disabled={searchResults.length / 20 - page < 1 ? true : false}
        >
          Próxima
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://api.pikaserve.xyz/pokemon/all");
    const data = await res.json();
    return {
      props: {
        pokeData: data,
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
      },
    };
  } catch (error) {
    console.log(error);
  }
}
