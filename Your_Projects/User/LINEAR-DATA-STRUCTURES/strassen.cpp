#include <bits/stdc++.h>
#include <vector>

using namespace std;

vector<vector<int>> matrixAddition(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int n = A.size();
    vector<vector<int>> C(n, vector<int>(n));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }

    return C;
}

vector<vector<int>> matrixSubtraction(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int n = A.size();
    vector<vector<int>> C(n, vector<int>(n));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            C[i][j] = A[i][j] - B[i][j];
        }
    }

    return C;
}

vector<vector<int>> strassenMultiply(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int n = A.size();

    if (n == 1) {
        vector<vector<int>> C(1, vector<int>(1));
        C[0][0] = A[0][0] * B[0][0];
        return C;
    }

    int mid = n / 2;
    vector<vector<int>> A11(mid, vector<int>(mid));
    vector<vector<int>> A12(mid, vector<int>(mid));
    vector<vector<int>> A21(mid, vector<int>(mid));
    vector<vector<int>> A22(mid, vector<int>(mid));
    vector<vector<int>> B11(mid, vector<int>(mid));
    vector<vector<int>> B12(mid, vector<int>(mid));
    vector<vector<int>> B21(mid, vector<int>(mid));
    vector<vector<int>> B22(mid, vector<int>(mid));

    for (int i = 0; i < mid; i++) {
        for (int j = 0; j < mid; j++) {
            A11[i][j] = A[i][j];
            A12[i][j] = A[i][j + mid];
            A21[i][j] = A[i + mid][j];
            A22[i][j] = A[i + mid][j + mid];

            B11[i][j] = B[i][j];
            B12[i][j] = B[i][j + mid];
            B21[i][j] = B[i + mid][j];
            B22[i][j] = B[i + mid][j + mid];
        }
    }


    vector<vector<int>> P1 = strassenMultiply(A11, matrixSubtraction(B12, B22));
    vector<vector<int>> P2 = strassenMultiply(matrixAddition(A11, A12), B22);
    vector<vector<int>> P3 = strassenMultiply(matrixAddition(A21, A22), B11);
    vector<vector<int>> P4 = strassenMultiply(A22, matrixSubtraction(B21, B11));
    vector<vector<int>> P5 = strassenMultiply(matrixAddition(A11, A22), matrixAddition(B11, B22));
    vector<vector<int>> P6 = strassenMultiply(matrixSubtraction(A12, A22), matrixAddition(B21, B22));
    vector<vector<int>> P7 = strassenMultiply(matrixSubtraction(A11, A21), matrixAddition(B11, B12));


    vector<vector<int>> C11 = matrixAddition(matrixSubtraction(matrixAddition(P5, P4), P2), P6);
    vector<vector<int>> C12 = matrixAddition(P1, P2);
    vector<vector<int>> C21 = matrixAddition(P3, P4);
    vector<vector<int>> C22 = matrixSubtraction(matrixSubtraction(matrixAddition(P5, P1), P3), P7);

    vector<vector<int>> C(n, vector<int>(n));

    for (int i = 0; i < mid; i++) {
        for (int j = 0; j < mid; j++) {
            C[i][j] = C11[i][j];
            C[i][j + mid] = C12[i][j];
            C[i + mid][j] = C21[i][j];
            C[i + mid][j + mid] = C22[i][j];
        }
    }

    return C;
}

int main() {
    vector<vector<int>> A = {{1, 2}, {3, 4}};
    vector<vector<int>> B = {{5, 6}, {7, 8}};

    vector<vector<int>> C = strassenMultiply(A, B);

    cout << "Resultant Matrix:" << endl;
    for (int i = 0; i < C.size(); i++) {
        for (int j = 0; j < C[i].size(); j++) {
            cout << C[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
