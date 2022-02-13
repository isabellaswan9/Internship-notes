//双指针解法
//时间复杂度:m+n
//空间复杂度:1
const getIntersectionNode = (headA, headB) => {
  let pA = headA;
  let pB = headB;
  if (headA === null || headB === null) {
    return null;
  }
  //如果链A与链B交点前等长,则会一起走到交点,跳出循环
  //如果交点前不等长,则pA走完链A后会走链B,pB走完链B后会走链A,然后相遇
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
};

//哈希集合(不同于双层循环哦)
//时间复杂度:m+n
//空间复杂度:m
var getIntersectionNode = function (headA, headB) {
  const visited = new Set();
  let temp = headA;
  while (temp !== null) {
    visited.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp !== null) {
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};
