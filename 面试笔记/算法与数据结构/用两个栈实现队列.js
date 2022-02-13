var CQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack2.length === 0) {
    if (this.stack1.length === 0) {
      return -1;
    }
    //改进:将for循环改为while
    while (this.stack1.length) {
      //先存储tail再push会更快
      const tail = this.stack1.pop();
      this.stack2.push(tail);
    }
  }
  return this.stack2.pop();
};
