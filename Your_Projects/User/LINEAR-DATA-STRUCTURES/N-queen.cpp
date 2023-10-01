#include <iostream>
#include <vector>

using namespace std;

bool isSafe(vector<vector<int>> &board, int row, int col, int n)
{
    // Check if there is a queen in the same column
    for (int i = 0; i < row; i++)
    {
        if (board[i][col] == 1)
        {
            return false;
        }
    }

    // Check upper-left diagonal
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
    {
        if (board[i][j] == 1)
        {
            return false;
        }
    }

    // Check upper-right diagonal
    for (int i = row, j = col; i >= 0 && j < n; i--, j++)
    {
        if (board[i][j] == 1)
        {
            return false;
        }
    }

    return true;
}

void solveNQueens(vector<vector<int>> &board, int row, int n, vector<vector<vector<int>>> &solutions)
{
    if (row == n)
    {
        solutions.push_back(board);
        return;
    }

    for (int col = 0; col < n; col++)
    {
        if (isSafe(board, row, col, n))
        {
            board[row][col] = 1;
            solveNQueens(board, row + 1, n, solutions);
            board[row][col] = 0;
        }
    }
}

void printBoard(const vector<vector<int>> &board)
{
    for (const vector<int> &row : board)
    {
        for (int cell : row)
        {
            if (cell == 1)
            {
                cout << 'Q';
            }
            else
            {
                cout << '.';
            }
            cout << ' ';
        }
        cout << endl;
    }
    cout << endl;
}

int main()
{
    int n;
    cout << "Enter the size of the chessboard (N): ";
    cin >> n;

    vector<vector<int>> board(n, vector<int>(n, 0));
    vector<vector<vector<int>>> solutions;

    solveNQueens(board, 0, n, solutions);

    if (solutions.empty())
    {
        cout << "No solutions found for N = " << n << endl;
    }
    else
    {
        cout << "Solutions for N = " << n << ":" << endl;
        for (const vector<vector<int>> &solution : solutions)
        {
            printBoard(solution);
        }
    }

    return 0;
}
