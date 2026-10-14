<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '../stores/studentStore'

const store = useStudentStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="view-content">
    <h2>Student Management Dashboard</h2>
    <p class="desc">Powered by Pinia Store & Spring Boot REST API</p>

    <!-- Multiple Inputs -->
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

    <!-- Records Table -->
    <div class="table-wrap">
      <div v-if="store.students.length === 0" class="empty-state">
        No students found. Enter data and click Create.
      </div>
      <table v-else>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Dept</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in store.students"
            :key="s.id"
            :class="{ active: s.id === store.currentStudent.id }"
            @click="store.select(s)"
            title="Click to load into form"
          >
            <td><code>{{ s.id }}</code></td>
            <td><strong>{{ s.name }}</strong></td>
            <td>{{ s.email || '-' }}</td>
            <td>{{ s.age || '-' }}</td>
            <td>{{ s.department || '-' }}</td>
            <td>{{ s.address || '-' }}</td>
            <td>
              <button class="tbl-btn" @click.stop="store.select(s)">Select</button>
              <button class="tbl-btn btn-del" @click.stop="store.remove(s.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.view-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

h2 {
  margin: 0;
  font-size: 19px;
  color: #111827;
  text-align: center;
}

.desc {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
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

.table-wrap {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  max-height: 220px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
}

th {
  background: #f9fafb;
  padding: 8px 10px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
  position: sticky;
  top: 0;
}

td {
  padding: 8px 10px;
  border-bottom: 1px solid #f3f4f6;
}

tr:hover {
  background: #f9fafb;
  cursor: pointer;
}

tr.active {
  background: #eff6ff;
}

code {
  color: #2563eb;
  font-family: monospace;
}

.tbl-btn {
  padding: 2px 6px;
  font-size: 11px;
  border: 1px solid #d1d5db;
  border-radius: 3px;
  margin-right: 4px;
}

.btn-del {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.empty-state {
  padding: 16px;
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}
</style>
