interface Props {
  onClick: () => void;
}

export default function NavButton({ onClick }: Props) {
  return (
    <button type="button" className="btn" onClick={() => onClick()}>
      Nav
    </button>
  );
}
