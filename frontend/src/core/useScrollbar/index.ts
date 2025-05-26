import { type MaybeRef, ref, toRef, toValue } from 'vue'
import { tryOnBeforeUnmount, tryOnMounted } from '@/core/utils'
import { useResizeObserver } from '@/core/useResizeObserver'
import './style.scss'

export interface UseScrollbarOptions {
  target?: HTMLElement | string
  offset?: number
}

export const useScrollbar = (target: MaybeRef<HTMLElement>, options: UseScrollbarOptions = {}) => {
  const { offset = 0, target: optionTarget } = options
  const scrollbarElement = ref(document.createElement('div'))
  const targetElement = toRef(target)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  let isDraggingX = false
  let isDraggingY = false
  let startX = 0
  let startY = 0
  let startScrollLeft = 0
  let startScrollTop = 0
  let hideRailTimeoutId: number | null = null

  const railX = document.createElement('div')
  const railY = document.createElement('div')
  const thumbX = document.createElement('div')
  const thumbY = document.createElement('div')

  const wheelHandler = (event: WheelEvent) => {
    scrollbarElement.value.scrollBy({
      top: event.deltaY
    })
    event.preventDefault()
  }

  const scrollHandler = () => {
    const scrollY = scrollbarElement.value.scrollTop
    const scrollX = scrollbarElement.value.scrollLeft
    railY.style.top = `${scrollY}px`
    thumbY.style.top = `${scrollY * (scrollbarElement.value.clientHeight / targetElement.value.clientHeight)}px`
    railX.style.left = `${scrollX}px`
    thumbX.style.left = `${scrollX * (scrollbarElement.value.clientWidth / targetElement.value.clientWidth)}px`
  }

  const railXClickHandler = (event: MouseEvent) => {
    const railRect = railX.getBoundingClientRect()
    const clickX = event.clientX - railRect.left

    const thumbHalfWidth = thumbX.offsetWidth / 2
    const targetScrollLeft = ((clickX - thumbHalfWidth) / railRect.width) * targetElement.value.clientWidth

    scrollbarElement.value.scrollLeft = Math.max(0, Math.min(targetScrollLeft, targetElement.value.clientWidth - scrollbarElement.value.clientWidth))
  }

  const railYClickHandler = (event: MouseEvent) => {
    const railRect = railY.getBoundingClientRect()
    const clickY = event.clientY - railRect.top

    const thumbHalfHeight = thumbY.offsetHeight / 2
    const targetScrollTop = ((clickY - thumbHalfHeight) / railRect.height) * targetElement.value.clientHeight

    scrollbarElement.value.scrollTop = Math.max(0, Math.min(targetScrollTop, targetElement.value.clientHeight - scrollbarElement.value.clientHeight))
  }

  const thumbXMouseDownHandler = (event: MouseEvent) => {
    isDraggingX = true
    startX = event.clientX
    startScrollLeft = scrollbarElement.value.scrollLeft
    document.addEventListener('mousemove', thumbXMouseMoveHandler)
    document.addEventListener('mouseup', thumbXMouseUpHandler)
    event.preventDefault()
  }

  const thumbXMouseMoveHandler = (event: MouseEvent) => {
    if (isDraggingX) {
      const deltaX = event.clientX - startX
      scrollbarElement.value.scrollLeft = startScrollLeft + (deltaX / scrollbarElement.value.clientWidth) * targetElement.value.clientWidth
    }
  }

  const thumbXMouseUpHandler = () => {
    isDraggingX = false
    document.removeEventListener('mousemove', thumbXMouseMoveHandler)
    document.removeEventListener('mouseup', thumbXMouseUpHandler)
  }

  const thumbYMouseDownHandler = (event: MouseEvent) => {
    isDraggingY = true
    startY = event.clientY
    startScrollTop = scrollbarElement.value.scrollTop
    document.addEventListener('mousemove', thumbYMouseMoveHandler)
    document.addEventListener('mouseup', thumbYMouseUpHandler)
    event.preventDefault()
  }

  const thumbYMouseMoveHandler = (event: MouseEvent) => {
    if (isDraggingY) {
      const deltaY = event.clientY - startY
      scrollbarElement.value.scrollTop = startScrollTop + (deltaY / scrollbarElement.value.clientHeight) * targetElement.value.clientHeight
    }
  }

  const thumbYMouseUpHandler = () => {
    isDraggingY = false
    document.removeEventListener('mousemove', thumbYMouseMoveHandler)
    document.removeEventListener('mouseup', thumbYMouseUpHandler)
  }

  const showRails = () => {
    scrollbarElement.value.focus()
    if (hideRailTimeoutId) {
      clearTimeout(hideRailTimeoutId)
    }
  }

  const hideRails = () => {
    hideRailTimeoutId = window.setTimeout(() => {
      scrollbarElement.value.blur()
    }, 1000)
  }

  const touchStartHandler = (event: TouchEvent) => {
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY
    showRails()
  }

  const touchMoveHandler = (event: TouchEvent) => {
    const deltaX = event.touches[0].clientX - startX
    const deltaY = event.touches[0].clientY - startY
    scrollbarElement.value.scrollLeft -= deltaX
    scrollbarElement.value.scrollTop -= deltaY
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY
  }

  const touchEndHandler = () => {
    hideRails()
  }

  tryOnMounted(() => {
    if (optionTarget) {
      targetElement.value = (typeof optionTarget == 'string' ? toValue(target).querySelector(optionTarget) : optionTarget) as HTMLElement
    }

    targetElement.value.parentNode?.insertBefore(scrollbarElement.value, targetElement.value)
    scrollbarElement.value.appendChild(targetElement.value)

    if (isTouchDevice) {
      scrollbarElement.value.addEventListener('touchstart', touchStartHandler)
      scrollbarElement.value.addEventListener('touchmove', touchMoveHandler)
      scrollbarElement.value.addEventListener('touchend', touchEndHandler)
    }

    railX.classList.add('sb-rail-x')
    railY.classList.add('sb-rail-y')
    thumbX.classList.add('sb-thumb-x')
    thumbY.classList.add('sb-thumb-y')

    scrollbarElement.value.classList.add('scrollbar')

    railX.append(thumbX)
    railY.append(thumbY)

    railY.style.right = `${offset}px`
    railY.style.height = `${scrollbarElement.value.clientHeight}px`
    railX.style.bottom = `${offset}px`
    railX.style.width = `${scrollbarElement.value.clientWidth}px`

    scrollbarElement.value.addEventListener('wheel', wheelHandler)
    scrollbarElement.value.addEventListener('scroll', scrollHandler)

    // Attach click events for rails
    railX.addEventListener('click', railXClickHandler)
    railY.addEventListener('click', railYClickHandler)

    // Attach mouse events for dragging
    thumbX.addEventListener('mousedown', thumbXMouseDownHandler)
    thumbY.addEventListener('mousedown', thumbYMouseDownHandler)

    if (scrollbarElement.value.clientWidth < targetElement.value.clientWidth) {
      scrollbarElement.value.classList.add('sb-active-x')
      thumbX.style.width = `${(scrollbarElement.value.clientWidth / targetElement.value.clientWidth) * 100}%`
    }
    if (scrollbarElement.value.clientHeight < targetElement.value.clientHeight) {
      scrollbarElement.value.classList.add('sb-active-y')
      thumbY.style.height = `${(scrollbarElement.value.clientHeight / targetElement.value.clientHeight) * 100}%`
    }
    scrollbarElement.value.append(railX, railY)
  })

  const { stop: stop1 } = useResizeObserver(targetElement, (entries) => {
    const contentRect = [entries[0].contentRect.width, entries[0].contentRect.height]
    if (scrollbarElement.value.clientWidth < contentRect[0]) {
      scrollbarElement.value.classList.add('sb-active-x')
      railX.style.width = `${scrollbarElement.value.clientWidth}px`
      thumbX.style.width = `${(scrollbarElement.value.clientWidth / contentRect[0]) * 100}%`
    } else {
      scrollbarElement.value.classList.remove('sb-active-x')
    }
    if (scrollbarElement.value.clientHeight < contentRect[1]) {
      scrollbarElement.value.classList.add('sb-active-y')
      railY.style.height = `${scrollbarElement.value.clientHeight}px`
      thumbY.style.height = `${(scrollbarElement.value.clientHeight / contentRect[1]) * 100}%`
    } else {
      scrollbarElement.value.classList.remove('sb-active-y')
    }
  })

  const stop = () => {
    stop1()
    scrollbarElement.value.removeEventListener('wheel', wheelHandler)
    scrollbarElement.value.removeEventListener('scroll', scrollHandler)
    if (isTouchDevice) {
      scrollbarElement.value.removeEventListener('touchstart', touchStartHandler)
      scrollbarElement.value.removeEventListener('touchmove', touchMoveHandler)
      scrollbarElement.value.removeEventListener('touchend', touchEndHandler)
    }
  }

  tryOnBeforeUnmount(() => {
    stop()
  })

  return { stop }
}
