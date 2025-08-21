import React from "react";

function CreateFileModal({ name, content, setName, setContent, saving, error, onCancel, onCreate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xl p-4 sm:p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create File</h2>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200" onClick={onCancel} aria-label="Close">✕</button>
        </div>
        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Content</label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50" disabled={!name.trim() || saving} onClick={onCreate}>
            {saving ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFileModal;


