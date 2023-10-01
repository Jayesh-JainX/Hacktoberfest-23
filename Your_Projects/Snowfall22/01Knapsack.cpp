#include <iostream>
using namespace std;

int max(int a, int b) { return (a > b) ? a : b; }

int knapsack(int W, int wt[], int val[], int n) {
    if (n == 0 || W == 0)
        return 0;
    if (wt[n - 1] > W)
        return knapsack(W, wt, val, n - 1);
    else
        return max(
            val[n - 1] + knapsack(W - wt[n - 1], wt, val, n - 1),
            knapsack(W, wt, val, n - 1));
}

int main() {
    int n;
    cout << "Enter the number of items: ";
    cin >> n;

    int values[n];
    int weights[n];

    cout << "Enter the values of the items:" << endl;
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }

    cout << "Enter the weights of the items:" << endl;
    for (int i = 0; i < n; i++) {
        cin >> weights[i];
    }

    int capacity;
    cout << "Enter the knapsack capacity: ";
    cin >> capacity;

    cout << "Maximum profit: " << knapsack(capacity, weights, values, n) << endl;
    return 0;
}
