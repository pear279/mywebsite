import Link from 'next/link';

const links = [
  { href: '/', label: '首页' },
  { href: '/profile', label: '个人资料' },
  { href: '/resume', label: '简历' },
  { href: '/bookmarks', label: '收藏链接' }
];

export function SiteNav() {
  return (
    <header className="navWrap">
      <nav className="container nav">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="navLink">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
