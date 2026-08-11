import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'
import './SwipeableTabs.css'

export default function SwipeableTabs({ tabs, activeIndex, onTabChange, children, dragHandleRef }) {
  const x = useMotionValue(0)
  const viewportRef = useRef(null)

  const getWidth = () => viewportRef.current?.offsetWidth ?? window.innerWidth

  useEffect(() => {
    animate(x, -activeIndex * getWidth(), { type: 'spring', stiffness: 300, damping: 30 })
  }, [activeIndex])

  function handleDragEnd(_, info) {
    const width = getWidth()
    const threshold = width * 0.3

    let next = activeIndex
    if ((info.offset.x < -threshold || info.velocity.x < -500) && activeIndex < tabs.length - 1)
      next = activeIndex + 1
    else if ((info.offset.x > threshold || info.velocity.x > 500) && activeIndex > 0)
      next = activeIndex - 1

    onTabChange(next)
    animate(x, -next * getWidth(), { type: 'spring', stiffness: 300, damping: 30 })
  }

  const dragConstraints = dragHandleRef ?? { left: 0, right: 0 }

  return (
    <div className="swipeable-viewport" ref={viewportRef}>
      <motion.div
        className="swipeable-track"
        style={{ x, width: `${tabs.length * 100}%` }}
        drag="x"
        dragConstraints={{ left: -(tabs.length - 1) * getWidth(), right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {children.map((child, i) => (
          <div key={i} className="swipeable-slide" style={{ width: `${100 / tabs.length}%` }}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
