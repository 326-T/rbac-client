export default function Pulldown({
  title,
  candidates,
  hover,
}: {
  title: React.ReactNode
  candidates: React.ReactNode[]
  hover?: boolean
}) {
  return (
    <div className={`dropdown dropdown-end ${hover && 'dropdown-hover'}`}>
      <div tabIndex={0} role='button' className='btn'>
        {title}
      </div>
      <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box'>
        {candidates.map((candidates: React.ReactNode, index: number) => (
          <li key={index}>{candidates}</li>
        ))}
      </ul>
    </div>
  )
}
