export default function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className={
        "flex w-full p-5 rounded-lg bg-white shadow-md hover:shadow-lg"
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
}
