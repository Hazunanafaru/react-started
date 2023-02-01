import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {
//     // // Setup a constructor that takes props
//     // // and store state to remember the props changes
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }

//     render() {
//         return (
//         <button className="square"
//             onClick={() => { 
//                     console.log("clicked");
//                     this.props.onClick()
//                 }}>
//             {/* Render props `value` */}
//             {this.props.value}
//         </button>
//     );
// }
// }

// Square function component
// Use function component for component that contain render method only
function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             squares: Array(9).fill(null),
//             // Set X as the next who move by default, else O
//             xIsNext: true,
//     }
// }

renderSquare(i) {
    // Render square and pass prop `value`
    // and when clicked, return a function to be handled  by Square
    return <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
    />;   
}

render() {
    return (
    <div>
        <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        </div>
        <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        </div>
        <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        </div>
    </div>
    );
}
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // Chceck if someone win or square is filled up
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move:
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        // Horizontal Winning
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical Winning
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal Winning
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let line = 0; line < lines.length; line++) {
        const [a, b, c] = lines[line];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
