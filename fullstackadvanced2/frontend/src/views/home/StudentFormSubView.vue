<script setup>
import { useStudentStore } from '../../stores/studentStore'

const store = useStudentStore()
</script>

<template>
  <div class="subview">
    <div class="form-grid">
      <div class="field">
        <label>ID</label>
        <input v-model="store.currentStudent.id" placeholder="Student ID (for search/update/delete)" />
      </div>
      <div class="field">
        <label>Name</label>
        <input v-model="store.currentStudent.name" placeholder="Student Name" />
      </div>
      <div class="field">
        <label>Email</label>
        <input v-model="store.currentStudent.email" placeholder="Email Address" type="email" />
      </div>
      <div class="field">
        <label>Age</label>
        <input v-model="store.currentStudent.age" placeholder="Age" type="number" />
      </div>
      <div class="field">
        <label>Department</label>
        <input v-model="store.currentStudent.department" placeholder="Department" />
      </div>
      <div class="field">
        <label>Address</label>
        <input v-model="store.currentStudent.address" placeholder="Residential Address" />
      </div>
    </div>

    <!-- 5 CRUD Buttons -->
    <div class="button-row">
      <button @click="store.create(store.currentStudent)" :disabled="store.loading">Create</button>
      <button @click="store.fetchAll()" :disabled="store.loading">Get All</button>
      <button @click="store.fetchById(store.currentStudent.id)" :disabled="store.loading">Get By ID</button>
      <button @click="store.update(store.currentStudent)" :disabled="store.loading">Update</button>
      <button @click="store.remove(store.currentStudent.id)" :disabled="store.loading">Delete</button>
      <button class="btn-clear" @click="store.clear()">Clear</button>
    </div>

    <!-- Status Message -->
    <div v-if="store.message" class="status-msg">
      {{ store.message }}
    </div>
  </div>
</template>

<style scoped>
.subview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.field {
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

.btn-clear {
  flex: 0.6;
  background: #fff;
  color: #6b7280;
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
