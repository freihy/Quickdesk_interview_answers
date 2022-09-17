interface IQueuable {
    //adds value to queue and returns new queue
    enqueue(value: string): string[];

    //removes item from queue, and returns the item removed
    dequeue(): string;

    //returns a list of all the items in the queue
    getQueue(): string[];

    //returns the number of items in the queue
    size():number;
}

class Queue implements IQueuable{
    q: string[] = [];

    enqueue(value: string): string[] {
        this.q.push(value);
        return this.q;
    }
    dequeue(): string {
        return this.q.splice(0,1)[0];
    }
    getQueue(): string[] {
        return this.q;
    }
    size(): number {
        return this.q.length;
    }
}

class Stack implements IQueuable{
    q: string[] = [];

    enqueue(value: string): string[] {
        this.q.push(value);
        return this.q;
    }
    dequeue(): string {
        return this.q.splice(this.q.length-1,1)[0];
    }
    getQueue(): string[] {
        return this.q;
    }
    size(): number {
        return this.q.length;
    }
}