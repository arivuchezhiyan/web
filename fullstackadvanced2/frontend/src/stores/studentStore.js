import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = 'http://localhost:8080/api/students'

export const useStudentStore = defineStore('student', () => {
  const students = ref([])
  const currentStudent = ref({
    id: '',
    name: '',
    email: '',
    age: '',
    department: '',
    address: ''
  })
  const loading = ref(false)
  const message = ref('')

  const setMessage = (msg) => {
    message.value = msg
  }

  // 1. Fetch all students
  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      students.value = data
      setMessage(`Loaded ${data.length} student(s) from Pinia store`)
    } catch (err) {
      setMessage('Error connecting to backend')
    } finally {
      loading.value = false
    }
  }

  // 2. Fetch student by ID
  const fetchById = async (id) => {
    const cleanId = (id || '').trim()
    if (!cleanId) {
      setMessage('Please enter a student ID')
      return
    }
    loading.value = true
    try {
      const res = await fetch(`${API_URL}/${cleanId}`)
      if (!res.ok) {
        setMessage(`Student not found with ID: ${cleanId}`)
        return
      }
      const text = await res.text()
      if (!text) {
        setMessage(`Student not found with ID: ${cleanId}`)
        return
      }
      const data = JSON.parse(text)
      currentStudent.value = { ...data }
      setMessage(`Found student: ${data.name} (ID: ${data.id})`)
    } catch (err) {
      setMessage('Error fetching student by ID')
    } finally {
      loading.value = false
    }
  }

  // 3. Create student
  const create = async (studentData) => {
    if (!studentData.name) {
      setMessage('Please enter student name')
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
      if (!res.ok) throw new Error('Failed to create')
      const data = await res.json()
      currentStudent.value = { ...data }
      setMessage(`Created student: ${data.name} (ID: ${data.id})`)
      await fetchAll()
    } catch (err) {
      setMessage('Error creating student')
    } finally {
      loading.value = false
    }
  }

  // 4. Update student
  const update = async (studentData) => {
    const cleanId = (studentData.id || '').trim()
    if (!cleanId) {
      setMessage('Please enter or select a Student ID to update')
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
      if (!res.ok) throw new Error('Failed to update')
      const data = await res.json()
      currentStudent.value = { ...data }
      setMessage(`Updated student ID: ${cleanId} successfully`)
      await fetchAll()
    } catch (err) {
      setMessage('Error updating student')
    } finally {
      loading.value = false
    }
  }

  // 5. Delete student
  const remove = async (id) => {
    const cleanId = (id || '').trim()
    if (!cleanId) {
      setMessage('Please enter or select a Student ID to delete')
      return
    }
    loading.value = true
    try {
      const res = await fetch(`${API_URL}/${cleanId}`, { method: 'DELETE' })
      const text = await res.text()
      setMessage(text || `Deleted student ID: ${cleanId}`)
      clear()
      await fetchAll()
    } catch (err) {
      setMessage('Error deleting student')
    } finally {
      loading.value = false
    }
  }

  const select = (student) => {
    currentStudent.value = { ...student }
    setMessage(`Selected student: ${student.name}`)
  }

  const clear = () => {
    currentStudent.value = {
      id: '',
      name: '',
      email: '',
      age: '',
      department: '',
      address: ''
    }
  }

  return {
    students,
    currentStudent,
    loading,
    message,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    select,
    clear
  }
})
