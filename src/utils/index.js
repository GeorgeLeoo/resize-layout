/**
 * @description 是够有滚动条
 */
export const hasScrollbar = () => {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
}

/**
 * @description 获得滚动条的宽度
 */
export const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div')

  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
  document.body.appendChild(scrollDiv)

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth

  document.body.removeChild(scrollDiv)

  return scrollbarWidth
}
