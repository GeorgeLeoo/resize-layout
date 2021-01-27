# ResizeLayout

>可拖拽拉宽改变元素宽度布局

# Demo
![](https://upload-images.jianshu.io/upload_images/5205102-bc7c19310b1131c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 使用方法

首先引入ResizeLayout、ResizeCol、ResizeRow

```HTML
<ResizeLayout>
  <ResizeCol width="220px">左侧</ResizeCol>
  <ResizeCol>右侧</ResizeCol>
</ResizeLayout>

<ResizeLayout>
  <ResizeRow height="220px">上</ResizeRow>
  <ResizeRow>下</ResizeCol>
</ResizeLayout>

```
# ResizeLayout 属性
|  属性名  |  类型  |  默认值  |  说明  |
|  ----  |  ----  |  ----  |  ----  |
| resizeBarThick  | Number | 10 | 拖拽区域的宽度 |

# ResizeCol 属性
|  属性名  |  类型  |  默认值  |  说明  |
|  ----  |  ----  |  ----  |  ----  |
| resizeBarThick  | Number | 10 | 拖拽区域的宽度，会覆盖`ResizeLayout`的`resizeBarThick`属性 |
| width  | String | -- | 初始宽度 |
| minWidth  | String | -- | 最小宽度 |


# ResizeRow 属性
|  属性名  |  类型  |  默认值  |  说明  |
|  ----  |  ----  |  ----  |  ----  |
| resizeBarThick  | Number | 10 | 拖拽区域的宽度，会覆盖`ResizeLayout`的resizeBarThick`属性 |
| height  | String | -- | 初始高度 |
| minHeight  | String | -- | 最小高度 |
