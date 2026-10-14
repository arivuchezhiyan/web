<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:8080/api/students'

const inputText = ref('')
const message = ref('')
const students = ref([])
const singleStudent = ref(null)

// 1. Create Student
const handleCreate = async () => {
  const name = inputText.value.trim()
  if (!name) {
    message.value = 'Please enter student name in the input box'
    return
  }
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    if (!res.ok) throw new Error('Failed to create')
    const data = await res.json()
    message.value = `Created student "${data.name}" (ID: ${data.id})`
    inputText.value = ''
    handleGetAll()
  } catch (err) {
    message.value = 'Error: Cannot connect to backend'
  }
}

// 2. Get All Students
const handleGetAll = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    students.value = data
    singleStudent.value = null
    message.value = `Loaded ${data.length} student(s)`
  } catch (err) {
    message.value = 'Error: Cannot connect to backend'
  }
}

// 3. Get Student by ID
const handleGetById = async () => {
  const id = inputText.value.trim().split(',')[0].trim()
  if (!id) {
    message.value = 'Please enter student ID in the input box'
    return
  }
  try {
    const res = await fetch(`${API_URL}/${id}`)
    if (!res.ok) {
      message.value = `Student not found with ID: ${id}`
      return
    }
    const text = await res.text()
    if (!text) {
      message.value = `Student not found with ID: ${id}`
      singleStudent.value = null
      return
    }
    const data = JSON.parse(text)
    singleStudent.value = data
    students.value = []
    message.value = `Found: ${data.name} (ID: ${data.id})`
  } catch (err) {
    message.value = 'Error: Cannot connect to backend'
  }
}

// 4. Update Student
const handleUpdate = async () => {
  const parts = inputText.value.split(',')
  if (parts.length < 2) {
    message.value = 'Format: ID, New Name (e.g. 101, New Name)'
    return
  }
  const id = parts[0].trim()
  const name = parts.slice(1).join(',').trim()
  if (!id || !name) {
    message.value = 'Format: ID, New Name'
    return
  }
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    if (!res.ok) throw new Error('Failed to update')
    const data = await res.json()
    message.value = `Updated student ID ${id} to "${data.name}"`
    handleGetAll()
  } catch (err) {
    message.value = 'Error: Cannot connect to backend'
  }
}

// 5. Delete Student
const handleDelete = async () => {
  const id = inputText.value.trim().split(',')[0].trim()
  if (!id) {
    message.value = 'Please enter student ID in the input box'
    return
  }
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    const text = await res.text()
    message.value = text || `Deleted student ID: ${id}`
    inputText.value = ''
    handleGetAll()
  } catch (err) {
    message.value = 'Error: Cannot connect to backend'
  }
}

const populateInput = (s) => {
  inputText.value = `${s.id}, ${s.name}`
}

onMounted(() => {
  handleGetAll()
})
</script>

<template>
  <div class="box">
    <h2>Student Management</h2>

    <!-- Single Input Box -->
    <input
      id="crud-input"
      v-model="inputText"
      type="text"
      placeholder="Enter Name or ID (or: id, new_name)"
    />

    <!-- Five Buttons -->
    <div class="button-row">
      <button id="btn-create" @click="handleCreate">Create</button>
      <button id="btn-get-all" @click="handleGetAll">Get All</button>
      <button id="btn-get-by-id" @click="handleGetById">Get By ID</button>
      <button id="btn-update" @click="handleUpdate">Update</button>
      <button id="btn-delete" @click="handleDelete">Delete</button>
    </div>

    <!-- Message / Status -->
    <div v-if="message" class="status-msg">
      {{ message }}
    </div>

    <!-- Result Display -->
    <div class="results">
      <div v-if="singleStudent" class="item">
        <strong>ID:</strong> {{ singleStudent.id }} | <strong>Name:</strong> {{ singleStudent.name }}
      </div>

      <div v-else-if="students.length > 0">
        <div
          v-for="s in students"
          :key="s.id"
          class="item"
          @click="populateInput(s)"
          title="Click to copy into input"
        >
          <strong>ID:</strong> {{ s.id }} | <strong>Name:</strong> {{ s.name }}
        </div>
      </div>

      <div v-else class="empty-note">
        No students found. Type a name and click <strong>Create</strong>.
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 480px;
  max-width: 90vw;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  margin: 0;
  text-align: center;
  font-size: 20px;
  color: #111827;
}

input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

input:focus {
  border-color: #3b82f6;
}

.button-row {
  display: flex;
  gap: 8px;
}

button {
  flex: 1;
  padding: 9px 0;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #f3f4f6;
  font-weight: 500;
}

button:hover {
  background: #e5e7eb;
}

.status-msg {
  padding: 8px 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  font-size: 13px;
  border-radius: 4px;
}

.results {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  max-height: 220px;
  overflow-y: auto;
  padding: 8px;
}

.item {
  padding: 8px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 13px;
  cursor: pointer;
}

.item:last-child {
  border-bottom: none;
}

.item:hover {
  background: #f9fafb;
}

.empty-note {
  text-align: center;
  color: #6b7280;
  font-size: 13px;
  padding: 12px;
}
</style>
