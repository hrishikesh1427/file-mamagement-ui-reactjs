// src/api/mock.js

// Fake DB in memory (persisted to localStorage)
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed == null ? fallback : parsed;
  } catch {
    return fallback;
  }
};

const initialFiles = [
  {
    id: 1,
    name: "demo1.txt",
    content: "This is file one This is file one This is file one This is file one This is file one",
    owner: { id: 1, username: "hrishi" },
    editors: [],
    viewers: [],
    created_at: "2025-08-20T10:00:00Z",
    updated_at: "2025-08-20T11:00:00Z",
  },
  {
    id: 2,
    name: "demo2.txt",
    content: "This is file two",
    owner: { id: 1, username: "hrishi" },
    editors: [],
    viewers: [],
    created_at: "2025-08-20T12:00:00Z",
    updated_at: "2025-08-20T12:30:00Z",
  },
  {
    id: 3,
    name: "report-q1.md",
    content: "Q1 financial report draft.",
    owner: { id: 2, username: "alex" },
    editors: [{ id: 3, username: "maria" }],
    viewers: [{ id: 4, username: "sam" }],
    created_at: "2025-08-21T08:15:00Z",
    updated_at: "2025-08-21T09:00:00Z",
  },
  {
    id: 4,
    name: "design-spec.pdf",
    content: "UX design specifications for v2.",
    owner: { id: 3, username: "maria" },
    editors: [{ id: 2, username: "alex" }],
    viewers: [{ id: 1, username: "hrishi" }],
    created_at: "2025-08-21T10:00:00Z",
    updated_at: "2025-08-21T10:30:00Z",
  },
  {
    id: 5,
    name: "notes.txt",
    content: "Meeting notes and action items.",
    owner: { id: 4, username: "sam" },
    editors: [],
    viewers: [{ id: 1, username: "hrishi" }, { id: 2, username: "alex" }],
    created_at: "2025-08-19T14:20:00Z",
    updated_at: "2025-08-19T15:10:00Z",
  },
  {
    id: 6,
    name: "readme.md",
    content: "Project README overview.",
    owner: { id: 1, username: "hrishi" },
    editors: [{ id: 2, username: "alex" }],
    viewers: [{ id: 3, username: "maria" }],
    created_at: "2025-08-18T09:00:00Z",
    updated_at: "2025-08-20T16:45:00Z",
  },
  {
    id: 7,
    name: "todo.json",
    content: "{\"tasks\":[{\"title\":\"Ship MVP\"}]}",
    owner: { id: 2, username: "alex" },
    editors: [],
    viewers: [{ id: 1, username: "hrishi" }, { id: 4, username: "sam" }],
    created_at: "2025-08-17T11:00:00Z",
    updated_at: "2025-08-17T12:00:00Z",
  },
  {
    id: 8,
    name: "data.csv",
    content: "id,value\n1,100\n2,200",
    owner: { id: 3, username: "maria" },
    editors: [{ id: 1, username: "hrishi" }],
    viewers: [],
    created_at: "2025-08-16T08:00:00Z",
    updated_at: "2025-08-16T08:05:00Z",
  },
  {
    id: 9,
    name: "script.js",
    content: "console.log('Hello world')",
    owner: { id: 1, username: "hrishi" },
    editors: [{ id: 4, username: "sam" }],
    viewers: [{ id: 2, username: "alex" }],
    created_at: "2025-08-15T10:10:00Z",
    updated_at: "2025-08-15T10:15:00Z",
  },
  {
    id: 10,
    name: "proposal.docx",
    content: "Partnership proposal draft.",
    owner: { id: 4, username: "sam" },
    editors: [{ id: 3, username: "maria" }],
    viewers: [{ id: 1, username: "hrishi" }],
    created_at: "2025-08-14T09:45:00Z",
    updated_at: "2025-08-14T10:00:00Z",
  },
  {
    id: 11,
    name: "changelog.md",
    content: "## v1.0.1\n- Bug fixes\n- Performance improvements",
    owner: { id: 2, username: "alex" },
    editors: [{ id: 1, username: "hrishi" }],
    viewers: [{ id: 3, username: "maria" }, { id: 4, username: "sam" }],
    created_at: "2025-08-13T07:00:00Z",
    updated_at: "2025-08-21T07:30:00Z",
  },
  {
    id: 12,
    name: "guide.pdf",
    content: "User onboarding guide.",
    owner: { id: 3, username: "maria" },
    editors: [],
    viewers: [{ id: 2, username: "alex" }],
    created_at: "2025-08-12T06:30:00Z",
    updated_at: "2025-08-12T06:31:00Z",
  },
];

let fakeUser = load("mockUser", null);
let fakeFiles = load("mockFiles", initialFiles);

const saveUser = () => {
  try { localStorage.setItem("mockUser", JSON.stringify(fakeUser)); } catch {}
};
const saveFiles = () => {
  try { localStorage.setItem("mockFiles", JSON.stringify(fakeFiles)); } catch {}
};

// Ensure newly added seed files appear even if older localStorage exists
(function mergeSeedFilesIntoStorage() {
  try {
    const existingIds = new Set((Array.isArray(fakeFiles) ? fakeFiles : []).map((f) => f.id));
    let added = false;
    for (const file of initialFiles) {
      if (!existingIds.has(file.id)) {
        fakeFiles.push(file);
        added = true;
      }
    }
    if (added) saveFiles();
  } catch {}
})();

export const mockAPI = {
  register: async (username, email, password) => {
    fakeUser = { id: Date.now(), username, email };
    saveUser();
    return {
      message: "User registered successfully!",
      user: fakeUser,
    };
  },

  login: async (username, password) => {
    // ensure we consider persisted user if memory is empty
    if (!fakeUser) fakeUser = load("mockUser", null);
    if (!fakeUser || fakeUser.username !== username) {
      throw new Error("Invalid credentials");
    }
    return {
      access: "fake-access-token",
      refresh: "fake-refresh-token",
    };
  },

  logout: async () => {
    return { message: "success" };
  },

  listFiles: async ({ q = "", page = 1, page_size = 10 } = {}) => {
    // reload from storage on demand to reflect latest changes across reloads
    fakeFiles = load("mockFiles", fakeFiles);
    const term = q.trim().toLowerCase();
    let filtered = fakeFiles;
    if (term) {
      filtered = fakeFiles.filter((f) => {
        const name = f.name?.toLowerCase() ?? "";
        const content = f.content?.toLowerCase() ?? "";
        const owner = f.owner?.username?.toLowerCase() ?? "";
        return name.includes(term) || content.includes(term) || owner.includes(term);
      });
    }
    const total_items = filtered.length;
    const start = (page - 1) * page_size;
    const results = filtered.slice(start, start + page_size);
    return { total_items, results, page, page_size };
  },

  createFile: async (name, content) => {
    const newFile = {
      id: Date.now(),
      name,
      content,
      owner: fakeUser,
      editors: [],
      viewers: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    fakeFiles.push(newFile);
    saveFiles();
    return newFile;
  },

  getFile: async (id) => {
    const file = fakeFiles.find((f) => f.id === id);
    if (!file) throw new Error("File not found");
    return file;
  },

  updateFile: async (id, { name, content }) => {
    const idx = fakeFiles.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error("File not found");
    const existing = fakeFiles[idx];
    const updated = {
      ...existing,
      name: name ?? existing.name,
      content: content ?? existing.content,
      updated_at: new Date().toISOString(),
    };
    fakeFiles[idx] = updated;
    saveFiles();
    return updated;
  },

  deleteFile: async (id) => {
    fakeFiles = fakeFiles.filter((f) => f.id !== id);
    saveFiles();
    return { message: "File marked as deleted" };
  },

  addEditor: async (id, user) => {
    const file = fakeFiles.find((f) => f.id === id);
    if (!file) throw new Error("File not found");
    const exists = file.editors.find((u) => u.id === user.id);
    if (!exists) file.editors.push(user);
    file.updated_at = new Date().toISOString();
    saveFiles();
    return file;
  },

  removeEditor: async (id, userId) => {
    const file = fakeFiles.find((f) => f.id === id);
    if (!file) throw new Error("File not found");
    file.editors = file.editors.filter((u) => u.id !== userId);
    file.updated_at = new Date().toISOString();
    saveFiles();
    return file;
  },

  addViewer: async (id, user) => {
    const file = fakeFiles.find((f) => f.id === id);
    if (!file) throw new Error("File not found");
    const exists = file.viewers.find((u) => u.id === user.id);
    if (!exists) file.viewers.push(user);
    file.updated_at = new Date().toISOString();
    saveFiles();
    return file;
  },

  removeViewer: async (id, userId) => {
    const file = fakeFiles.find((f) => f.id === id);
    if (!file) throw new Error("File not found");
    file.viewers = file.viewers.filter((u) => u.id !== userId);
    file.updated_at = new Date().toISOString();
    saveFiles();
    return file;
  },
};
