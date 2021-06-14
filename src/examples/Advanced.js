import React, { useState, useMemo } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";

const db = [
    {
        name: "情報システム論実習",
        faculty: "情報学研究科社会情報学専攻",
        teacher: "吉川 正俊",
        description:
            "履修者は、情報システムに関連する実習を行うことにより、関連する理論や技術を実際の情報システムの分析やデザインに適用することを通して習得する。情報システムの分析や設計に関する方法論や技術を、実際に情報システムの分析や設計に応用できるようになる。",
    },
    {
        name: "情報システム分析論",
        faculty: "情報学研究科社会情報学専攻",
        teacher: "吉川 正俊",
        description:
            "履修者は、情報システムに関連する実習を行うことにより、関連する理論や技術を実際の情報システムの分析やデザインに適用することを通して習得する。情報システムの分析や設計に関する方法論や技術を、実際に情報システムの分析や設計に応用できるようになる。",
    },
    {
        name: "情報システム論3",
        faculty: "情報学研究科社会情報学専攻",
        teacher: "吉川 正俊",
        description:
            "履修者は、情報システムに関連する実習を行うことにより、関連する理論や技術を実際の情報システムの分析やデザインに適用することを通して習得する。情報システムの分析や設計に関する方法論や技術を、実際に情報システムの分析や設計に応用できるようになる。",
    },
    {
        name: "情報シス論4",
        faculty: "情報学研究科社会情報学専攻",
        teacher: "吉川 正俊",
        description:
            "履修者は、情報システムに関連する実習を行うことにより、関連する理論や技術を実際の情報システムの分析やデザインに適用することを通して習得する。情報システムの分析や設計に関する方法論や技術を、実際に情報システムの分析や設計に応用できるようになる。",
    },
    {
        name: "情報シ",
        faculty: "情報学研究科社会情報学専攻",
        teacher: "吉川 正俊",
        description:
            "履修者は、情報システムに関連する実習を行うことにより、関連する理論や技術を実際の情報システムの分析やデザインに適用することを通して習得する。情報システムの分析や設計に関する方法論や技術を、実際に情報システムの分析や設計に応用できるようになる。",
    },
];

const alreadyRemoved = [];
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced() {
    const [characters, setCharacters] = useState(db);
    const [lastDirection, setLastDirection] = useState();

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    );

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        setLastDirection(direction);
        alreadyRemoved.push(nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
        charactersState = charactersState.filter(
            (character) => character.name !== name
        );
        setCharacters(charactersState);
    };

    const swipe = (dir) => {
        const cardsLeft = characters.filter(
            (person) => !alreadyRemoved.includes(person.name)
        );
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
            const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir); // Swipe the card!
        }
    };

    return (
        <div>
            <link
                href="https://fonts.googleapis.com/css?family=Damion&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
                rel="stylesheet"
            />
            <h1>React Tinder Card</h1>
            <div className="cardContainer">
                {characters.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className="swipe"
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}
                    >
                        <div
                            style={{ backgroundColor: "white" }}
                            className="card"
                        >
                            <h2>{character.name}</h2>
                            <h3>{character.faculty}</h3>
                            <h3>{character.teacher}</h3>
                            <h4>{character.description}</h4>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="buttons">
                <button onClick={() => swipe("left")}>Swipe left!</button>
                <button onClick={() => swipe("right")}>Swipe right!</button>
            </div>
            {lastDirection ? (
                <h2 key={lastDirection} className="infoText">
                    You swiped {lastDirection}
                </h2>
            ) : (
                <h2 className="infoText">
                    Swipe a card or press a button to get started!
                </h2>
            )}
        </div>
    );
}

export default Advanced;
