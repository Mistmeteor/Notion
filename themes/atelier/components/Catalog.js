import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import CONFIG from '../config'

/**
 * Atelier 目录（借鉴 claude 的活跃章节高亮 + 层级折叠）
 *
 * 行为：
 * 1. 默认显示 L1 + L2；配置 ATELIER_TOC_SHOW_LEVEL3 = true 时滚动到 L2
 *    自动展开其下 L3 子级
 * 2. 滚动窗口时用 scroll spy 高亮当前 section，同时高亮其祖先链
 * 3. 点击目录项平滑滚动到对应位置
 * 4. 点击顶部标题回到文章顶部
 *
 * 样式类前缀 .atelier-toc-*，具体视觉在 style.js 里定义
 */
const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const clickLockRef = useRef(false)
  const [activeSection, setActiveSection] = useState(null)
  const activeSectionRef = useRef(activeSection)

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  const showLevel3 = siteConfig('ATELIER_TOC_SHOW_LEVEL3', true, CONFIG)
  const scrollBehavior = siteConfig('ATELIER_TOC_SCROLL_BEHAVIOR', 'smooth', CONFIG)
  const maxDepth = showLevel3 ? 3 : 2

  const filteredToc = useMemo(() => {
    if (!post?.toc) return []
    return post.toc.filter(item => item.indentLevel < maxDepth)
  }, [post?.toc, maxDepth])

  const tocHierarchy = useMemo(() => {
    const hierarchy = new Map()
    const parentStack = []

    filteredToc.forEach((item, index) => {
      const id = uuidToId(item.id)

      while (
        parentStack.length > 0 &&
        parentStack[parentStack.length - 1].level >= item.indentLevel
      ) {
        parentStack.pop()
      }

      const parentId =
        parentStack.length > 0
          ? parentStack[parentStack.length - 1].id
          : null

      hierarchy.set(id, {
        item,
        index,
        parentId,
        children: [],
        indentLevel: item.indentLevel
      })

      if (parentId) {
        hierarchy.get(parentId)?.children.push(id)
      }

      parentStack.push({ id, level: item.indentLevel })
    })

    return hierarchy
  }, [filteredToc])

  const getAncestorChain = useCallback(
    targetId => {
      const chain = new Set()
      let current = targetId
      while (current) {
        chain.add(current)
        const node = tocHierarchy.get(current)
        current = node?.parentId
      }
      return chain
    },
    [tocHierarchy]
  )

  const activeL2Id = useMemo(() => {
    if (!activeSection) return null
    const node = tocHierarchy.get(activeSection)
    if (!node) return null
    if (node.indentLevel === 1) return activeSection
    if (node.indentLevel === 2) return node.parentId
    return null
  }, [activeSection, tocHierarchy])

  const highlightedIds = useMemo(() => {
    if (!activeSection) return new Set()
    return getAncestorChain(activeSection)
  }, [activeSection, getAncestorChain])

  const shouldShowItem = useCallback(
    (id, indentLevel) => {
      if (indentLevel === 0) return true
      if (indentLevel === 1) return true
      if (indentLevel === 2) {
        if (!showLevel3) return false
        const node = tocHierarchy.get(id)
        if (!node) return false
        return node.parentId === activeL2Id
      }
      return false
    },
    [showLevel3, tocHierarchy, activeL2Id]
  )

  // Scroll spy：atelier 主内容跟 window 滚动
  useEffect(() => {
    if (!post || !filteredToc || filteredToc.length < 1) return

    const actionSectionScrollSpy = throttle(() => {
      if (clickLockRef.current) return

      const sections = document.getElementsByClassName('notion-h')
      if (!sections || sections.length === 0) return

      let currentSectionId = null
      const threshold = 80
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        const bbox = section.getBoundingClientRect()
        if (bbox.top <= threshold) {
          currentSectionId = section.getAttribute('data-id')
        } else {
          break
        }
      }

      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].getAttribute('data-id')
      }

      if (currentSectionId !== activeSectionRef.current) {
        setActiveSection(currentSectionId)

        // 让活跃项在侧栏中居中可见 —— 用 scrollIntoView 自动定位到
        // 最近的可滚动祖先（这里就是 .sideLeft，因为它 overflow-y: auto）
        // 这样右边文章滑到什么位置，左边侧栏跟着自动滚到对应目录项
        requestAnimationFrame(() => {
          const activeAnchor = document.querySelector(
            `.atelier-toc-item.atelier-toc-active`
          )
          if (activeAnchor && typeof activeAnchor.scrollIntoView === 'function') {
            activeAnchor.scrollIntoView({
              behavior: scrollBehavior,
              block: 'center',
              inline: 'nearest'
            })
          }
        })
      }
    }, 100)

    window.addEventListener('scroll', actionSectionScrollSpy, { passive: true })
    setTimeout(() => actionSectionScrollSpy(), 300)

    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
      actionSectionScrollSpy.cancel?.()
    }
  }, [post, filteredToc, tocHierarchy, scrollBehavior])

  const handleTitleClick = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior })
  }

  if (!post || !filteredToc || filteredToc.length < 1) {
    return null
  }

  return (
    <div className='atelier-catalog'>
      <div
        className='atelier-toc-title'
        onClick={handleTitleClick}
        role='button'
        tabIndex={0}>
        {locale.COMMON.TABLE_OF_CONTENTS}
      </div>

      <div className='atelier-toc-list' ref={tRef}>
        {filteredToc.map(tocItem => {
          const id = uuidToId(tocItem.id)
          const isHighlighted = highlightedIds.has(id)
          const isActive = activeSection === id
          const show = shouldShowItem(id, tocItem.indentLevel)

          if (!show) return null

          // 8px 起底给 border-left 指示条留位置，每深一级 +18px
          // H1 -> 8px，H2 -> 26px，H3 -> 44px
          const paddingLeft = 8 + tocItem.indentLevel * 18

          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => {
                e.preventDefault()
                clickLockRef.current = true

                const target = document.querySelector(`[data-id="${id}"]`)
                if (target) {
                  const targetRect = target.getBoundingClientRect()
                  const scrollOffset = window.scrollY + targetRect.top - 40
                  window.scrollTo({
                    top: scrollOffset,
                    behavior: scrollBehavior
                  })
                }

                const delay = scrollBehavior === 'smooth' ? 500 : 50
                setTimeout(() => {
                  setActiveSection(id)
                  clickLockRef.current = false
                }, delay)
              }}
              className={`atelier-toc-item ${
                isActive
                  ? 'atelier-toc-active'
                  : isHighlighted
                    ? 'atelier-toc-highlighted'
                    : 'atelier-toc-inactive'
              }`}
              style={{ paddingLeft: `${paddingLeft}px` }}>
              {tocItem.text}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Catalog
