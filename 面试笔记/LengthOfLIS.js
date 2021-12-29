const lengthOfLIS = (nums) => {
  if (nums.length === 1) return 1;

  let end = 0;
  let greedy = [];
  greedy[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (greedy[end] < nums[i]) {
      greedy[end + 1] = nums[i];
      end++;
    } else {
      let left = 0;
      let right = end;
      while ((left = right)) {
        let mid = left + parseInt((right - left) / 2);
        //二分查找
        if (nums[i] < greedy[mid]) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }
      greedy[left] = nums[i];
    }
  }
  return end + 1;
};
