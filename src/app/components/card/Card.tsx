export default function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className={"flex w-full p-3 rounded-lg bg-white hover:shadow-lg"}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
