class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class linkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }
        return lastNode;
    }

    getSize() {
        return this.size;
    }

    printList() {
        let curr = this.head;
        if (curr) {
            while (curr.next) {
                console.log(curr.element);
                curr = curr.next;
            }
            console.log(curr.element);
        } else {
            console.log("empty");
        }
    }

    add(element) {
        let node = new Node(element);
        let lastNode = this.getLast();
        if (lastNode == null) {
            this.head = node
        } else {
            lastNode.next = node;
        }
        this.size++;
    }

    addOnIndex (element, i) {
        if (i > 0 && i > this.size) {
            console.log("greater than size");
            return false;
        } else {
            let node = new Node(element);
            let curr = this.head;
            let prev;

            let indexList = 0;

            if (i == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                while (indexList < i) {
                    indexList++;
                    prev = curr;
                    curr = prev.next;
                }
    
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }

    reverse() {
        let curr = this.head;
        let prev = null;
        while (curr.next) {
            console.log("---------------------");
            let save = curr.next;
            console.log("save ", save);
            curr.next = prev;
            console.log("curr.next ", curr.next);
            prev = curr;
            console.log("prev ", prev);
            curr = save;
            console.log("curr ", curr);
            console.log("---------------------");
        }
        this.head = curr;
        curr.next = prev;
    }

    removeElement(element) {
        let curr = this.head;
        let prev = null;
        while(curr) {
            if (curr.element == element) {
                if (prev == null) {
                    this.head = curr.next;
                } else {
                    prev.next = curr.next;
                }
                this.size--;
            }
            prev = curr;
            curr = curr.next;
        }
    }

    removeFromIndex(i) {
        if (i > 0 && i > this.size) {
            console.log("greater than size");
        } else {
            let curr = this.head;
            let prev = null;
            if (i == 0) {
                this.head = curr.next;
            } else {
                let index = 0;

                while(index < i) {
                    index++
                    prev = curr;
                    curr = curr.next;
                }

                prev.next = curr.next;
            }
        }
    }
}

let abc = new linkedList();

abc.add(10);
abc.add(5);
abc.add(4);
abc.add(3);
// abc.addOnIndex(3, 1);
// abc.addOnIndex(1, 0);
// abc.reverse();
abc.removeFromIndex(3);
// abc.printList();