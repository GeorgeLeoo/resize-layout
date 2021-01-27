<template>
  <div class="resize-col" :style="resizeColStyle">
    <div class="resize-col-content">
      <slot></slot>
    </div>
    <!-- 非最后一个slot才会显示 -->
    <div class="resize-col-bar" v-if="ResizeLayout.slotsLength !== index + 1">
      <div class="resize-col-area" :style="resizeBarStyle"></div>
      <div
        class="resize-col-line"
        :style="resizeBarLineStyle"
        @mousedown="handlerMouseDown"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResizeCol',
  inject: ['ResizeLayout'],
  props: {
    width: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: '0px'
    },
    resizeBarThick: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      // 位置
      index: 0,
      // 鼠标按下是x位置
      startClientX: 0,
      // 鼠标移动时的x位置
      moveClientX: 0,
      // 拖拽线的样式
      resizeBarLineStyle: {},
      // 鼠标是否按下
      isMouseDown: false
    }
  },
  computed: {
    _resizeBarThick () {
      if (
        this.ResizeLayout &&
        this.ResizeLayout.resizeBarThick &&
        !this.resizeBarThick
      ) {
        return this.ResizeLayout.resizeBarThick
      }
      if (
        this.ResizeLayout &&
        this.ResizeLayout.resizeBarThick &&
        this.resizeBarThick
      ) {
        return this.resizeBarThick
      }
      return 10
    },
    resizeBarStyle () {
      return {
        width: this._resizeBarThick + 'px'
      }
    },
    // 拖拽线的颜色
    borderLeftColor () {
      return this.isMouseDown ? 'rgb(231, 231, 231)' : 'transparent'
    },
    // 当前 resizeCol 的样式
    resizeColStyle () {
      const style = {}
      if (
        this.ResizeLayout &&
        this.ResizeLayout.colWidthList &&
        this.ResizeLayout.colWidthList.length > 0
      ) {
        style.width = this.ResizeLayout.colWidthList[this.index].width
      }
      return style
    }
  },
  watch: {},
  mounted () {
    this.setDefaultResizeBarLineStyle()
  },
  methods: {
    /**
     * @description 设置初始 ResizeBarLine 的样式
     */
    setDefaultResizeBarLineStyle () {
      this.resizeBarLineStyle = {
        right: Math.ceil(this._resizeBarThick / 2) + 'px'
      }
    },
    /**
     * @description 鼠标按下时
     */
    handlerMouseDown (e) {
      this.isMouseDown = true
      this.startClientX = e.clientX
      this.addEventListener()
    },
    /**
     * @description 设置监听事件
     */
    addEventListener () {
      document.addEventListener('mousemove', this.handlerMouseMove)
      document.addEventListener('mouseup', this.handlerMouseUp)
    },
    /**
     * @description 鼠标移动时
     */
    handlerMouseMove (e) {
      this.moveClientX = e.clientX

      this.setResizeBarLineStyle()
    },
    /**
     * @description 设置 ResizeBarLine 的样式
     */
    setResizeBarLineStyle () {
      // 计算偏移量：鼠标按下的点到鼠标移动的点的偏移量
      let offset = this.startClientX - this.moveClientX
      // 最小宽度
      let minWidth = parseInt(this.minWidth)
      if (minWidth < 0) {
        console.warn('minWidth 不得小于0')
        minWidth = 0
      }
      // 当 offset 大于 0 时，表示向左拖动，小于 0 表示向右拖动
      if (offset >= 0) {
        // 当前元素的宽度
        const currentWidth = parseInt(
          this.ResizeLayout.colWidthList[this.index].width
        )
        // 若 当前元素的宽度 - 偏移量 < 最小宽度 时，则最终的偏移量就是 当前元素的宽度 - 最小宽度
        if (currentWidth - offset < minWidth) {
          offset = currentWidth - minWidth
        }
      } else {
        // 与当前元素相邻的元素的宽度
        const nextWidth = parseInt(
          this.ResizeLayout.colWidthList[this.index + 1].width
        )
        // 若 当前元素的宽度 - 偏移量 < 最小宽度 时，则最终的偏移量就是 当前元素的宽度 - 最小宽度
        if (nextWidth - Math.abs(offset) < minWidth) {
          offset = -(nextWidth - minWidth)
        }
      }
      this.resizeBarLineStyle = {
        right: offset + Math.ceil(this._resizeBarThick / 2) + 'px',
        borderLeftColor: this.borderLeftColor
      }
    },
    /**
     * @description 鼠标松开时
     */
    handlerMouseUp () {
      this.isMouseDown = false
      this.removeEventListener()
      this.setWidth()
      this.moveClientX = 0
      this.startClientX = 0
      this.setResizeBarLineStyle()
      this.patchResizeColWidth()
    },
    /**
     * @description 若有宽度为 0 的的补丁
     */
    patchResizeColWidth () {
      // 宽度为 0 的数量
      let zeroWidthCount = 0
      // 查找 宽度为 0 的数量
      this.ResizeLayout.colWidthList.forEach(v => {
        if (parseInt(v.width) === 0) {
          zeroWidthCount++
        }
      })
      if (zeroWidthCount > 0) {
        // 最后一列的宽度
        const lastColWidth = this.ResizeLayout.colWidthList[
          this.ResizeLayout.colWidthList.length - 1
        ].width
        // 最终的宽度 = 最后一列的宽度 - 宽度为 0 的数量 * _resizeBarThick 的一半
        const finalLastColWidth =
          parseInt(lastColWidth) - zeroWidthCount * this._resizeBarThick

        this.$set(
          this.ResizeLayout.colWidthList[
            this.ResizeLayout.colWidthList.length - 1
          ],
          'width',
          finalLastColWidth + 'px'
        )
      }
    },
    /**
     * @description 设置宽度
     */
    setWidth () {
      // 当前元素的宽度
      const currentWidth = this.ResizeLayout.colWidthList[this.index].width
      // 与当前元素相邻的元素的宽度
      const nextWidth = this.ResizeLayout.colWidthList[this.index + 1].width

      const resizeBarLineStyleRight = parseInt(this.resizeBarLineStyle.right)

      // 当前元素最终的宽度
      const finalCurrentWidth =
        parseInt(currentWidth) -
        resizeBarLineStyleRight +
        Math.ceil(this._resizeBarThick / 2)
      // 与当前元素相邻的元素最终的宽度
      const finalNextWidth =
        parseInt(nextWidth) +
        resizeBarLineStyleRight -
        Math.ceil(this._resizeBarThick / 2)

      this.$set(
        this.ResizeLayout.colWidthList[this.index],
        'width',
        finalCurrentWidth + 'px'
      )
      this.$set(
        this.ResizeLayout.colWidthList[this.index + 1],
        'width',
        finalNextWidth + 'px'
      )
    },
    /**
     * @description 移除监听
     */
    removeEventListener () {
      document.removeEventListener('mousemove', this.handlerMouseMove)
      document.removeEventListener('mouseup', this.handlerMouseUp)
    }
  },
  destroyed () {
    this.removeEventListener()
  }
}
</script>

<style lang="scss" scoped>
.resize-col {
  float: left;
  position: relative;
  // padding-right: 10px;
  // box-sizing: border-box;

  .resize-col-content {
    overflow: auto;
  }

  .resize-col-bar {
    height: 100%;
    position: absolute;
    z-index: 99;
    right: 0;
    top: 0;
  }

  .resize-col-area {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
  }
  .resize-col-line {
    position: absolute;
    right: 0;
    top: 0;
    width: 0px;
    height: 100%;
    border-left: 1px solid transparent;
    cursor: col-resize;
    z-index: 9999;
  }
}
</style>
