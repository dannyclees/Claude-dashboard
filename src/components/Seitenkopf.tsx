export function Seitenkopf({
  titel,
  untertitel,
  children,
}: {
  titel: string;
  untertitel?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="t-large-title">{titel}</h1>
        {untertitel && <p className="t-body text-2 mt-1">{untertitel}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}
