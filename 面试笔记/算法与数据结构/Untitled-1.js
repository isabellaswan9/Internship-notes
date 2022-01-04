//实现堆排序

const heapSort = (initArr) => {
  //构造一个大根堆（根节点比左右子节点大）
  heapify(initArr, 0, initArr.length - 1);
  for (let end = initArr.length - 1; end > 0; ) {
    swap(initArr, 0, end);
    end--;
    shiftDown(initArr, 0, end);
  }
  return initArr;
};

const heapify = (initArr, left, right) => {
  //从left + (right-left)/2
  const mid = parseInt(right / 2) - 1; //最后一个有子节点的根节点
  for (let a = mid; a >= 0; a--) {
    //元素下沉
    shiftDown(initArr, a, initArr.length - 1);
  }
};

const shiftDown = (initArr, root, end) => {
  //const left = root * 2 + 1;
  while (root * 2 + 1 <= end) {
    let j = root;
    if (j + 1 <= end && initArr[j + 1] > initArr[j]) {
      j++;
    }

    if (initArr[j] > initArr[root]) {
      swap(initArr, j, root);
    } else {
      break;
    }

    root = j;
  }
};
const swap = (initArr, i, j) => {
  const temp = initArr[i];
  initArr[i] = initArr[j];
  initArr[j] = temp;
};

const arr = [1, 9, 2, 3, 5, 2, 1, 8, 5, 2, 6, 7, 0];
const result = heapSort(arr);
console.log(result);
