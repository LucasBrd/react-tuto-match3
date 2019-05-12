import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import { computeTicTacToeBoardWinner } from "./Helpers/ComputeWinner";

function Square(props) {
  return(
    <button
      onClick={props.onClick}
      className={`square ${props.greenCase ? "green-text" : ""}`}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let greenCase = this.props.isWinningCase(i) ? "green" : "";

    return <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.handleClick(i)}
      greenCase={greenCase}
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
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      winner: null,
      winningLine: null,
      currentIndex: 0
    };
  }

  handleClick(i) {
    if(this.state.winner) return;
    
    const squaresShallowCopy = this.state.history[this.state.history.length - 1].squares.slice()

    if(!squaresShallowCopy[i]) {
      squaresShallowCopy[i] = this.state.xIsNext ? "X" : "O";
    } else {
      return;
    }

    let winningInformations = computeTicTacToeBoardWinner(squaresShallowCopy);

    this.setState({ 
      history: [...this.state.history, { squares: squaresShallowCopy }],
      winner: winningInformations.winner,
      xIsNext: !this.state.xIsNext,
      winningLine: winningInformations.winningLine
    }); 
  }

  isWinningCase(i) {
    if(this.state.winningLine) {
      if(this.state.winningLine.indexOf(i) > -1) {
        return true;
      }
    }

    return false;
  }

  jumpToHistoryIndex(index) {
    let winningInformations = computeTicTacToeBoardWinner(this.state.history[index].squares);

    this.setState({
      currentIndex: index,
      xIsNext: (index % 2) === 0,
      history: this.state.history.slice(0, index + 1),
      winner: winningInformations.winner,
      winningLine: winningInformations.winningLine
    });

    console.log(this.state);

    this.render();
  }

  render() {
    let currentSquares = this.state.history[this.state.history.length - 1].squares.slice()

    let status = "";

    let xIsNext = this.state.xIsNext;
    let winner = this.state.winner;

    if(winner) {
      status = `And the winner is : ${ winner }`;
    } else {
      status = `Next player: ${ xIsNext ? "X" : "O" }`;
    }

    // Time travel history
    let gameHistoryListToDisplay = this.state.history.map((historyElement, index) => {
      const listElementDecription = index ? `Go to move ${index}` : `Go to start`;

      return (
        <li key={index}>
          <button onClick={() => { this.jumpToHistoryIndex(index); }} >{listElementDecription}</button>
        </li>
      );
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            handleClick={(i) => { this.handleClick(i); }}
            isWinningCase={(i) => { return this.isWinningCase(i); }}
            squares={currentSquares}
            xIsNext={xIsNext}
            winner={winner}
            status={status}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{gameHistoryListToDisplay}</ol>
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
