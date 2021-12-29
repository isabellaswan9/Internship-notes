
console.log('hi')
const heapSort = (initArr) => {
    //把完全二叉树转化为大根堆
    //initArr = heapify(initArr);
    heapify(initArr);
    //使用parseInt去除小数点
    for (let i = parseInt(initArr.length - 1); i >0;){
        //initArr = swap(initArr, 0, i);
        swap(initArr, 0, i);
        i--;
        //initArr = shiftDown(initArr, 0, i);
        shiftDown(initArr, 0, i);
    }
    return initArr
}

const heapify = (initArr) => {
    //从最后一个有子节点的节点开始 元素下沉
    for (let i = parseInt(initArr.length / 2 - 1); i >= 0; i--){
        //initArr = shiftDown(initArr,i,initArr.length-1);
        shiftDown(initArr, i, initArr.length - 1);
    }
    //return initArr
}

const shiftDown = (initArr, i, end) => {
    // i 根结点下标
    
    while (2 * i + 1 <= end) {
        let j = 2 * i + 1;
        //要判断右子节点
        if (j+1<=end&&initArr[j] < initArr[j+1]) {
            j++;
        }
        // j 左右子节点中较大的下标
        if (initArr[i] < initArr[j]) {
            //下沉
            swap(initArr, i, j)
            //initArr = swap(initArr,i,j)
        } else {
            break;
        }
        i = j;
    }
    //return initArr
}

const swap = (initArr,i,j) => {
    const temp = initArr[i];
    initArr[i] = initArr[j];
    initArr[j] = temp;
    //return initArr
}

const arr = [-2, 3, -5];
const result = heapSort(arr);
console.log(result)