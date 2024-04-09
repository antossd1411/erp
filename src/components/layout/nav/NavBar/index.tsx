import { useRouter } from "next/navigation";

interface Props {
  active: boolean;
  onClickClose: () => void;
}

export default function NavBar({ active, onClickClose }: Props) {
  const router = useRouter();

  const handleLogOut = () => {
    fetch("/api/auth", {
      method: "DELETE",
    })
      .then((response: Response) => {
        if (response.redirected) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
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
          <button
            type="button"
            className="bg-slate-50 px-2 py-1 border rounded"
            onClick={() => handleLogOut()}
          >
            Log out
          </button>
        </div>
      </nav>
    </aside>
  );
}
