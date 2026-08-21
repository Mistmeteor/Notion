/**
 * 侧栏开关按钮
 * - 桌面：切换侧栏显示/隐藏，隐藏时正文占满全宽
 * - 手机：切换侧栏（默认隐藏），点开后侧栏从顶部展开
 *
 * 图标：X（关闭）/ 三横线（打开）
 * 由 index.js 传入 open / toggle
 */
export default function SidebarToggle({ open, onToggle }) {
  return (
    <button
      type='button'
      className='atelier-sidebar-toggle'
      onClick={onToggle}
      aria-label={open ? '隐藏侧栏' : '显示侧栏'}
      title={open ? '隐藏侧栏' : '显示侧栏'}>
      {open ? (
        // 关闭图标：×
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      ) : (
        // 打开图标：三横线
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <line x1='3' y1='6' x2='21' y2='6' />
          <line x1='3' y1='12' x2='21' y2='12' />
          <line x1='3' y1='18' x2='21' y2='18' />
        </svg>
      )}
    </button>
  )
}
