//二叉树的最大深度
const maxDepth = (root) => {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

//非递归解法
//层序遍历
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let res = 0;
  //根节点放入队列
  const queue = [root];
  //队列为空结束循环
  while (queue.length) {
    //当前层的节点数量
    let levNum = queue.length;
    ++res;
    //先判断levNum是否为0，再减一
    while (levNum--) {
      //将该节点的所有子节点放入队列中，去除该节点
      const node = queue.shift(root);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
};
