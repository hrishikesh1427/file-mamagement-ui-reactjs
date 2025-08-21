import React from "react";

function FileDetailModal({ file, role, name, content, setName, setContent, canWrite, canDelete, onClose, onSave, onDelete, saving, error, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-4 sm:p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">File Details</h2>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}

        <div className="grid grid-cols-1 gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Your role: <span className="font-medium">{role}</span>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
              disabled={!canWrite}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Content</label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
              disabled={!canWrite}
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div>Owner: {file.owner?.username || "Unknown"}</div>
            <div>Editors: {file.editors?.map((u) => u.username).join(", ") || "-"}</div>
            <div>Viewers: {file.viewers?.map((u) => u.username).join(", ") || "-"}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div>Created: {new Date(file.created_at).toLocaleString()}</div>
            <div>Updated: {new Date(file.updated_at).toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-2">
            {canDelete && (
              <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={onDelete}>Delete</button>
            )}
            <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100" onClick={onClose}>Close</button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50" disabled={!canWrite || saving} onClick={onSave}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {children ? (
          <div className="mt-6">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FileDetailModal;


