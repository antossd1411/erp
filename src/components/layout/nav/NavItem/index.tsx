import Link from "next/link";

interface Props {
  route: string;
  isActive: boolean;
}

export default function NavItem({ route, isActive }: Props) {
  return <Link href={`/`} />;
}
