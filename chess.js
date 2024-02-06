document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('chessboard');

    // Create chessboard
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? 'dark' : 'light');
        cell.dataset.index = i;
        board.appendChild(cell);
    }

    const pieces = [
        '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
        '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
        '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
    ];

    // Place pieces on the board
    for (let i = 0; i < pieces.length; i++) {
        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.innerHTML = pieces[i];
        piece.draggable = !!pieces[i];
        piece.dataset.index = i;
        board.children[i].appendChild(piece);
    }

    let draggedPiece;

    // Drag and drop functionality
    board.addEventListener('dragstart', function (event) {
        draggedPiece = event.target;
    });

    board.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    board.addEventListener('drop', function (event) {
        event.preventDefault();
        const targetCell = event.target.closest('.cell');
        if (targetCell && targetCell.contains(draggedPiece)) return;

        if (targetCell && draggedPiece) {
            targetCell.innerHTML = draggedPiece.innerHTML;
            targetCell.firstChild.draggable = true;

            draggedPiece.innerHTML = '';
            draggedPiece.draggable = false;
        }
    });
});
