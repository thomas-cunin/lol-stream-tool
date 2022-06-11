
import DatalistInput, {useComboboxControls} from "react-datalist-input";
import {ReactComponent as WinIcon} from '../../trophy-silhouette-svgrepo-com.svg';
import axios from "axios";
import {Component} from "react";
// @ts-ignore
export default function TournamentPlayer({player, index, updateUsername, removeChampion, addChampion, championsLibrary, addWin,removeWin, changeGroup}) {
    const { setValue, value } = useComboboxControls({ isExpanded:false,initialValue: '' });
    const wins: JSX.Element[] = [];
    for (let i = 1; i <= player.wins; i++) {
        wins.push(<WinIcon key={'win-'+i} />);
    }
    return (
        <div className={`tournament-player ${'bg-'+ player.group}`}>
            <div className={"player-infos"}><span className={'player-username'}>{player.username}</span></div>
            <div className="player-wins">
                {wins}
            </div>
            <div className={"player-champions-list"}>
                {player.champions.map((chammpion: string, i:number) => {
                    return <img src={"http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/" + chammpion + ".png"}
                                alt=""
                                key={'champ-'+player.username+chammpion+i}/>
                })}
            </div>
            <div className={"player-config"}>
                <label className={"dropdown"}>


                    <div className="dd-button">
                        Editer
                    </div>

                    <input type="checkbox" className="dd-input" id="test"/>

                    <ul className="dd-menu">
                        <li>Pseudo: <input type="text" value={player.username}
                                           onChange={(e) => updateUsername(index, e.target.value)}/></li>
                        <li className="divider"></li>
                        <li>Choix de la couleur:</li>
                        <li><select value={player.group} onChange={(e)=>{changeGroup(index,e.target.value)}}>
                            <option value="red">ROUGE</option>
                            <option value="blue">BLEU</option>
                            <option value="green">VERT</option>
                            <option value="maroon">MARRON</option>
                            <option value="purple">VIOLET</option>
                        </select></li>
                        <li className="divider"></li>
                        <li>Nombre de victoire: {player.wins}</li>
                        {player.wins > 0 && <li>
                            <button onClick={() => {
                                removeWin(index, player.wins - 1)
                            }}>Enlever
                            </button>
                        </li>}
                        <li><button onClick={()=>{addWin(index, player.wins + 1)}}>Ajouter</button></li>
                        <li className="divider"></li>
                        {player.champions.map((chammpion: string) => {
                            return <li>{chammpion} <button onClick={(e) => removeChampion(index, chammpion)}>Suppr</button></li>
                        })}
                        <DatalistInput
                            value={value}
                            setValue={setValue}
                            placeholder="Urgot"
                            label="Ajouter un champion"
                            onSelect={(item) => {
                                addChampion(index, item.value);
                                setValue('');
                            }}
                            items={championsLibrary}
                        />
                    </ul>

                </label>
            </div>

        </div>
    )
}