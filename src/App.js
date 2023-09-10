import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [pokeType, setPokeType] = useState("");
  const [order, setOrder] = useState("");

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        pokeType={pokeType}
        setPokeType={setPokeType}
        order={order}
        setOrder={setOrder}
      />
      <CardsContainer>
        {pokemons
          .filter((pokemon) => {
            return idFilter ? pokemon.id.includes(idFilter) : pokemon;
          })
          .filter((pokemon) => {
            return pokemon.name.english
              .toLowerCase()
              .includes(pesquisa.toLowerCase());
          })
          .filter((item) => {
            if (pokeType !== "") {
              return item.type.includes(pokeType);
            } else {
              return item;
            }
          })
          .sort((a, b) => {
            
            // USANDO TERNÁRIO PARA FAZER A LÓGICA
            if (order === "asc") {
              return a.name.english > b.name.english ? 1 : -1;
            }
            if (order === "desc") {
              return b.name.english > a.name.english ? 1 : -1;
            }

            // USANDO if/else PARA FAZER A LÓGICA
            // if (order === "asc") {
            //   if (a.name.english > b.name.english) {
            //     return 1;
            //   } else if (a.name.english < b.name.english) {
            //     return -1;
            //   } else {
            //     return 0;
            //   }
            // USANDO localeCompare PARA FAZER A LÓGICA
            // } else if (order === "desc") {
            //   return b.name.english.localeCompare(a.name.english);
            // }
          })
          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
