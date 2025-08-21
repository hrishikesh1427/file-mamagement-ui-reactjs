import React, { useEffect, useMemo, useState } from "react";
import { mockAPI } from "../api/mock";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import FileCard from "../components/FileCard";
import FileDetailModal from "../components/FileDetailModal";
import CreateFileModal from "../components/CreateFileModal";
import SharePanel from "../components/SharePanel";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [detailName, setDetailName] = useState("");
  const [detailContent, setDetailContent] = useState("");
  const [detailSaving, setDetailSaving] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createContent, setCreateContent] = useState("");
  const [createSaving, setCreateSaving] = useState(false);
  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await mockAPI.listFiles({ page_size: 1000 });
        if (!isCancelled) {
          setFiles(Array.isArray(data?.results) ? data.results : []);
        }
      } catch (e) {
        if (!isCancelled) setError("Failed to load files");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    load();
    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredFiles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return files;
    return files.filter((f) => {
      const name = f.name?.toLowerCase() ?? "";
      const content = f.content?.toLowerCase() ?? "";
      const owner = f.owner?.username?.toLowerCase() ?? "";
      return name.includes(term) || content.includes(term) || owner.includes(term);
    });
  }, [files, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredFiles.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredFiles.slice(start, start + pageSize);
  }, [filteredFiles, currentPage]);

  useEffect(() => {
    // Reset to first page on new search
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto py-6 sm:py-8 px-3 sm:px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Your Files</h1>
          <div className="flex items-center gap-3">
            <button
              className="px-3 py-2 rounded bg-green-600 text-white"
              onClick={() => {
                setCreateError(null);
                setCreateName("");
                setCreateContent("");
                setCreateOpen(true);
              }}
            >
              New File
            </button>
            <button
              className="px-3 py-2 rounded bg-gray-800 text-white"
              onClick={async () => {
                try {
                  // Use context logout
                  const { logout } = require("../context/AuthContext");
                } catch (e) {}
              }}
              hidden
            >
              Hidden
            </button>
            <button
              className="px-3 py-2 rounded bg-gray-200 text-gray-800"
              onClick={async () => {
                try {
                  const { logout } = require("../context/AuthContext");
                } catch (e) {}
              }}
              hidden
            >
              Hidden2
            </button>
            <button
              className="px-3 py-2 rounded bg-gray-200 text-gray-900"
              onClick={async () => {
                try {
                  // Proper logout using context
                  const auth = require("../context/AuthContext");
                } catch (e) {}
              }}
              hidden
            >
              Hidden3
            </button>
            {/* Moved to Navbar */}
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, content, or owner"
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        {loading && (
          <div className="text-gray-600">Loading files…</div>
        )}
        {error && (
          <div className="text-red-600">{error}</div>
        )}

        {!loading && !error && paginated.length === 0 && (
          <div className="text-gray-600">No files found.</div>
        )}

        {!loading && !error && paginated.length > 0 && (
          <ul className="space-y-2 sm:space-y-3">
            {paginated.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onSelect={async () => {
                  try {
                    const full = await mockAPI.getFile(file.id);
                    setSelectedFile(full);
                    setDetailName(full.name || "");
                    setDetailContent(full.content || "");
                    setDetailError(null);
                    setDetailOpen(true);
                  } catch (e) {}
                }}
              />
            ))}
          </ul>
        )}

        {!loading && !error && filteredFiles.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="text-gray-700 text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {detailOpen && selectedFile && (
        <FileDetailModal
          file={selectedFile}
          role={computeRole(selectedFile, user)}
          name={detailName}
          content={detailContent}
          setName={setDetailName}
          setContent={setDetailContent}
          canWrite={canWrite(selectedFile, user)}
          canDelete={canDelete(selectedFile, user)}
          saving={detailSaving}
          error={detailError}
          onClose={() => { setDetailOpen(false); setSelectedFile(null); }}
          onSave={async () => {
            setDetailSaving(true);
            setDetailError(null);
            try {
              const updated = await mockAPI.updateFile(selectedFile.id, { name: detailName, content: detailContent });
              setSelectedFile(updated);
              setFiles((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
              // Close modal after successful save
              setDetailOpen(false);
              setSelectedFile(null);
            } catch (e) {
              setDetailError("Failed to save changes");
            } finally {
              setDetailSaving(false);
            }
          }}
          onDelete={async () => {
            if (!window.confirm("Delete this file?")) return;
            try {
              await mockAPI.deleteFile(selectedFile.id);
              setFiles((prev) => prev.filter((f) => f.id !== selectedFile.id));
              setDetailOpen(false);
              setSelectedFile(null);
            } catch (e) {
              setDetailError("Failed to delete file");
            }
          }}
        >
          {canDelete(selectedFile, user) && (
            <SharePanel
              file={selectedFile}
              onChange={(updated) => {
                setSelectedFile(updated);
                setFiles((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
              }}
            />
          )}
        </FileDetailModal>
      )}

      {createOpen && (
        <CreateFileModal
          name={createName}
          content={createContent}
          setName={setCreateName}
          setContent={setCreateContent}
          saving={createSaving}
          error={createError}
          onCancel={() => setCreateOpen(false)}
          onCreate={async () => {
            setCreateSaving(true);
            setCreateError(null);
            try {
              const created = await mockAPI.createFile(createName.trim(), createContent);
              setFiles((prev) => [created, ...prev]);
              setCreateOpen(false);
              setCreateName("");
              setCreateContent("");
            } catch (e) {
              setCreateError("Failed to create file");
            } finally {
              setCreateSaving(false);
            }
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;

function canWrite(file, user) {
  if (!file || !user) return false;
  const username = user.username;
  if (file.owner?.username === username) return true;
  if (Array.isArray(file.editors) && file.editors.some((u) => u.username === username)) return true;
  return false;
}

function canDelete(file, user) {
  if (!file || !user) return false;
  return file.owner?.username === user.username;
}

function computeRole(file, user) {
  if (!file || !user) return "Viewer";
  if (file.owner?.username === user.username) return "Owner";
  if (Array.isArray(file.editors) && file.editors.some((u) => u.username === user.username)) return "Editor";
  return "Viewer";
}

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <button
      className="px-3 py-2 rounded bg-gray-200 text-gray-900"
      onClick={async () => {
        try {
          await logout();
          navigate("/");
        } catch (e) {}
      }}
    >
      Logout
    </button>
  );
}

