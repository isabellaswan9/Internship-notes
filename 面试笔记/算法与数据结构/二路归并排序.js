var sortArray = function (nums) {
  let temp = [];
  sort(nums, 0, nums.length - 1, temp);
  return nums;
};
const sort = (initArr, left, right, temp) => {
  if (left < right) {
    let mid = left + parseInt((right - left) / 2);
    sort(initArr, left, mid, temp);
    sort(initArr, mid + 1, right, temp);
    for (let a = left; a <= right; a++) {
      temp[a] = initArr[a];
    }

    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
      if (i == mid + 1) {
        // 如果左边的数组空了,将右边的数组放到 剩下的
        initArr[k] = temp[j];
        j++;
      } else if (j == right + 1) {
        // 如果右边的数组空了,将
        initArr[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        //相同元素原来靠前的依然靠前
        initArr[k] = temp[i];
        i++;
      } else if (temp[i] > temp[j]) {
        initArr[k] = temp[j];
        j++;
      }
    }
  }
};
