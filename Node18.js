class Node18 {
  constructor (id) {
    this._id = id
    this._leftNode = null
    this._rightNode = null
    this._depth = 0
  }

  get id() { return this._id }
  getNodes() {    
    let nodes = []
    nodes[0] = this._leftNode
    nodes[1] = this._rightNode
    return nodes
  } 
  get depth() { return this._depth }
  set depth(value) { this._depth = value }
  increaseDepth() { this._depth++ }
  decreaseDepth() { this._depth-- }
  addLeftNode(newNode) { this._leftNode = newNode }
  addRightNode(newNode) { this._rightNode = newNode }

}

module.exports = Node18

