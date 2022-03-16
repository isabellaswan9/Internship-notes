// // function lastUniqueChar(str) {
// if (!str) return "";
// const uniqueArr = [];
// const strLen = str.length;
// for (let i = 0; i < strLen; i++) {
//   if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
//     uniqueArr.push(str[i]);
//   }
// }
// if (uniqueArr.length === 0) return "";
// else return uniqueArr[uniqueArr.length - 1];
// // }
// function lastUniqueChar(str) {
//   let obj = {};
//   for (let i = 0; i < str.length; i++) {
//     !obj[str[i]] ? (obj[str[i]] = 1) : obj[str[i]]++;
//   }
//   let result = "";
//   for (let k in obj) {
//     if (obj[k] == 1) {
//       result = k;
//     }
//   }
//   return result;
// }
// console.log(lastUniqueChar("abababa"));
// function lastUniqueChar(str) {
//   if (!str) return "";
//   const uniqueArr = [];
//   const strLen = str.length;
//   for (let i = strLen - 1; i > 0; i--) {
//     if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
//       uniqueArr.push(str[i]);
//       return str[i];
//     }
//   }
//   return "";
// }
// function findUniqueCommon(arr1, arr2) {
//   // write code here
//   let arr = [];
//   for (let i of arr1) {
//     if (!arr.includes(i) && arr2.includes(i)) {
//       arr.push(i);
//     }
//   }
//   return arr.sort();
// }
/* 恭喜！您提交的程序通过了所有的测试用例}
您的代码已保存
运行时间: 813ms
内存占用: 31.9MB */
//   return arr1.reduce((pre, cur) => {
//     console.log("pre", pre);
//     if (!pre) {
//       console.log(pre);
//     }
//     return pre;
//     //if (!pre) return pre.push(cur);
//     // if (pre.includes(cur)) return pre;
//     // if (arr2.includes(cur)) return pre.push(cur);
//   }, []);

// function getMinTime(start, end, vectorList) {
//   // write code here
//   let obj = {};
//   for (let item of vectorList) {
//     if (item[0] in obj) {
//       obj[item[0]].push([item[1], item[2]]);
//     } else {
//       obj[item[0]] = [[item[1], item[2]]];
//     }
//   }
//     console.log(obj);
//     let next = start;
//     let total = 0;
//     let arr = obj[next];

//     for (let i of arr) {

//     }
//     while (next === end) {
//         total = total + obj[next][1];
//         arr = obj[next];

//     }

// }
// function test(next,end,arr) {

// }
// getMinTime(1, 5, [
//   [1, 2, 5],
//   [1, 3, 4],
//   [4, 3, 2],
//   [3, 5, 3],
// ]);
function getMinTime(start, end, vectorList) {
  // write code here
  let obj = {};
  for (let item of vectorList) {
    if (item[1] in obj) {
      obj[item[1]].push([item[0], item[2]]);
    } else {
      obj[item[1]] = [[item[0], item[2]]];
    }
  }
  if (!(end in obj)) return -1;
  const endArr = obj[end];
  let total = [];

  for (let i of endArr) {
    total.push([[i[0]], i[1]]);
  }
  for (let el of total) {
    el[0].push(find(obj[el[0]], obj));
  }

  //   let next = start;
  //   let total = 0;
  //   let arr = obj[next];

  //   for (let i of arr) {
  //   }
  //   while (next === end) {
  //     total = total + obj[next][1];
  //     arr = obj[next];
  //   }
}
function find(el, obj) {
  if (!(el in obj)) return -1;
  const endArr = obj[el];
  let total = [];

  for (let i of endArr) {
    return find([[i[0]], i[1]]);
  }
}
/* 有一数据结构vector:[a,b,n]表示从a地点到b地点需要n分钟(单向)。现提供一组这样的节点表示一个地区的各个地点间的交通线路，请实现一个函数 function getMinTime(x, y, vectorList)，输入x,y2个地点，返回从x到y地的最小时间。如没有线路可到达，返回-1。如x,y为同一地址，返回0 */
function test(next, end, arr) {}
getMinTime(1, 5, [
  [1, 2, 5],
  [1, 3, 4],
  [4, 3, 2],
  [3, 5, 3],
]);
