<script setup>
import { ref } from 'vue'

const API_BASE = 'http://localhost:8080/api/students'

const inputText = ref('')
const resultData = ref(null)
const rawResponse = ref('')
const loading = ref(false)
const statusMessage = ref('')
const alertType = ref('info')

const showStatus = (msg, type = 'info') => {
  statusMessage.value = msg
  alertType.value = type
  setTimeout(() => {
    if (statusMessage.value === msg) {
      statusMessage.value = ''
    }
  }, 4500)
}

// 1. CREATE STUDENT (POST)
const handleCreate = async () => {
  const name = inputText.value.trim()
  if (!name) {
    showStatus('Please enter a student name in the input box to create.', 'error')
    return
  }
  loading.value = true
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to create student`)
    const data = await res.json()
    resultData.value = data
    rawResponse.value = JSON.stringify(data, null, 2)
    showStatus(`Student "${data.name}" created successfully with ID: ${data.id}`, 'success')
    inputText.value = ''
  } catch (err) {
    showStatus(err.message || 'Error creating student', 'error')
  } finally {
    loading.value = false
  }
}

// 2. GET ALL STUDENTS (GET)
const handleGetAll = async () => {
  loading.value = true
  try {
    const res = await fetch(API_BASE)
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch students`)
    const data = await res.json()
    resultData.value = data
    rawResponse.value = JSON.stringify(data, null, 2)
    showStatus(`Retrieved ${data.length} students successfully.`, 'success')
  } catch (err) {
    showStatus(err.message || 'Error fetching students', 'error')
  } finally {
    loading.value = false
  }
}

// 3. GET BY ID (GET /{id})
const handleGetById = async () => {
  let id = inputText.value.trim()
  if (id.includes(',')) {
    id = id.split(',')[0].trim()
  }
  if (!id) {
    showStatus('Please enter student ID in the input box to search.', 'error')
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}: Student not found with ID ${id}`)
    const text = await res.text()
    if (!text) {
      showStatus(`No student found with ID ${id}`, 'error')
      resultData.value = null
      rawResponse.value = 'null'
      return
    }
    const data = JSON.parse(text)
    resultData.value = data
    rawResponse.value = JSON.stringify(data, null, 2)
    showStatus(`Student "${data.name}" retrieved successfully!`, 'success')
  } catch (err) {
    showStatus(err.message || 'Error fetching student by ID', 'error')
  } finally {
    loading.value = false
  }
}

// 4. UPDATE STUDENT (PUT /{id})
const handleUpdate = async () => {
  const raw = inputText.value.trim()
  if (!raw) {
    showStatus('Format: Enter "ID, New Name" to update. Example: 670..., Alice Updated', 'error')
    return
  }

  let id = ''
  let newName = ''

  if (raw.includes(',')) {
    const parts = raw.split(',')
    id = parts[0].trim()
    newName = parts.slice(1).join(',').trim()
  } else {
    // If only ID or only name was provided
    showStatus('Please provide both ID and New Name separated by comma (e.g. 1, John Doe)', 'error')
    return
  }

  if (!id || !newName) {
    showStatus('Please provide both ID and New Name separated by comma (e.g. 1, John Doe)', 'error')
    return
  }

  loading.value = true
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update student`)
    const text = await res.text()
    if (!text) {
      showStatus(`Student with ID ${id} not found to update`, 'error')
      return
    }
    const data = JSON.parse(text)
    resultData.value = data
    rawResponse.value = JSON.stringify(data, null, 2)
    showStatus(`Student ID ${id} updated to "${data.name}"!`, 'success')
  } catch (err) {
    showStatus(err.message || 'Error updating student', 'error')
  } finally {
    loading.value = false
  }
}

// 5. DELETE STUDENT (DELETE /{id})
const handleDelete = async () => {
  let id = inputText.value.trim()
  if (id.includes(',')) {
    id = id.split(',')[0].trim()
  }
  if (!id) {
    showStatus('Please enter student ID in the input box to delete.', 'error')
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to delete student`)
    const msg = await res.text()
    resultData.value = null
    rawResponse.value = msg || 'Deleted successfully'
    showStatus(msg || `Student with ID ${id} deleted successfully.`, 'success')
    inputText.value = ''
  } catch (err) {
    showStatus(err.message || 'Error deleting student', 'error')
  } finally {
    loading.value = false
  }
}

const quickFill = (id) => {
  inputText.value = id
}

const selectStudent = (student) => {
  inputText.value = `${student.id}, ${student.name}`
  showStatus(`Loaded "${student.name}" into input for update or delete!`, 'info')
}
</script>

<template>
  <div class="app-layout">
    <div class="card">
      <header class="header">
        <span class="badge">Student Directory</span>
        <h1>Fullstack CRUD App</h1>
        <p class="subtitle">Vue 3 Frontend connected to Spring Boot Backend</p>
      </header>

      <!-- Notification Alert -->
      <transition name="slide-fade">
        <div v-if="statusMessage" :class="['alert', alertType]" id="status-alert">
          <span class="alert-icon">{{ alertType === 'success' ? '✓' : alertType === 'error' ? '!' : 'ℹ' }}</span>
          <span class="alert-text">{{ statusMessage }}</span>
        </div>
      </transition>

      <!-- The Single Input Box -->
      <div class="input-card">
        <label for="crud-input" class="label">Single Input Box</label>
        <div class="input-wrapper">
          <input
            id="crud-input"
            v-model="inputText"
            type="text"
            placeholder="Enter Student Name (to Create) or ID (for Get/Delete) or ID, New Name (for Update)"
            @keyup.enter="handleCreate"
          />
          <button v-if="inputText" class="clear-btn" @click="inputText = ''" title="Clear input">✕</button>
        </div>
        <div class="hint-pills">
          <span class="hint-pill"><strong>Create:</strong> Name</span>
          <span class="hint-pill"><strong>Get by ID / Delete:</strong> ID</span>
          <span class="hint-pill"><strong>Update:</strong> ID, New Name</span>
        </div>
      </div>

      <!-- Five Action Buttons -->
      <div class="actions-grid">
        <button id="btn-create" class="btn btn-create" @click="handleCreate" :disabled="loading">
          <span class="icon">+</span> Create
        </button>
        <button id="btn-get-all" class="btn btn-getall" @click="handleGetAll" :disabled="loading">
          <span class="icon">☰</span> Get All
        </button>
        <button id="btn-get-by-id" class="btn btn-getid" @click="handleGetById" :disabled="loading">
          <span class="icon">🔍</span> Get By ID
        </button>
        <button id="btn-update" class="btn btn-update" @click="handleUpdate" :disabled="loading">
          <span class="icon">✎</span> Update
        </button>
        <button id="btn-delete" class="btn btn-delete" @click="handleDelete" :disabled="loading">
          <span class="icon">🗑</span> Delete
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loader-wrap">
        <div class="spinner"></div>
        <span>Processing request...</span>
      </div>

      <!-- Results Display -->
      <section class="results-container" id="results-panel">
        <div class="results-bar">
          <h3>API Results</h3>
          <span v-if="Array.isArray(resultData)" class="count-tag">{{ resultData.length }} Students</span>
        </div>

        <!-- Student List when Get All is clicked -->
        <div v-if="Array.isArray(resultData)" class="student-list">
          <div v-if="resultData.length === 0" class="empty-box">
            No students found in the database. Type a name and click <strong>Create</strong>!
          </div>
          <div
            v-for="s in resultData"
            :key="s.id"
            class="student-card"
            @click="selectStudent(s)"
            title="Click to load into input"
          >
            <div class="avatar">{{ (s.name || 'S')[0].toUpperCase() }}</div>
            <div class="details">
              <h4>{{ s.name || 'Unnamed' }}</h4>
              <p>ID: <code>{{ s.id }}</code></p>
            </div>
            <button class="fill-btn" @click.stop="quickFill(s.id)">Use ID</button>
          </div>
        </div>

        <!-- Single Student Card -->
        <div v-else-if="resultData && typeof resultData === 'object'" class="single-card">
          <div class="avatar">{{ (resultData.name || 'S')[0].toUpperCase() }}</div>
          <div class="details">
            <h4>{{ resultData.name }}</h4>
            <p>ID: <code>{{ resultData.id }}</code></p>
          </div>
        </div>

        <!-- Raw response for delete message or other -->
        <div v-else-if="rawResponse" class="message-card">
          <p>{{ rawResponse }}</p>
        </div>

        <div v-else-if="!loading" class="empty-box">
          Click any of the 5 buttons above to execute CRUD operations against the Spring Boot backend.
        </div>
      </section>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
  --surface: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.1);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --accent-green: #10b981;
  --accent-blue: #3b82f6;
  --accent-amber: #f59e0b;
  --accent-red: #ef4444;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg-gradient);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.app-layout {
  width: 100%;
  max-width: 680px;
}

.card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(79, 70, 229, 0.2);
  border: 1px solid rgba(79, 70, 229, 0.4);
  color: #a5b4fc;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.header h1 {
  font-size: 1.85rem;
  font-weight: 700;
  background: linear-gradient(to right, #ffffff, #c7d2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 4px;
}

/* Alert */
.alert {
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.alert.success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
}

.alert.error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.alert.info {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #93c5fd;
}

.alert-icon {
  font-weight: 700;
}

/* Input Card */
.input-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 14px 44px 14px 16px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
}

.input-wrapper input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.25);
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
}

.hint-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.hint-pill {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.04);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.hint-pill strong {
  color: #c7d2fe;
}

/* Actions Grid (5 buttons) */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 10px;
  margin-bottom: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 14px;
  font-size: 0.88rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.3);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-create {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.btn-getall {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.btn-getid {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

.btn-update {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.btn-delete {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

/* Loader */
.loader-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  color: #a5b4fc;
  font-size: 0.9rem;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(165, 180, 252, 0.3);
  border-top-color: #a5b4fc;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Results */
.results-container {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  max-height: 380px;
  overflow-y: auto;
}

.results-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.results-bar h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e2e8f0;
}

.count-tag {
  background: rgba(79, 70, 229, 0.2);
  border: 1px solid rgba(79, 70, 229, 0.4);
  color: #a5b4fc;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 600;
}

.student-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.student-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.student-card:hover {
  background: rgba(51, 65, 85, 0.7);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateX(4px);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.details {
  flex-grow: 1;
}

.details h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #f1f5f9;
}

.details p {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.details code {
  color: #a5b4fc;
  font-family: monospace;
}

.fill-btn {
  padding: 4px 10px;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #cbd5e1;
  cursor: pointer;
}

.fill-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.single-card,
.message-card {
  padding: 16px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.empty-box {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  padding: 24px;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.25s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
