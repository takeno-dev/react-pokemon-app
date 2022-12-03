import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import {getAllPokemon, getPokemon} from "./utils/pokemon.js"

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //状態変数
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevtUrl, setPrevUrl] = useState("");


  useEffect(() => {

    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得する
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細データを取得
      loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  },[]);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  }


  //前へボタンを押した時のアクション
  const handlePrevPage = async() => {
    if (!prevtUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevtUrl);
    await loadPokemon(data.results);
    setLoading(false);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  }

  //次へボタンを押した時のアクション
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setLoading(false);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ):(
          <>
          <div className='PokemonCardContainer'>
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}></Card>
            })}
          </div>
          <div className='btn'>
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
