'use client'

import { usePathname } from 'next/navigation'
import { GrGroup } from 'react-icons/gr'
import { MdDataObject, MdOutlineAdminPanelSettings, MdAltRoute } from 'react-icons/md'
import { TbAccessPoint } from 'react-icons/tb'
import { TfiTarget } from 'react-icons/tfi'
import NavigationItem from '@/app/components/navigation-list/NavigationItem'

export default function NavigationList({}: {}) {
  const menuItems = [
    {
      icon: <GrGroup className='icon-small md:icon-large' />,
      label: 'User Group',
      href: '/user-group',
    },
    {
      icon: <MdOutlineAdminPanelSettings className='icon-small md:icon-large' />,
      label: 'Role',
      href: '/role',
    },
    {
      icon: <TbAccessPoint className='icon-small md:icon-large' />,
      label: 'Endpoint',
      href: '/endpoint',
    },
    {
      icon: <MdAltRoute className='icon-small md:icon-large' />,
      label: 'Path',
      href: '/path',
    },
    {
      icon: <MdDataObject className='icon-small md:icon-large' />,
      label: 'Object Group',
      href: '/target-group',
    },
    {
      icon: <TfiTarget className='icon-small md:icon-large' />,
      label: 'Object',
      href: '/target',
    },
  ]

  const pathname = usePathname()

  return (
    <nav
      className='
        fixed
        bottom-0 md:top-20 left-0 z-10
        w-full md:h-full md:w-64
        p-2 md:p-4
        bg-white border-r-2 border-gray-200
      '
    >
      <ol
        className='
          flex md:block
          space-x-1 md:space-y-2
          justify-between md:justify-start
        '
      >
        {menuItems.map((menuItem) => (
          <li key={menuItem.label}>
            <NavigationItem
              icon={menuItem.icon}
              label={menuItem.label}
              href={menuItem.href}
              selected={menuItem.href === pathname}
            />
          </li>
        ))}
      </ol>
    </nav>
  )
}
