# ResizeLayout

>可拖拽拉宽改变元素宽度布局

# Demo
[在线实例地址：https://georgeleoo.github.io/resize-layout/](https://georgeleoo.github.io/resize-layout/)

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
