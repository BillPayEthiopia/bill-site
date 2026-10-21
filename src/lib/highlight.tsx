/* A tiny highlighter: strings, comments, numbers, keywords, function calls. */
const TOKEN =
  /("[^"]*"|'[^']*')|(\/\/.*|#.*)|(\b\d+(?:\.\d+)?\b)|(\b(?:import|from|const|let|new|await|return|export|def|print|async|function|if|curl)\b)|([A-Za-z_][\w.]*)(?=\()|(\s+|\S+)/g;

const TOKEN_CLASS = ["text-aqua", "text-white/40 italic", "text-amber-200", "text-sky-300", "text-blue-200", "text-white/85"];

export function highlight(line: string) {
  return Array.from(line.matchAll(TOKEN), (match, index) => {
    const group = match.slice(1).findIndex((part) => part !== undefined);
    return (
      <span key={index} className={TOKEN_CLASS[group]}>
        {match[0]}
      </span>
    );
  });
}