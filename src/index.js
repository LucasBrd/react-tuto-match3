import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import { computeTicTacToeBoardWinner } from "./Helpers/ComputeWinner";

function Square(props) {
  return(
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: false,
      winner: null
    }
  }

  handleClick(i) {
    const squaresShallowCopy = this.state.squares.slice(); 

    squaresShallowCopy[i] = this.state.xIsNext ? "X" : "O";

    let winner = computeTicTacToeBoardWinner(squaresShallowCopy);

    this.setState({ 
      squares: squaresShallowCopy,
      xIsNext: !this.state.xIsNext,
      winner: winner
    }); 
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = "";

    if(this.state.winner) {
      status = `And the winner is : ${ this.state.winner }`;
    } else {
     `Next player: ${ this.state.xIsNext ? "X" : "O" }`;
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
