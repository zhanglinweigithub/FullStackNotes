---
title: 二分查找
---
# 二分查找

二分查找（Binary Search）算法，也叫折半查找算法

使用二分查找的前提，必须是一个有序的数据集合

**查找原理**：每次都通过跟区间的中间元素对比，将待查找的区间缩小为之前的一半，直到找到要查找的元素，或者区间被缩小为 0

> 若要查找的元素比中间元素大，则丢弃左侧元素，对右侧元素重复该步骤，反之亦然。

> 数组：1, 2, 4, 5, 6, 7, 9, 12, 15, 19, 23, 26, 29, 34, 39
>
> 查找：26

![image-20230407135510522](../img/image-20230407135510522.png)

如果中间值大于查找值，则往数组的左边继续查找，如果小于查找值这往右边继续查找

~~~java
/**
     *
     * @param nums  数组
     * @param n     数组长度
     * @param value 要查找的值
     * @return
     */
private static int bserach(int[] nums, int n, int value) {
        int low = 0;
        int high = n - 1;
        while (low <= high) {
            // 找出中间下标 
            int mid = low + ((high - low) >> 1);
            if (nums[mid] > value) {
                high = mid - 1;
            } else if (nums[mid] < value) {
                low = mid + 1;
            } else {
                return mid;
            }
        }

        return -1;
    }
~~~

