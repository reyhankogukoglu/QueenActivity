function iterative_solution(){
    startTimer(); // saves the start time of the program
    let first_solution_found:boolean = false;
    let valid_solutions:number[][][]=[];
    const board_size = checkHTMLBoardSize()!;

    // initialize the board with a main diagonal of queens
    let board:number[][] = [];
    for(let k=0; k < board_size; k++){
        let boardRow:number[] = [];
        for(let l=0; l < board_size; l++){
            boardRow.push(0);
        }
        boardRow[k] = 1;
        board.push(boardRow);
    }
    // updateBoardHTML(board); // seems to get missed even with a delay

    // setup - calculates permutations of set of N size
    const permutations = (ourPermutationsList: any[]) : any => {
        if (ourPermutationsList.length <= 2) return ourPermutationsList.length === 2 ? [ourPermutationsList, [ourPermutationsList[1], ourPermutationsList[0]]] : ourPermutationsList;
        return ourPermutationsList.reduce(
            (acc: string | any[], item: any, i: number) =>
                acc.concat(
                    permutations([...ourPermutationsList.slice(0, i), ...ourPermutationsList.slice(i + 1)]).map((val: any) => [
                        item,
                        ...val,
                    ])
                ),
            []
        );
    };
    // saves permutations representative of columns forming main diagonal (containing queens)
    var rowPermutationList:number[][] = permutations(Array.from(Array(board_size).keys()));

    // setup cont. - performing permutedBoard on diagonal sub arrays
    var allPossibleBoards:number[][][] = [];
    var permutedBoard:number[][];
    rowPermutationList.forEach(permutation =>{
        // loop through all permutations

        // create a new empty board
        permutedBoard = [];
        for(let k=0; k < board_size; k++){
            let permutedBoardRow:number[] = [];
            for(let l=0; l < board_size; l++){
                permutedBoardRow.push(0);
            }
            permutedBoard.push(permutedBoardRow);
        }

        // change column positions of diagonal entries
        // based off element values the permutation
        let permutationCounter:number = 0;
        permutation.forEach(element =>{
            permutedBoard[permutationCounter] = board[element];
            permutationCounter += 1;
        });
        allPossibleBoards.push(permutedBoard);
    });

    // action: check all possible boards for validity
    allPossibleBoards.forEach(permutedBoard =>{
        board = permutedBoard;
        let size_before:number = valid_solutions.length;
        valid_solutions = checkBoardDiags(board, valid_solutions);

        // if this is the first solution, save the time and calculate difference
        if(valid_solutions.length != size_before && !first_solution_found){
            first_solution_found = true;
            stopTimerFirst();
        }
    });

    updateBoardHTML(board); // updates the HTML chess board on the screen
    let runtime:number = stopTimer(); // saves the total times and returns value
    unlockTimerButton("Iterative"); // unlocks the timer and sets label
    // unlockSolutions(); // unlocks the solutions menu
    console.log(valid_solutions.length + " solutions found iteratively for " + board_size + "-Queens in " + runtime + " milliseconds!");
}
