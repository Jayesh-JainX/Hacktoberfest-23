#include <iostream>
using namespace std;

int front = -1, rear = -1; // Global variables to track front and rear of the queue

// Enqueue function to add an element to the queue
void enq(int arr[], int arr_size, int b) {
    if (rear == arr_size - 1) {
        cout << "\nQueue Full\n";
    } else {
        if (front == -1) {
            front++; // Set front to 0 when queue is empty
        }
        arr[++rear] = b; // Add element at rear and increment rear
        cout << "\nElement Added\n";
    }
}

// Dequeue function to remove an element from the queue
void deq(int arr[]) {
    if (front == -1 && rear == -1) {
        cout << "\nQueue Empty\n";
    } else {
        if (front == rear) {
            cout << "\nDeleted Element: " << arr[front] << endl;
            front = -1;
            rear = -1; // Reset front and rear when queue becomes empty
        } else {
            cout << "\nDeleted Element: " << arr[front++] << endl;
            // Increment front to simulate removing the front element
        }
    }
}

// Display function to show the elements in the queue
void disp(int arr[]) {
    if (front == -1 && rear == -1) {
        cout << "\nQueue Empty\n";
    } else {
        cout << "\nElements are: ";
        for (int i = front; i <= rear; i++) {
            cout << arr[i] << " "; // Display each element in the queue
        }
    }
}

int main() {
    string a;

    int size, b;
    cout << "\nEnter the Size: ";
    cin >> size;
    int arr[size]; // Create an array to simulate the queue

    while (true) {
        cout << "\n1: Enqueue\n2: Dequeue\n3: Display\n4: Exit\nEnter your Choice: ";
        cin >> a;

        if (a == "1") {
            cout << "\nEnter the Element: ";
            cin >> b;
            enq(arr, size, b); // Call enqueue function
        } else if (a == "2") {
            deq(arr); // Call dequeue function
        } else if (a == "3") {
            disp(arr); // Call display function
        } else if (a == "4") {
            cout << "\nThanks for using the Program\n";
            break; // Exit the loop and program
        } else {
            cout << "\nWrong Choice Try\n";
        }
    }
    return 0;
}
