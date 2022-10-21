import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];
    for (var i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    // const allHeld = dice.every((die) => die.isHeld === true);
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const sameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && sameValue) {
      setTenzies(true);
      console.log("You Won the game");
    }
  }, [dice]);

  const diceElements = dice.map((dice) => {
    return (
      <Die
        key={dice.id}
        value={dice.value}
        isHeld={dice.isHeld}
        holdDice={() => holdDice(dice.id)}
      />
    );
  });

  function rollDice(id) {
    if (!tenzies) {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  return (
    <div className="flex-box">
      <div className="main">
        {tenzies && <Confetti />}
        <div className="App">
          <div className="title-and-insturction">
            <h1 className="title">Tenzie</h1>
            <p className="instruction">
              Roll Until all dice are the same.Click Each Dice to Freeze at its
              current value between Rolls
            </p>
          </div>
          <div className="die--container">
            {diceElements}
            <button className="roll-btn" type="submit" onClick={rollDice}>
              {tenzies ? `New Game` : "Roll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
