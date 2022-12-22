# CashRegister
Last freeCodeCamp challenge for the JS data structures and algorithms certification

Loops through the 'cid' object in reverse and at each iteration, it checks if the bill can be returned as change. If so, it runs a while loop until there are not more bills left. Here it makes use of the quick access of Maps by getting the dollar name ("FIVE") for example, to check if the returned change would not exceed the required amount. It saves the amount being taken, and substracts from the 'cid' and the current change. The data is stored as an array which is then added to the array used for the output. While the for loop runs, it also calculates the sum of cash in the cid and creates a copy of the original cid since a shallow copy would reference to the cid being modified. The worst case time complexity for this solution is O(n^2) and the space comlpexity is O(n), using a few different data structures. 
