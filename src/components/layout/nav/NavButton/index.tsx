interface Props {
  onClick: () => void;
}

export default function NavButton({ onClick }: Props) {
  return (
    <button
      type="button"
      className="border border-slate-500 p-1 rounded"
      onClick={() => onClick()}
    >
      Nav
    </button>
  );
}
