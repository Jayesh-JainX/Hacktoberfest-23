#include <iostream>
using namespace std;

int top = -1;

// Function to add an element to the top of the stack
void add(int arr[], int arr_size, int a) {
    if (top == arr_size - 1) {
        cout << "\nStack Overflow\n";
    } else {
        arr[++top] = a;
        cout << "\nElement Added\n";
    }
}

// Function to delete an element from the top of the stack
void delet(int arr[], int arr_size) {
    if (top == -1) {
        cout << "\nStack Underflow\n";
    } else {
        cout << "\nElement Deleted: " << arr[top--] << endl;
    }
}

// Function to display all elements in the stack
void disp(int arr[], int arr_size) {
    int tmp = 0;
    if (top == -1) {
        cout << "\nStack Underflow\n";
    } else {
        cout << "\nElements are: ";
        do {
            cout << arr[tmp++] << " ";
        } while (tmp <= top);
    }
}

int main() {
    string a;
    int size;
    cout << "\nEnter The Size: ";
    cin >> size;

    int arr[size]; // Stack array to hold elements

    while (true) {
        cout << "\n1: Add Element\n2: Delete Element\n3: Display Elements\n4: Exit\nEnter Your Choice: ";
        cin >> a;

        if (a == "1") {
            int b;
            cout << "\nEnter the Number: ";
            cin >> b;
            add(arr, size, b); // Call add function to insert an element
        } else if (a == "2") {
            delet(arr, size); // Call delete function to remove an element
        } else if (a == "3") {
            disp(arr, size); // Call display function to show elements
        } else if (a == "4") {
            cout << "\nThanks for Using the Program\n";
            break; // Exit the program
        } else {
            cout << "\nWrong Choice Try Again\n"; // Invalid menu option
        }
    }

    return 0;
}
