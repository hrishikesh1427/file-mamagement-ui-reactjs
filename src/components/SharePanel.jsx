import React, { useState } from "react";
import { mockAPI } from "../api/mock";

function SharePanel({ file, onChange }) {
  const [editorName, setEditorName] = useState("");
  const [viewerName, setViewerName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  return (
    <div className="mt-8 border-t pt-4 overflow-hidden">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Sharing</h3>
      {err && <div className="mb-2 text-red-600 text-sm">{err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Add Editor</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={editorName}
              onChange={(e) => setEditorName(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
              placeholder="username"
            />
            <button
              className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              disabled={!editorName.trim() || busy}
              onClick={async () => {
                setBusy(true);
                setErr(null);
                try {
                  const userObj = { id: Date.now(), username: editorName.trim() };
                  const updated = await mockAPI.addEditor(file.id, userObj);
                  onChange(updated);
                  setEditorName("");
                } catch (e) {
                  setErr("Failed to add editor");
                } finally {
                  setBusy(false);
                }
              }}
            >
              Add
            </button>
          </div>
          <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1 break-words">
            {file.editors?.map((u) => (
              <li key={`e-${u.id}`} className="flex items-center justify-between">
                <span>{u.username}</span>
                <button
                  className="px-2 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  onClick={async () => {
                    setBusy(true);
                    setErr(null);
                    try {
                      const updated = await mockAPI.removeEditor(file.id, u.id);
                      onChange(updated);
                    } catch (e) {
                      setErr("Failed to remove editor");
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Add Viewer</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={viewerName}
              onChange={(e) => setViewerName(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
              placeholder="username"
            />
            <button
              className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              disabled={!viewerName.trim() || busy}
              onClick={async () => {
                setBusy(true);
                setErr(null);
                try {
                  const userObj = { id: Date.now(), username: viewerName.trim() };
                  const updated = await mockAPI.addViewer(file.id, userObj);
                  onChange(updated);
                  setViewerName("");
                } catch (e) {
                  setErr("Failed to add viewer");
                } finally {
                  setBusy(false);
                }
              }}
            >
              Add
            </button>
          </div>
          <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1 break-words">
            {file.viewers?.map((u) => (
              <li key={`v-${u.id}`} className="flex items-center justify-between">
                <span>{u.username}</span>
                <button
                  className="px-2 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  onClick={async () => {
                    setBusy(true);
                    setErr(null);
                    try {
                      const updated = await mockAPI.removeViewer(file.id, u.id);
                      onChange(updated);
                    } catch (e) {
                      setErr("Failed to remove viewer");
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SharePanel;


