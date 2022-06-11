import TournamentPlayer from "./components/TournamentPlayer";
import React, {useEffect, useState} from "react";
import axios from "axios";
// @ts-ignore
export default function TournamentView({id, name = 'Untitled', date}) {
    const [championsLibrary, setChampionsLibrary] = useState([
        {id: 'test', value: 'Pense à charger la liste'}
    ])
    const saveStateInLocalStorage = () => {
      localStorage.setItem('players', JSON.stringify(players));
    }
        useEffect(()=>{
saveStateInLocalStorage();
        })
    // @ts-ignore
    const [players, setPlayers] = useState([
            {
                username: 'Raiz',
                champions: [],
                group: 'red',
                wins:0
            },
            {
                username: 'Citronatorix',
                champions: [],
                group: 'blue',
                wins:0
            },
            {
                username: 'Citronx',
                champions: [],
                group: 'maroon',
                wins:0
            },
            {
                username: 'Ci',
                champions: [],
                group: 'purple',
                wins:0
            },
            {
                username: 'Ci',
                champions: [],
                group: 'green',
                wins:0
            }
        ]
    );
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

    function addPlayer(uname: string) {
        const newPlayer = {
            username: uname,
            champions: [],
            group:'default',
            wins:0
        };
        setPlayers(players.concat(newPlayer));
    }

    // @ts-ignore
    return (
        <div className={'tournament-view'}>
            <button onClick={updateChampionsLibrary}>Charger la liste des champions</button>
            <div className={"tournament-header"}><span>{name}</span></div>
            <button onClick={() => {
                return addPlayer('New')
            }}>Ajouter un joueur
            </button>
            <div className={"tournament-players-list"}>
                {players.map((item: object, index: number) => {
                    return <TournamentPlayer championsLibrary={championsLibrary} addChampion={addChampion}
                                             updateUsername={updateUsername} removeChampion={removeChampion}
                                             player={item} key={index} index={index} removeWin={removeWin} addWin={addWin} changeGroup={changeGroup}/>
                })}
            </div>

        </div>
    )
}