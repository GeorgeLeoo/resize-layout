<template>
  <div ref="resizeLayout" class="resize-layout clearfix">
    <slot></slot>
  </div>
</template>

<script>
import { hasScrollbar, getScrollbarWidth } from '@/utils'
export default {
  name: 'ResizeLayout',
  props: {
    resizeBarThick: {
      type: Number,
      default: 10
    }
    // mode: {
    //   type: String,
    //   default: 'preview',
    //   validator: _follow => {
    //     const list = ['preview', 'follow']
    //     const hasValue = list.includes(_follow)
    //     if (!hasValue) {
    //       throw new Error('prop follow only can be "preview" or "follow"')
    //     }
    //     return true
    //   }
    // }
  },
  provide () {
    return {
      ResizeLayout: this
    }
  },
  data () {
    return {
      // ResizeLayout 的宽度
      resizeLayoutWidth: 0,
      // ResizeLayout 的高度
      resizeLayoutHeight: 0,
      // 子组件
      slots: [],
      colWidthList: [],
      colHeightList: [],
      timerId: undefined
    }
  },
  computed: {
    // 子组件长度
    slotsLength () {
      return this.slots ? this.slots.length : 0
    }
  },
  watch: {
    resizeLayoutWidth (val, old) {
      if (
        this.slots[0].componentOptions.tag === 'ResizeCol' &&
        this.timerId &&
        old !== 0 &&
        val !== old
      ) {
        this.init()
        clearInterval(this.timerId)
      }
    }
  },
  mounted () {
    this.init()
    this.addEventListener()
  },
  methods: {
    /**
     * @description 初始化
     */
    init () {
      this.resizeLayoutWidth = this.getResizeLayoutWidth(
        this.$refs.resizeLayout
      )
      this.resizeLayoutHeight = this.getResizeLayoutHeight(
        this.$refs.resizeLayout
      )

      this.slots = this.$slots.default

      this.setWidth(this.slots)
      this.setHeight(this.slots)

      this.setIndex()

      if (this.slots[0].componentOptions.tag === 'ResizeCol') {
        this.loopEventWidth()
      }
    },
    /**
     * @description 持续监听width的变化，结束条件参考 watch 中 resizeLayoutWidth
     */
    loopEventWidth () {
      this.timerId = setInterval(() => {
        this.resizeLayoutWidth = this.getResizeLayoutWidth(
          this.$refs.resizeLayout
        )
      })
    },
    /**
     * @description 添加监听
     */
    addEventListener () {
      window.addEventListener('resize', this.handlerResize)
    },
    /**
     * @description 移除监听
     */
    removeEventListener () {
      window.removeEventListener('resize', this.handlerResize)
    },
    /**
     * @description 缩放窗口
     */
    handlerResize () {
      this.init()
    },
    /**
     * @description 给每个子组件设置 index
     */
    setIndex () {
      this.slots.forEach((slot, index) => {
        this.$set(slot.componentInstance, 'index', index)
      })
    },
    /**
     * @description 获取 ResizeLayout 的宽度
     */
    getResizeLayoutWidth (el) {
      if (el) {
        if (hasScrollbar()) {
          return el.offsetWidth - getScrollbarWidth()
        }
        return el.offsetWidth
      } else {
        return 0
      }
    },
    /**
     * @description 设置宽度
     */
    setWidth (slots) {
      // 列样式
      const colWidthList = []

      slots.forEach(slot => {
        // 组件名是 ResizeCol 的，将宽度对象添加到 colWidthList 中
        if (slot.componentOptions.tag === 'ResizeCol') {
          colWidthList.push({
            width: slot.componentOptions.propsData.width
          })
        }
      })

      this.setColWidthList(colWidthList)
    },
    /**
     * @description 设置列宽度
     */
    setColWidthList (colWidthList) {
      // 没有设置宽度的组件数量
      let emptyWidthCount = 0

      // 已设置了宽度的总和
      let sumWidth = 0

      colWidthList.forEach(v => {
        // 未设置宽度则 emptyWidthCount + 1
        // 否则，计算已占宽度
        if (!v.width) {
          emptyWidthCount++
        } else {
          sumWidth += parseInt(v.width)
        }
      })

      // 剩下未设置宽度的总和
      const restWidth = this.resizeLayoutWidth - sumWidth

      // 对为设置宽度的元素进行剩下宽度平分
      // let averageWidth = restWidth / emptyWidthCount - (this.slotsLength - 1) * 20
      const averageWidth = restWidth / emptyWidthCount

      colWidthList.forEach(v => {
        // 给未设置宽度的进行设置宽度
        if (!v.width) {
          v.width = averageWidth + 'px'
        }
      })

      this.colWidthList = colWidthList
    },

    /**
     * @description 获取 ResizeLayout 的高度
     */
    getResizeLayoutHeight (el) {
      if (el) {
        return el.offsetHeight
      } else {
        return 0
      }
    },
    /**
     * @description 设置高度
     */
    setHeight (slots) {
      // 行样式
      const colHeightList = []

      slots.forEach(slot => {
        // 组件名是 ResizeRow 的，将宽度对象添加到 colWidthList 中
        if (slot.componentOptions.tag === 'ResizeRow') {
          colHeightList.push({
            height: slot.componentOptions.propsData.height
          })
        }
      })

      this.setColHeightList(colHeightList)
    },
    /**
     * @description 设置列高度
     */
    setColHeightList (colHeightList) {
      // 没有设置高度的组件数量
      let emptyHeightCount = 0

      // 已设置了高度的总和
      let sumHeight = 0

      colHeightList.forEach(v => {
        // 未设置高度则 emptyHeightCount + 1
        // 否则，计算已占高度
        if (!v.height) {
          emptyHeightCount++
        } else {
          sumHeight += parseInt(v.height)
        }
      })

      // 剩下未设置高度的总和
      const restHeight = this.resizeLayoutHeight - sumHeight

      // 对为设置高度的元素进行剩下高度平分
      // let averageHeight = restHeight / emptyHeightCount - (this.slotsLength - 1) * 20
      const averageHeight = restHeight / emptyHeightCount

      colHeightList.forEach(v => {
        // 给未设置高度的进行设置高度
        if (!v.height) {
          v.height = averageHeight + 'px'
        }
      })

      this.colHeightList = colHeightList
    }
  },
  destroyed () {
    this.removeEventListener()
  }
}
</script>

<style lang="scss" scoped>
.resize-layout {
  overflow: auto;
  height: 100%;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
</style>
