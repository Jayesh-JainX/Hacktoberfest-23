// Context.js
import React from 'react';

const defaultContextValue = {
  hoveredSquare: { x: null, y: null },
  highlightedSquare: { x: null, y: null },
  selectedPiece: { x: null, y: null },
  isDragging: false,
  legalMoves: [],

  setHoveredSquare: () => {},
  setHighlightedSquare: () => {},
  setSelectedPiece: () => {},
  setDraggingPiece: () => {},
  setLegalMoves: () => {}
};

const ChessContext = React.createContext(defaultContextValue);

class ChessContextProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      ...defaultContextValue,
      setHoveredSquare: this.setHoveredSquare.bind(this),
      setHighlightedSquare: this.setHighlightedSquare.bind(this),
      setSelectedPiece: this.setSelectedPiece.bind(this),
      setDraggingPiece: this.setDraggingPiece.bind(this),
      setLegalMoves: this.setLegalMoves.bind(this)
    };
  }

  setHoveredSquare(x = null, y = null) {
    const { hoveredSquare } = this.state;
    if (hoveredSquare.x !== x || hoveredSquare.y !== y) {
      this.setState({
        hoveredSquare: { x, y }
      });
    }
  }

  setHighlightedSquare(x = null, y = null) {
    const { highlightedSquare } = this.state;
    if (highlightedSquare.x !== x || highlightedSquare.y !== y) {
      this.setState({
        highlightedSquare: { x, y }
      });
    }
  }

  setSelectedPiece(chessPiece = null) {
    const { selectedPiece } = this.state;
    if (chessPiece !== selectedPiece) {
      this.setState({
        selectedPiece: chessPiece
      });
    }
  }

  setDraggingPiece(chessPiece = { x: null, y: null }) {
    const isDragging = chessPiece.x !== null && chessPiece !== null;

    this.setState({
      isDragging,
      selectedPiece: chessPiece
    });

    // Highlight the dragging piece square
    if (isDragging) {
      const { x, y } = chessPiece;
      this.setHighlightedSquare(x, y);
    } else {
      this.setHighlightedSquare(null, null);
    }
  }

  setLegalMoves(squares = []) {
    this.setState({
      legalMoves: squares
    });
  }

  render() {
    return (
      <ChessContext.Provider value={this.state}>
        {this.props.children}
      </ChessContext.Provider>
    );
  }
}

export { ChessContext as default, ChessContextProvider };
