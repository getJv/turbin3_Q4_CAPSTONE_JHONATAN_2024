import { ReactNode, Suspense } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'

import { WalletButton } from '../solana/solana-provider'
import { ExplorerLink } from '@/components/solana/explorer-link.tsx'
import { ClusterUiSelect } from '@/components/solana/cluster-selec.tsx'

interface Links{
 label: string;
  path: string
}
interface UiLayoutProps{
  children: ReactNode;
  links: Links[]
}

export function UiLayout({ children, links }: UiLayoutProps ) {
  const pathname = useLocation().pathname

  const renderLinks = () => {
    const linkList = links.map(({ label, path }) => (
      <li key={path}>
        <Link className={pathname.startsWith(path) ? 'active' : ''} to={path}>
          {label}
        </Link>
      </li>
    ))

    return (
      <ul className="menu menu-horizontal px-1 space-x-2">
        {linkList}
      </ul>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-base-300 text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            <img className="h-4 md:h-6" alt="Logo" src="/logo.png" />
          </Link>
          {renderLinks()}
        </div>
        <div className="flex-none space-x-2">
          <WalletButton />
          <ClusterUiSelect />
        </div>
      </div>
      <div className="flex-grow mx-4 lg:mx-auto">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Jhonatan's Capstone Project. {' '}
            <a
              className="link hover:text-white"
              href="https://github.com/getJv/turbin3_Q4_CAPSTONE_JHONATAN_2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the repo
            </a>
          </p>
        </aside>
      </footer>
    </div>
  )
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink path={`tx/${signature}`} label={'View Transaction'} className="btn btn-xs btn-primary" />
      </div>,
    )
  }
}
