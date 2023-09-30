#include <iostream>
using namespace std;

// Define the structure for a singly linked list node
struct node {
    int data;
    struct node *link;
}*head=NULL,*tail=NULL,*temp;

// Function to insert a new element at the end of the linked list
void insert(int item) {
    node *newnode=new node();  // Create a new node
    newnode->data=item;        // Assign the value
    newnode->link=NULL;        // Initialize the link as NULL

    if(head==NULL) {
        // If the list is empty, make the new node the head and tail
        head=newnode;
        tail=newnode;
    } else {
        // Otherwise, add the new node to the tail and update tail
        tail->link=newnode;
        tail=tail->link;
    }
}

// Function to delete a specific element from the linked list
void delet(int val) {
    if(head==NULL) {
        cout<<"\nList is Empty\n";
        return;
    }

    if(head->data==val) {
        // If the element to be deleted is the head, update head and free memory
        temp=head;
        head=head->link;
        delete temp;  // Use delete instead of free for C++
        cout<<"\nElement Deleted\n";
        return;
    }

    node *search = new node();
    search=head;
    while(search->link != NULL && search->link->data != val) {
        search=search->link;
    }

    if(search->link == NULL) {
        cout<<"\nElement Not Found\n";
        return;
    }

    // If the element is found in between, adjust links and free memory
    node *temp=search->link;
    search->link=temp->link;
    delete temp;  // Use delete instead of free for C++
    cout<<"\nElement Deleted\n";
}

// Function to display the elements of the linked list
void disp() {
    if(head==NULL){
        cout<<"\nList is Empty\n";
    }
    node *check=new node();
    check=head;
    cout<<"\nElements are: ";

    while(check) {
        cout<<check->data<<" ";
        check=check->link;
    }
}

int main() {
    string a;
    while(true) {
        cout<<"\n1: Insert\n2: Delete\n3: Display\n4: Exit\nEnter your choice: ";
        cin>>a;
        if(a=="1") {
            int b;
            cout<<"\nEnter the Element: ";
            cin>>b;
            insert(b);
        } else if(a=="2") {
            int c;
            cout<<"\nEnter the Element: ";
            cin>>c;
            delet(c);
        } else if(a=="3") {
            disp();
        } else if(a=="4") {
            cout<<"\nThanks for using the Program\n";
            break;
        } else {
            cout<<"\nWrong Choice Try\n";
        }
    }
    return 0;
}
