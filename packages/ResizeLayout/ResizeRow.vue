<template>
  <div class="resize-row" :style="resizeRowStyle">
    <div class="resize-row-content" :style="resizeRowContentStyle">
      <slot></slot>
    </div>
    <!-- 非最后一个slot才会显示 -->
    <div class="resize-row-bar" v-if="ResizeLayout.slotsLength !== index + 1">
      <div class="resize-row-area" :style="resizeBarStyle"></div>
      <div
        class="resize-row-line"
        :style="resizeBarLineStyle"
        @mousedown="handlerMouseDown"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResizeRow',
  inject: ['ResizeLayout'],
  props: {
    height: {
      type: String,
      default: ''
    },
    minHeight: {
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
      startClientY: 0,
      // 鼠标移动时的x位置
      moveClientY: 0,
      // 拖拽线的样式
      resizeBarLineStyle: {},
      // 鼠标是否按下
      isMouseDown: false
    }
  },
  computed: {
    _resizeBarThick () {
      if (this.ResizeLayout && this.ResizeLayout.resizeBarThick && !this.resizeBarThick) {
        return this.ResizeLayout.resizeBarThick
      }
      if (this.ResizeLayout && this.ResizeLayout.resizeBarThick && this.resizeBarThick) {
        return this.resizeBarThick
      }
      return 10
    },
    resizeBarStyle () {
      return {
        height: this._resizeBarThick + 'px'
      }
    },
    // 拖拽线的颜色
    borderTopColor () {
      return this.isMouseDown ? 'rgb(231, 231, 231)' : 'transparent'
      // return "#000";
    },
    // 当前 resizeRow 的样式
    resizeRowStyle () {
      const style = {}
      if (
        this.ResizeLayout &&
        this.ResizeLayout.colHeightList &&
        this.ResizeLayout.colHeightList.length > 0
      ) {
        style.height = this.ResizeLayout.colHeightList[this.index].height
      }
      return style
    },
    resizeRowContentStyle () {
      return {
        height:
          parseInt(this.resizeRowStyle.height) - this._resizeBarThick + 'px'
      }
    }
  },
  mounted () {
    this.setDefaultResizeBarLineStyle()
  },
  methods: {
    /**
     * @description 设置初始 ResizeBarLine 的样式
     */
    setDefaultResizeBarLineStyle () {
      this.resizeBarLineStyle = { bottom: Math.ceil(this._resizeBarThick / 2) + 'px' }
    },
    /**
     * @description 鼠标按下时
     */
    handlerMouseDown (e) {
      this.isMouseDown = true
      this.startClientY = e.clientY
      this.addEventListener()
    },
    /**
     * @description 设置监听事件
     */
    addEventListener () {
      // document.addEventListener('mousemove', throttle(this.handlerMouseMove, 50))
      document.addEventListener('mousemove', this.handlerMouseMove)
      document.addEventListener('mouseup', this.handlerMouseUp)
    },
    /**
     * @description 鼠标移动时
     */
    handlerMouseMove (e) {
      this.moveClientY = e.clientY

      this.setResizeBarLineStyle()
    },
    /**
     * @description 设置 ResizeBarLine 的样式
     */
    setResizeBarLineStyle () {
      // 计算偏移量：鼠标按下的点到鼠标移动的点的偏移量
      let offset = this.startClientY - this.moveClientY
      // 最小高度
      let minHeight = parseInt(this.minHeight)
      if (minHeight < 0) {
        console.warn('minHeight 不得小于0')
        minHeight = 0
      }
      // 当 offset 大于 0 时，表示向左拖动，小于 0 表示向右拖动
      if (offset >= 0) {
        // 当前元素的高度
        const currentHeight = parseInt(
          this.ResizeLayout.colHeightList[this.index].height
        )
        // 若 当前元素的高度 - 偏移量 < 最小高度 时，则最终的偏移量就是 当前元素的高度 - 最小高度
        if (currentHeight - offset < minHeight) {
          offset = currentHeight - minHeight
        }
      } else {
        // 与当前元素相邻的元素的高度
        const nextHeight = parseInt(
          this.ResizeLayout.colHeightList[this.index + 1].height
        )
        // 若 当前元素的高度 - 偏移量 < 最小高度 时，则最终的偏移量就是 当前元素的高度 - 最小高度
        if (nextHeight - Math.abs(offset) < minHeight) {
          offset = -(nextHeight - minHeight)
        }
      }
      this.resizeBarLineStyle = {
        bottom: offset + Math.ceil(this._resizeBarThick / 2) + 'px',
        borderTopColor: this.borderTopColor
      }
    },
    /**
     * @description 鼠标松开时
     */
    handlerMouseUp () {
      this.isMouseDown = false
      this.removeEventListener()
      this.setHeight()
      this.moveClientY = 0
      this.startClientY = 0
      this.setResizeBarLineStyle()
      // this.patchResizeColHeight()
    },
    patchResizeColHeight () {
      // 高度为 0 的数量
      let zeroHeightCount = 0
      // 查找 高度为 0 的数量
      this.ResizeLayout.colHeightList.forEach(v => {
        if (parseInt(v.height) === 0) {
          zeroHeightCount++
        }
      })
      if (zeroHeightCount > 0) {
        // 最后一列的高度
        const lastColHeight = this.ResizeLayout.colHeightList[
          this.ResizeLayout.colHeightList.length - 1
        ].hHeight
        // 最终的高度 = 最后一列的高度 - 高度为 0 的数量 * _resizeBarThick 的一半
        const finalLastColHeight =
          parseInt(lastColHeight) - zeroHeightCount * this._resizeBarThick

        this.$set(
          this.ResizeLayout.colHeightList[
            this.ResizeLayout.colHeightList.length - 1
          ],
          'height',
          finalLastColHeight + 'px'
        )
      }
    },
    /**
     * @description 设置高度
     */
    setHeight () {
      // 当前元素的高度
      const currentHeight = this.ResizeLayout.colHeightList[this.index].height
      // 与当前元素相邻的元素的高度
      const nextHeight = this.ResizeLayout.colHeightList[this.index + 1].height

      // 当前元素最终的高度
      const finalCurrentHeight =
        parseInt(currentHeight) -
        parseInt(this.resizeBarLineStyle.bottom) +
        Math.ceil(this._resizeBarThick / 2)
      // 与当前元素相邻的元素最终的高度
      const finalNextHeight =
        parseInt(nextHeight) +
        parseInt(this.resizeBarLineStyle.bottom) -
        Math.ceil(this._resizeBarThick / 2)

      this.$set(
        this.ResizeLayout.colHeightList[this.index],
        'height',
        finalCurrentHeight + 'px'
      )
      this.$set(
        this.ResizeLayout.colHeightList[this.index + 1],
        'height',
        finalNextHeight + 'px'
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
.resize-row {
  position: relative;

  .resize-row-content {
    overflow: auto;
  }

  .resize-row-bar {
    position: absolute;
    width: 100%;
    z-index: 99;
    left: 0;
    bottom: 0;
  }

  .resize-row-area {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    // background: red;
  }
  .resize-row-line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    border-top: 1px solid transparent;
    // border-top: 1px solid black;
    cursor: row-resize;
    z-index: 9999;
  }
}
</style>
