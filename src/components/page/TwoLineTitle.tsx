/** "First line / second line in blue", used in section headings. */
export function TwoLineTitle({ title, accent = "text-blue" }: { title: [string, string]; accent?: string }) {
  return (
    <>
      {title[0]}
      <br />
      <span className={accent}>{title[1]}</span>
    </>
  );
}