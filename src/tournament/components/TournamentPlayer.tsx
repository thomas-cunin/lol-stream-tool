
import DatalistInput, {useComboboxControls} from "react-datalist-input";
import axios from "axios";
// @ts-ignore
export default function TournamentPlayer({player, index, updateUsername, removeChampion, addChampion, championsLibrary}) {
    const { setValue, value } = useComboboxControls({ isExpanded:false,initialValue: '' });
    return (
        <div className={'tournament-player'}>
            <div className={"player-infos"}><span className={'player-username'}>{player.username}</span></div>

            <div className={"player-champions-list"}>
                {player.champions.map((chammpion: string) => {
                    return <img src={"http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/" + chammpion + ".png"}
                                alt=""/>
                })}
            </div>
            <div className={"player-config"}>
                <label className={"dropdown"}>


                    <div className="dd-button">
                        Edit
                    </div>

                    <input type="checkbox" className="dd-input" id="test"/>

                    <ul className="dd-menu">
                        <li>Pseudo: <input type="text" value={player.username}
                                           onChange={(e) => updateUsername(index, e.target.value)}/></li>
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