import type { ArticleSection } from "../data/editorial";

export default function ArticleTable({
  table,
}: {
  table: NonNullable<ArticleSection["table"]>;
}) {
  return (
    <>
      <div
        className="journal-table-scroll"
        role="region"
        aria-label={table.caption}
        tabIndex={0}
      >
        <table>
          <caption>{table.caption}</caption>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={i}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="journal-table-guidance">Scroll across to compare.</p>
    </>
  );
}
