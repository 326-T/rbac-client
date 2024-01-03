import Link from 'next/link'

export default function NavigationItem({
  icon,
  label,
  href,
  selected,
}: {
  icon: React.ReactNode
  label: string
  href: string
  selected?: boolean
}) {
  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        p-4 rounded-lg
        cursor-pointer
        ${selected ? 'bg-primary-400 text-white' : 'clickable-primary'}
      `}
    >
      {icon}
      <h2 className='ml-4 title-medium hidden md:block'>{label}</h2>
    </Link>
  )
}
