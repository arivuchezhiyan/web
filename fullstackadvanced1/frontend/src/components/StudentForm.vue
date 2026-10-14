<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  student: {
    type: Object,
    default: () => ({ id: '', name: '', email: '', age: '', department: '', address: '' })
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'create',
  'get-all',
  'get-by-id',
  'update',
  'delete',
  'clear'
])

const formData = reactive({
  id: '',
  name: '',
  email: '',
  age: '',
  department: '',
  address: ''
})

// Watch for prop changes from parent
watch(
  () => props.student,
  (newVal) => {
    formData.id = newVal?.id || ''
    formData.name = newVal?.name || ''
    formData.email = newVal?.email || ''
    formData.age = newVal?.age !== undefined && newVal?.age !== null ? newVal.age : ''
    formData.department = newVal?.department || ''
    formData.address = newVal?.address || ''
  },
  { immediate: true, deep: true }
)

const handleCreate = () => {
  emit('create', { ...formData })
}

const handleGetAll = () => {
  emit('get-all')
}

const handleGetById = () => {
  emit('get-by-id', formData.id)
}

const handleUpdate = () => {
  emit('update', { ...formData })
}

const handleDelete = () => {
  emit('delete', formData.id)
}

const handleClear = () => {
  formData.id = ''
  formData.name = ''
  formData.email = ''
  formData.age = ''
  formData.department = ''
  formData.address = ''
  emit('clear')
}
</script>

<template>
  <div class="form-container">
    <div class="input-grid">
      <!-- ID Input -->
      <div class="input-field">
        <label for="input-id">Student ID</label>
        <input
          id="input-id"
          v-model="formData.id"
          type="text"
          placeholder="ID (auto on create, or enter for Get/Delete/Update)"
        />
      </div>

      <!-- Name Input -->
      <div class="input-field">
        <label for="input-name">Student Name</label>
        <input
          id="input-name"
          v-model="formData.name"
          type="text"
          placeholder="Enter student name"
        />
      </div>

      <!-- Email Input -->
      <div class="input-field">
        <label for="input-email">Email Address</label>
        <input
          id="input-email"
          v-model="formData.email"
          type="email"
          placeholder="e.g. alice@example.com"
        />
      </div>

      <!-- Age Input -->
      <div class="input-field">
        <label for="input-age">Age</label>
        <input
          id="input-age"
          v-model="formData.age"
          type="number"
          placeholder="e.g. 21"
        />
      </div>

      <!-- Department Input -->
      <div class="input-field">
        <label for="input-dept">Department</label>
        <input
          id="input-dept"
          v-model="formData.department"
          type="text"
          placeholder="e.g. Computer Science"
        />
      </div>

      <!-- Address Input -->
      <div class="input-field">
        <label for="input-address">Address</label>
        <input
          id="input-address"
          v-model="formData.address"
          type="text"
          placeholder="e.g. 123 Tech Lane"
        />
      </div>
    </div>

    <!-- Five Action Buttons -->
    <div class="button-row">
      <button id="btn-create" type="button" @click="handleCreate" :disabled="loading">Create</button>
      <button id="btn-get-all" type="button" @click="handleGetAll" :disabled="loading">Get All</button>
      <button id="btn-get-by-id" type="button" @click="handleGetById" :disabled="loading">Get By ID</button>
      <button id="btn-update" type="button" @click="handleUpdate" :disabled="loading">Update</button>
      <button id="btn-delete" type="button" @click="handleDelete" :disabled="loading">Delete</button>
      <button id="btn-clear" type="button" class="btn-secondary" @click="handleClear">Clear</button>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}

input {
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
}

input:focus {
  border-color: #2563eb;
}

.button-row {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}

button {
  flex: 1;
  padding: 9px 0;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #f9fafb;
}

button:hover:not(:disabled) {
  background: #e5e7eb;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  flex: 0.6;
  background: #fff;
  color: #6b7280;
}
</style>
