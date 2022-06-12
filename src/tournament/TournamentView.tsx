import TournamentPlayer from "./components/TournamentPlayer";
import React, {useEffect, useState} from "react";
import axios from "axios";
// @ts-ignore
export default function TournamentView({id, name = 'Untitled', date}) {
    const [championsLibrary, setChampionsLibrary] = useState([
        {id: 'test', value: 'Pense à charger la liste'}
    ])
    const [appConfig, setAppConfig] = useState({
        backgroundColor:'#FFFFFF',
        typeOfTrophy:'black'
    })

    const defaultPlayers = [
        {
            username: 'Groupe 1',
            champions: [],
            group: 'red',
            wins:0
        },
        {
            username: 'Groupe 2',
            champions: [],
            group: 'blue',
            wins:0
        }
    ];
    const saveStateInLocalStorage = () => {
      localStorage.setItem('players', JSON.stringify(players));
      localStorage.setItem('config', JSON.stringify(appConfig));
    }
        useEffect(()=>{
            if (players !== defaultPlayers){
                saveStateInLocalStorage();
            }

        })
    // @ts-ignore
    const [players, setPlayers] = useState(defaultPlayers);
    console.log(players)
    const updateChampionsLibrary = function updateChampionsLibrary() {
        axios.get("https://ddragon.leagueoflegends.com/cdn/12.9.1/data/fr_FR/champion.json")
            .then(response => {
                var championsLib = [];
                for (const [key, value] of Object.entries(response.data.data)) {
                    championsLib.push({id: `${key}`, value: `${key}`})
                }
                setChampionsLibrary(championsLib);
            })
            .catch(function (error) {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const updateUsername = function updateUsername(i: number, newUsername: string) {
        // @ts-ignore
        let mapped = players.map((player, index: number) => {
            return index == i ? {...player, username: newUsername} : {...player}
        })
        console.log(players);

        setPlayers(mapped);
        console.log(players);
    };
    const removeChampion = function removeChampion(i: number, champion: string) {
        // @ts-ignore
        let mapped = players.map((player, index) => {
            // @ts-ignore
            return index == i ? {...player, champions: player.champions.filter(c => c !== champion)} : {...player}
        });
        setPlayers(mapped);
    }
    const addChampion = function addChampion(i: number, champion: string) {
        // @ts-ignore
        let mapped = players.map((player, index) => {
            // @ts-ignore
            return index == i ? {...player, champions: player.champions.concat(champion)} : {...player}
        });
        setPlayers(mapped);
    }
    const addWin = function addWin(i:number) {
        // @ts-ignore
        let mapped = players.map((player, index: number) => {
            return index == i ? {...player, wins: player.wins + 1} : {...player}
        })
        setPlayers(mapped);
    }
    const removeWin = function removeWin(i:number) {
        let mapped = players.map((player, index: number) => {
            return index == i ? {...player, wins: player.wins - 1} : {...player}
        })
        setPlayers(mapped);
    }
    const changeGroup = function changeGroup(i:number, group:string) {
        let mapped = players.map((player, index: number) => {
            return index == i ? {...player, group: group} : {...player}
        })
        setPlayers(mapped);
    }
    const getDataFromSave = () => {
        if (localStorage.getItem('players')){
            // @ts-ignore
            setPlayers(JSON.parse(localStorage.getItem('players')))
        }
        if(localStorage.getItem('config')){
            // @ts-ignore
            setAppConfig(JSON.parse(localStorage.getItem('config')))
        }
    }

    function addPlayer(uname: string) {
        const newPlayer = {
            username: uname,
            champions: [],
            group:'default',
            wins:0
        };
        setPlayers(players.concat(newPlayer));
    }
    const removePlayer = (i:number)=>{
        let data = players.filter((player, index)=>{return index !== i})
            setPlayers(data);
    }
    const changeTrophyType = (type:string)=>{
        setAppConfig({...appConfig, typeOfTrophy: type});
    }
    // @ts-ignore

    return (
        <div className={'tournament-view'} style={{backgroundColor:appConfig.backgroundColor}}>
            <button onClick={getDataFromSave}>Récuperer la sauvegarde</button>
            <hr/>
            <button onClick={updateChampionsLibrary}>Charger la liste des champions</button>
            <hr/>
            {/*<div className={"tournament-header"}><span>{name}</span></div>*/}
            Type de trophé: <select value={appConfig.typeOfTrophy} onChange={(e)=>{changeTrophyType(e.target.value)}}>
            <option value="black">NOIR</option>
            <option value="white">BLANC</option>
            <option value="neon">NEON</option>
        </select> --- Couleur de fond: <input type="text" value={appConfig.backgroundColor} onChange={(e)=>{setAppConfig({...appConfig, backgroundColor: e.target.value});
            // @ts-ignore
            document.querySelector('body').style.backgroundColor=appConfig.backgroundColor}}/>
            <button onClick={()=>{
                //@ts-ignore
                document.querySelector('body').style.backgroundColor = appConfig.backgroundColor}}>Corriger bug couleur</button>
            <hr/>
            <button onClick={() => {
                return addPlayer('New')
            }}>Ajouter un joueur
            </button>
            <div className={"tournament-players-list"}>
                {players.map((item: object, index: number) => {
                    return <TournamentPlayer championsLibrary={championsLibrary} addChampion={addChampion}
                                             updateUsername={updateUsername} removeChampion={removeChampion}
                                             player={item} key={index} index={index} removeWin={removeWin} addWin={addWin} changeGroup={changeGroup} removePlayer={removePlayer} appConfig={appConfig}/>
                })}
            </div>

        </div>
    )
}