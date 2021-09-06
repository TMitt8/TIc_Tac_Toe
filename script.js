var winCount = 0
var lossCount = 0
var tieCount = 0

var div = document.getElementById("background");

const buttonIds = ["r1c1", "r1c2", "r1c3", "r2c1", "r2c2", "r2c3", "r3c1", "r3c2", "r3c3"];
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

//The user adds an X to the table once it clicks a box
function addX()
{
    var buttId = event.srcElement.id;
    var button = document.getElementById(buttId);
    button.disabled = true;
    var xtac = document.createElement("h1");
    xtac.textContent = "X";
    button.appendChild(xtac);
    xtac.className = "xtic";
    xtac.style.color = "white";
    board[buttonIds.indexOf(buttId)] = 1;
    if(checkWin()){
        setTimeout(() => {alert("You win!"); }, 200);
        //changes background color
        document.getElementById("background").style = ("background-color: green");
        winCount++;
    }
    else if(checkTie())
    {
        setTimeout(() => {alert("You tied!"); }, 200);
        //changes background color
        document.getElementById("background").style = ("background-color: yellow");
        tieCount++;
    }
    else{
        computer();
    }

}

function addO(buttId)
//This is the computers turn to add an O to the table
{
    var button = document.getElementById(buttId);
    button.disabled = true;
    var otac = document.createElement("h1");
    otac.textContent = "O";
    button.appendChild(otac);
    otac.className = "xtic";
    otac.style.color = "red";
    board[buttonIds.indexOf(buttId)] = 2;
    if(checkWin()){
         setTimeout(() => {alert("You Lost :("); }, 200);
         document.getElementById("background").style = ("background-color: red");
         lossCount++;
    }
}

function computer()
{
    var madeMove = false;
    var goodMove = false;
    var move = 0;
    //check if there is a winning move for the computer and play it
    for(var i = 0; i < board.length; i++)
    {
            if(board[i] == 0)
            {
                board[i] = 2;
                if(checkWin())
                {
                    addO(buttonIds[i]);
                    madeMove = true;
                    break;
                }
                else{
                    board[i] = 0;
                }
            }
    }
    //check if there's a winning move for the player and block it
    if(madeMove == false)
    {
        for(var i = 0; i < board.length; i++)
        {
                if(board[i] == 0)
                {
                    board[i] = 1;
                    if(checkWin())
                    {
                        board[i] = 2;
                        addO(buttonIds[i]);
                        madeMove = true;
                        break;
                    }
                    else{
                        board[i] = 0;
                    }
                }
        }
    }
    //checks if middle is open and plays it
    if(madeMove == false && board[4] == 0)
    {
        addO(buttonIds[4]);
        madeMove = true;
    }
    //checks if corners are open and plays it

        for(var i = 0; i < board.length; i+=2)
        {
            if(madeMove == false)
            {
                if(board[i] == 0)
                {
                    addO(buttonIds[i]);
                    madeMove = true;
                }
            }
        }

    if(madeMove == false){
        while(goodMove == false)
        {
            move = Math.floor(Math.random() * 9);
            if(board[move] == 0)
            {
                goodMove = true;
            }
        }
        addO(buttonIds[move]);
    }


    //check moves left
    //loops through them and finds elements with a 1
    //looks at board
    //checks: if I replace a 0 with a 2, do I win? If so, play that move
    //checks: if I replace a 0 with a 1, does the player win, if so, play that move
}

function checkTie()
{
    for(var i = 0; i < board.length; i++)
    {
        if(board[i] == 0)
        {
            return false;
        }
    }
    return true;
}

// sets the score record to zero at the start of the game so that the game begins with a clean slate.
//Here are our combinations for winningCondition

// sets all the possible outcomes in which a player wins.
const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


function checkWin()
{
    for(var i = 0; i < winningCondition.length; i++)
    {   
        if(board[winningCondition[i][0]] == board[winningCondition[i][1]] && board[winningCondition[i][1]] == board[winningCondition[i][2]] && board[winningCondition[i][0]] != 0)
        {
            return true;
        }
    }
    return false;
}


//This allows our table to clean itself and return to its original state once the Restart button is clicked. It also updates the win count.
function clear2()
{
    $('.xtic').remove();
    $("button").prop("disabled", false);
    for(var i = 0; i < board.length; i++)
    {
        board[i] = 0;
    }
    document.getElementById("background").style = ("black");
    document.getElementById("wins").textContent = "Wins: " + winCount;
    document.getElementById("losses").textContent = "Losses: " + lossCount;
    document.getElementById("ties").textContent = "Ties: " + tieCount;


 }