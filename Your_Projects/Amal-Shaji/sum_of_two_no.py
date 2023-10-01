

print("Enter The First Number")

num1 = int(input())

print("Enter The Second Number")

num2 = int(input())

def largest(num1, num2):
    if(num1>num2):
        print("First Number Is Greater Than Second Number")

    elif(num1 == num2):
        print("Both The Numbers Are Equal")

    else:
        print("Second Number Is Greater Than First Number")

sum = num1 + num2

print("The Sum Of Two Numbers Is",sum)

print("Do you want to check which is the greatest among two numbers ?")

print("If you want to check press 1 \n If you do not press 2")

check = int(input())

if(check == 1):
    largest(num1,num2)
else:
    pass
