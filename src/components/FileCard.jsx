import React from "react";
function FileCard({ file, onSelect }) {
  return (
    <li
      className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-3 sm:p-4 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={() => onSelect(file)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(file);
      }}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 truncate">{file.name}</div>
          <div className="text-xs sm:text-sm truncate">
  <span className="text-gray-500 dark:text-gray-300">Content: </span>
  <span className="text-black">
    {(file.content || "").length > 0
      ? file.content.length > 100
        ? `${file.content.slice(0, 100)}…`
        : file.content
      : ""}
  </span>
</div>

          <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-300 truncate">Owner: {file.owner?.username || "Unknown"}</div>
        </div>
        <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 md:text-right">
          <div>Created: {new Date(file.created_at).toLocaleString()}</div>
          <div>Updated: {new Date(file.updated_at).toLocaleString()}</div>
        </div>
      </div>
    </li>
  );
}

export default FileCard;


