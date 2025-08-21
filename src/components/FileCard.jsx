import React from "react";
function FileCard({ file, onSelect }) {
  return (
    <li
      className="w-full max-w-full bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-3 sm:p-4 cursor-pointer hover:border-blue-300 transition-colors overflow-hidden"
      onClick={() => onSelect(file)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(file);
      }}
    >
      <div className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 max-w-full">
          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 break-words">{file.name}</div>
          <div className="text-xs sm:text-sm break-words leading-snug max-h-10 overflow-hidden">
            <span className="text-gray-500 dark:text-gray-300">Content: </span>
            <span className="text-gray-900 dark:text-gray-200">
              {(file.content || "").length > 0
                ? file.content.length > 100
                  ? `${file.content.slice(0, 100)}…`
                  : file.content
                : ""}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-300 break-words">Owner: {file.owner?.username || "Unknown"}</div>
        </div>
        <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 md:text-right mt-1 md:mt-0 shrink-0">
          <div>Created: {new Date(file.created_at).toLocaleString()}</div>
          <div>Updated: {new Date(file.updated_at).toLocaleString()}</div>
        </div>
      </div>
    </li>
  );
}

export default FileCard;


