<script setup>
import { ref, onMounted } from 'vue'
import StudentForm from './components/StudentForm.vue'
import StudentList from './components/StudentList.vue'

const API_URL = 'http://localhost:8080/api/students'

const currentStudent = ref({
  id: '',
  name: '',
  email: '',
  age: '',
  department: '',
  address: ''
})

const studentsList = ref([])
const message = ref('')
const loading = ref(false)

const showMessage = (msg) => {
  message.value = msg
}

// 1. Create Student (Called via emit from StudentForm)
const handleCreate = async (studentData) => {
  if (!studentData.name) {
    showMessage('Please enter student name')
    return
  }
  loading.value = true
  try {
    const payload = {
      name: studentData.name,
      email: studentData.email,
      age: studentData.age ? Number(studentData.age) : null,
      department: studentData.department,
      address: studentData.address
    }
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Create failed')
    const data = await res.json()
    showMessage(`Student created: ${data.name} (ID: ${data.id})`)
    currentStudent.value = { ...data }
    await handleGetAll()
  } catch (err) {
    showMessage('Error: Failed to create student')
  } finally {
    loading.value = false
  }
}

// 2. Get All Students (Called via emit from StudentForm)
const handleGetAll = async () => {
  loading.value = true
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Get all failed')
    const data = await res.json()
    studentsList.value = data
    showMessage(`Loaded ${data.length} student record(s)`)
  } catch (err) {
    showMessage('Error: Failed to load students')
  } finally {
    loading.value = false
  }
}

// 3. Get Student by ID (Called via emit from StudentForm)
const handleGetById = async (id) => {
  const cleanId = (id || '').trim()
  if (!cleanId) {
    showMessage('Please enter a Student ID to search')
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/${cleanId}`)
    if (!res.ok) {
      showMessage(`No student found with ID: ${cleanId}`)
      return
    }
    const text = await res.text()
    if (!text) {
      showMessage(`No student found with ID: ${cleanId}`)
      return
    }
    const data = JSON.parse(text)
    currentStudent.value = { ...data }
    showMessage(`Found student: ${data.name} (ID: ${data.id})`)
  } catch (err) {
    showMessage('Error: Failed to fetch student')
  } finally {
    loading.value = false
  }
}

// 4. Update Student (Called via emit from StudentForm)
const handleUpdate = async (studentData) => {
  const cleanId = (studentData.id || '').trim()
  if (!cleanId) {
    showMessage('Please provide or select a Student ID to update')
    return
  }
  loading.value = true
  try {
    const payload = {
      name: studentData.name,
      email: studentData.email,
      age: studentData.age ? Number(studentData.age) : null,
      department: studentData.department,
      address: studentData.address
    }
    const res = await fetch(`${API_URL}/${cleanId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Update failed')
    const data = await res.json()
    showMessage(`Updated student ID: ${cleanId} successfully`)
    currentStudent.value = { ...data }
    await handleGetAll()
  } catch (err) {
    showMessage('Error: Failed to update student')
  } finally {
    loading.value = false
  }
}

// 5. Delete Student (Called via emit from StudentForm or StudentList)
const handleDelete = async (id) => {
  const cleanId = (id || '').trim()
  if (!cleanId) {
    showMessage('Please enter or select a Student ID to delete')
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/${cleanId}`, { method: 'DELETE' })
    const text = await res.text()
    showMessage(text || `Deleted student ID: ${cleanId}`)
    handleClear()
    await handleGetAll()
  } catch (err) {
    showMessage('Error: Failed to delete student')
  } finally {
    loading.value = false
  }
}

const handleClear = () => {
  currentStudent.value = {
    id: '',
    name: '',
    email: '',
    age: '',
    department: '',
    address: ''
  }
}

const handleSelectStudent = (student) => {
  currentStudent.value = { ...student }
  showMessage(`Selected student: ${student.name}`)
}

onMounted(() => {
  handleGetAll()
})
</script>

<template>
  <div class="app-card">
    <h2>Student Management (Advanced)</h2>

    <!-- Child Component 1: Form with Multiple Inputs + 5 Action Buttons (Props & Emits) -->
    <StudentForm
      :student="currentStudent"
      :loading="loading"
      @create="handleCreate"
      @get-all="handleGetAll"
      @get-by-id="handleGetById"
      @update="handleUpdate"
      @delete="handleDelete"
      @clear="handleClear"
    />

    <!-- Status Message -->
    <div v-if="message" class="status-msg">
      {{ message }}
    </div>

    <!-- Child Component 2: Student Table / List (Props & Emits) -->
    <StudentList
      :students="studentsList"
      :selected-id="currentStudent.id"
      @select="handleSelectStudent"
      @quick-delete="handleDelete"
    />
  </div>
</template>

<style scoped>
.app-card {
  width: 640px;
  max-width: 92vw;
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

.status-msg {
  padding: 8px 12px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  font-size: 13px;
  border-radius: 4px;
}
</style>
