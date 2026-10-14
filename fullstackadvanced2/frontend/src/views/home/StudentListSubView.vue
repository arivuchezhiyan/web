<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '../../stores/studentStore'

const store = useStudentStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="subview">
    <div class="list-header">
      <span>Student Records ({{ store.students.length }})</span>
      <button class="refresh-btn" @click="store.fetchAll()">↻ Refresh</button>
    </div>

    <div class="table-wrap">
      <div v-if="store.students.length === 0" class="empty-state">
        No students found in database. Go to <strong>Form</strong> tab to create one.
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
            title="Click to select"
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
.subview {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.refresh-btn {
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.table-wrap {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  max-height: 250px;
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
  cursor: pointer;
}

.btn-del {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.empty-state {
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}
</style>
