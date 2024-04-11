import NavLink from "@/types/Layout/Nav/navLink";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

interface Props {
  active: boolean;
  items: NavLink[];
  error: string;
  onClickClose: () => void;
}

export default function NavBar({ active, items, error, onClickClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    fetch("/api/auth", {
      method: "DELETE",
    }).then((response: Response) => {
      if (response.redirected) {
        router.push("/");
      }
    });
  };

  return (
    <aside
      className={`${active ? "bg-red-100" : ""} p-2 border-e border-slate-500`}
    >
      <nav>
        <div className="text-end mb-4">
          <button type="button" onClick={() => onClickClose()}>
            X
          </button>
          {error.length === 0 ? (
            <Fragment>
              <ul>
                {items.map((item) => {
                  return (
                    <li
                      key={item.route}
                      className={`${"/".concat(item.route) === pathname ? "bg-green-200" : ""} mb-2`}
                    >
                      <Link href={`/${item.route}`}>{item.link}</Link>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                className="btn"
                onClick={() => handleLogOut()}
              >
                Log out
              </button>
            </Fragment>
          ) : (
            <div className="text-center">
              <p>{error}</p>
              <p>Refresh the page or try again later.</p>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
