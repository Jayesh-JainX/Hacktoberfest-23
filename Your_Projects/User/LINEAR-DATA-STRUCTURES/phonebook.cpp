#include <iostream>
#include <string>
#include <vector>
#include <map>

using namespace std;

// Contact class to represent a single contact
class Contact
{
public:
    Contact(const string &name, const string &phoneNumber)
        : name(name), phoneNumber(phoneNumber) {}

    string getName() const { return name; }
    string getPhoneNumber() const { return phoneNumber; }

private:
    string name;
    string phoneNumber;
};

// Phonebook class to manage contacts
class Phonebook
{
public:
    // Add a new contact
    void addContact(const string &name, const string &phoneNumber)
    {
        contacts[name] = phoneNumber;
    }

    // Delete a contact
    void deleteContact(const string &name)
    {
        contacts.erase(name);
    }

    // Search for a contact
    string searchContact(const string &name) const
    {
        if (contacts.count(name) > 0)
        {
            return contacts.at(name);
        }
        else
        {
            return "Contact not found.";
        }
    }

    // Display all contacts
    void displayContacts() const
    {
        cout << "Phonebook Contacts:" << endl;
        for (const auto &entry : contacts)
        {
            cout << entry.first << ": " << entry.second << endl;
        }
    }

private:
    map<string, string> contacts;
};

int main()
{
    Phonebook phonebook;

    while (true)
    {
        cout << "Phonebook Menu:" << endl;
        cout << "1. Add Contact" << endl;
        cout << "2. Delete Contact" << endl;
        cout << "3. Search Contact" << endl;
        cout << "4. Display Contacts" << endl;
        cout << "5. Quit" << endl;
        int choice;
        cin >> choice;

        switch (choice)
        {
        case 1:
        {
            string name, phoneNumber;
            cout << "Enter name: ";
            cin >> name;
            cout << "Enter phone number: ";
            cin >> phoneNumber;
            phonebook.addContact(name, phoneNumber);
            break;
        }
        case 2:
        {
            string name;
            cout << "Enter name to delete: ";
            cin >> name;
            phonebook.deleteContact(name);
            break;
        }
        case 3:
        {
            string name;
            cout << "Enter name to search: ";
            cin >> name;
            string phoneNumber = phonebook.searchContact(name);
            cout << "Phone number: " << phoneNumber << endl;
            break;
        }
        case 4:
        {
            phonebook.displayContacts();
            break;
        }
        case 5:
        {
            cout << "Exiting Phonebook." << endl;
            return 0;
        }
        default:
        {
            cout << "Invalid choice. Try again." << endl;
        }
        }
    }

    return 0;
}
