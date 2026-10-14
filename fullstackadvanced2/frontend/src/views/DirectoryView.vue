<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStudentStore } from '../stores/studentStore'

const store = useStudentStore()
const searchQuery = ref('')

onMounted(() => {
  store.fetchAll()
})

const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) return store.students
  const q = searchQuery.value.toLowerCase()
  return store.students.filter(
    (s) =>
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.department && s.department.toLowerCase().includes(q)) ||
      (s.email && s.email.toLowerCase().includes(q)) ||
      (s.id && s.id.toLowerCase().includes(q))
  )
})
</script>

<template>
  <div class="view-content">
    <h2>Student Directory</h2>
    <p class="desc">Global Search & Directory powered by Pinia Store</p>

    <!-- Search Input -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by Name, Department, Email, or ID..."
      />
    </div>

    <!-- Student Cards -->
    <div class="directory-list">
      <div v-if="filteredStudents.length === 0" class="empty-state">
        No students match your query.
      </div>
      <div v-for="s in filteredStudents" :key="s.id" class="directory-card">
        <div class="card-header">
          <strong>{{ s.name }}</strong>
          <span class="badge">{{ s.department || 'General' }}</span>
        </div>
        <div class="card-body">
          <p><strong>ID:</strong> <code>{{ s.id }}</code></p>
          <p><strong>Email:</strong> {{ s.email || 'N/A' }}</p>
          <p><strong>Age:</strong> {{ s.age || 'N/A' }}</p>
          <p><strong>Address:</strong> {{ s.address || 'N/A' }}</p>
        </div>
      </div>
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

.search-box input {
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
}

.search-box input:focus {
  border-color: #2563eb;
}

.directory-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 250px;
  overflow-y: auto;
}

.directory-card {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 14px;
  background: #f9fafb;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 14px;
}

.badge {
  font-size: 11px;
  padding: 2px 8px;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  border-radius: 9999px;
}

.card-body p {
  margin: 3px 0;
  font-size: 12px;
  color: #4b5563;
}

code {
  color: #2563eb;
  font-family: monospace;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  font-size: 13px;
  padding: 16px;
}
</style>
