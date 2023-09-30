#include <iostream>
using namespace std;

// Structure to represent a node in the doubly linked list
struct node {
	int data;
	struct node *left, *right;
} *head = NULL, *tail = NULL, *temp = NULL, *search = NULL;  // Pointers for list operations

// Function to insert a new element at the end of the list
void insert(int val) {
	node *newnode = new node();  // Allocate memory for a new node
	newnode->data = val;
	newnode->left = NULL;
	newnode->right = NULL;

	if (head == NULL) {  // If the list is empty, newnode becomes the head and tail
		head = newnode;
		tail = newnode;
		return;
	}

	tail->right = newnode;  // Add newnode to the end of the list
	newnode->left = tail;
	tail = newnode;
}

// Function to delete an element from the list
void delet(int val) {
	if (head == NULL) {
		cout << "\nList is Empty\n";
		return;
	}

	if (head->data == val) {  // If the element to delete is at the head
		temp = head;
		head = head->right;
		if (head != NULL) {
			head->left = NULL;
		}
		delete temp;  // Deallocate memory
		cout << "\nElement Deleted\n";
		return;
	}

	search = head;
	while (search->right != NULL && search->right->data != val) {  // Find the element to delete
		search = search->right;
	}

	if (search->right == NULL) {
		cout << "\nElement Not Found\n";
		return;
	}

	temp = search->right;
	search->right = temp->right;
	if (temp->right != NULL) {
		temp->right->left = search;
	}
	delete temp;  // Deallocate memory
	cout << "\nElement Deleted\n";
}

// Function to display the elements in the list
void disp() {
	if (head == NULL) {
		cout << "\nList is Empty\n";
		return;
	}
	search = head;
	cout << "\nElements are: ";
	while (search) {
		cout << search->data << " ";
		search = search->right;
	}
}

int main() {
	string a;
	while (true) {
		cout << "\n1: Insert\n2: Delete\n3: Display\n4: Exit\nEnter your Choice: ";
		cin >> a;
		if (a == "1") {
			int b;
			cout << "\nEnter the Element: ";
			cin >> b;
			insert(b);
		} else if (a == "2") {
			int c;
			cout << "\nEnter the Element: ";
			cin >> c;
			delet(c);
		} else if (a == "3") {
			disp();
		} else if (a == "4") {
			cout << "\nThanks for using the Program\n";
			break;
		} else {
			cout << "\nWrong Choice Try\n";
		}
	}
	return 0;
}
