import React from 'react';
import './App.css';
import TournamentView from "./tournament/TournamentView";

function App() {
    
  return (
    <div className="App">
     <TournamentView id={1} name={'Tournoi de test'} date={new Date()}/>
    </div>
  );
}

export default App;
