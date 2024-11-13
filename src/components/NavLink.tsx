import Link from "next/link";

export default function NavLink({label, href, currentPath} : {label : string,href : string, currentPath : string}) {
    return (
    <Link href={href} className={`font-bold text-2xl ${href === currentPath ? 'text-yellow-300' : 'text-white'}`}>
        {label}
    </Link>
  )
}
