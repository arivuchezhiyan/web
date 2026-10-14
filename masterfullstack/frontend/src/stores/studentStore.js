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

  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Fetch failed')
      const data = await res.json()
      students.value = data
      setMessage(`Loaded ${data.length} student(s) from Pinia Store`)
    } catch (err) {
      setMessage('Error connecting to backend')
    } finally {
      loading.value = false
    }
  }

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
      setMessage(`Found: ${data.name} (ID: ${data.id})`)
    } catch (err) {
      setMessage('Error fetching student')
    } finally {
      loading.value = false
    }
  }

  const create = async (payload) => {
    if (!payload.name) {
      setMessage('Please enter student name')
      return
    }
    loading.value = true
    try {
      const body = {
        name: payload.name,
        email: payload.email,
        age: payload.age ? Number(payload.age) : null,
        department: payload.department,
        address: payload.address
      }
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Create failed')
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

  const update = async (payload) => {
    const cleanId = (payload.id || '').trim()
    if (!cleanId) {
      setMessage('Please enter or select a student ID to update')
      return
    }
    loading.value = true
    try {
      const body = {
        name: payload.name,
        email: payload.email,
        age: payload.age ? Number(payload.age) : null,
        department: payload.department,
        address: payload.address
      }
      const res = await fetch(`${API_URL}/${cleanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Update failed')
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

  const remove = async (id) => {
    const cleanId = (id || '').trim()
    if (!cleanId) {
      setMessage('Please enter or select a student ID to delete')
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
