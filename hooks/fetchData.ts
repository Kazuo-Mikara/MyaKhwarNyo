import { Pokemon } from "../constants/types";
const fetchData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const detailedData = await Promise.all(
        data.results.map(async (pokemon: Pokemon) => {
            
            const res=await fetch(pokemon.url);
            const details=await res.json();
            return {
                name: pokemon.name,
                url: pokemon.url,
                image: details.sprites.front_default,
                imageBack: details.sprites.back_default,
                type:details.types,
            };
        }
        )
    );
    return detailedData;
}


export default fetchData;