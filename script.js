const booze = (name, alcohol_perc, type) => {
    const partyPool = () => alert('its ' + type + ' crazy ' + name);
    const getPerc = () => alert(alcohol_perc + ' % alcohol');

    return {partyPool, getPerc};
};

const drink1 = booze('BUDWEISER MAGNUM','8','BEER');
const drink2 = booze('ABSOLUT VODKA', '45', 'VODKA');
const drink3 = booze('BLUE LABEL', '45', 'WHISKEY');
drink2.alcohol_perc = 100;

drink3.getPerc();
drink1.partyPool();
drink2.partyPool();



// THE TEMPLATE
const createItem = (name, type) => {
    // 1. Private Variables (The Closure) - Outside world can't touch these
    let health = 100;

    // 2. The Functions (The Tools)
    const getHit = () => {
        health -= 10;
        console.log(`${name} health is now ${health}`);
    };

    const getStatus = () => console.log(name, type);

    // 3. The Return (The Public Interface)
    // Only return what you want the world to use!
    return { getHit, getStatus };
};

// USAGE
const enemy1 = createItem('Goblin', 'Minion');
enemy1.getHit(); // Works! -> "Goblin health is now 90"
// enemy1.health = 0; // FAILS. Cannot access private variable.


// THE TEMPLATE
const GameController = (() => {
    // 1. Private State
    let turnCount = 0;
    const board = ["", "", ""];

    // 2. Private Helper Function (Internal use only)
    const _checkWin = () => console.log("Checking win conditions...");

    // 3. Public Functions
    const playTurn = () => {
        turnCount++;
        _checkWin(); // We can use private stuff internally
        console.log(`Turn ${turnCount} played.`);
    };

    // 4. Return Object
    return { playTurn };
})(); // <--- THE PARENTHESES () RUN IT INSTANTLY

// USAGE
GameController.playTurn(); // Works!
// GameController._checkWin(); // ERROR. It's private.
// const newGame = GameController(); // ERROR. It's not a factory.
