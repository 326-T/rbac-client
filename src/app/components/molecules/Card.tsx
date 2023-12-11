export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex w-full p-5 rounded-lg bg-white"}>{children}</div>
  );
}
