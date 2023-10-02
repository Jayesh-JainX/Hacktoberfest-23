package main

import (
    "fmt"
)

type Node struct {
    Value int
    Next *Node
}

func NewLinkedList(value int) *Node {
    return &Node{
        Value: value,
        Next: nil,
    }
}

func (list *Node) Add(value int) {
    newNode := NewLinkedList(value)

    if list.Next == nil {
        list.Next = newNode
    } else {
        currentNode := list
        for currentNode.Next != nil {
            currentNode = currentNode.Next
        }
        currentNode.Next = newNode
    }
}

func (list *Node) Traverse() {
    currentNode := list
    for currentNode != nil {
        fmt.Println(currentNode.Value)
        currentNode = currentNode.Next
    }
}

func main() {
    // Create a new linked list.
    list := NewLinkedList(10)

    // Add some elements to the linked list.
    list.Add(5)
    list.Add(15)
    list.Add(2)
    list.Add(7)
    list.Add(12)

    // Traverse the linked list.
    list.Traverse()
}
