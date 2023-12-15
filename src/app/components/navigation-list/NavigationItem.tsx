export default function NavigationItem({
  icon,
  label,
  href,
  selected,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  selected?: boolean;
}) {
  return (
    <a
      href={href}
      className={`
        flex items-center p-4 rounded-lg
        cursor-pointer
        ${selected ? "bg-primary-400 text-white" : "clickable"}
      `}
    >
      {icon}
      <h2 className="ml-4 title-medium">{label}</h2>
    </a>
  );
}
