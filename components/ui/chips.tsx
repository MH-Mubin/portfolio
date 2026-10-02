const Chips = ({ items, className = '' }: { items: readonly string[]; className?: string }) => (
  <ul className={`chips ${className}`}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)

export default Chips
