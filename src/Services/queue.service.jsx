export class Node {
  constructor(current, previous, next) {
    this.current = current;
    this.previous = previous;
    this.next = next;
  }
}

export class MusicQueue {
  constructor(current = null) {
    this.current = current;
  }

  append(music) {
    const new_node = new Node(music);
    if (!this.current) {
      this.current = new_node;
    } else {
      var current_point = this.current;
      while (current_point.next) {
        current_point = current_point.next;
      }
      new_node.previous = current_point;
      current_point.next = new_node;
    }
  }

  find(music) {
    if (!this.current) return;

    var current_node = this.current;
    while (current_node) {
      if (current_node.current.title == music.title) {
        return current_node;
      }
      current_node = current_node.next;
    }

    return null;
  }
}
