<script setup>
import { ref, computed } from 'vue'
import { useStudentStore } from '../stores/studentStore'

const store = useStudentStore()
const searchKeyword = ref('')

const filteredStudents = computed(() => {
  if (!searchKeyword.value.trim()) return store.students
  const kw = searchKeyword.value.toLowerCase()
  return store.students.filter(
    (s) =>
      (s.name && s.name.toLowerCase().includes(kw)) ||
      (s.department && s.department.toLowerCase().includes(kw)) ||
      (s.email && s.email.toLowerCase().includes(kw)) ||
      (s.address && s.address.toLowerCase().includes(kw)) ||
      (s.id && s.id.toLowerCase().includes(kw))
  )
})
</script>

<template>
  <div class="directory-wrap">
    <div class="top-info">
      <h2>Student Directory</h2>
      <p class="subtitle">Global Search powered by Pinia Store</p>
    </div>

    <div class="search-box">
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="Search by ID, name, email, department, or address..."
      />
    </div>

    <div class="stats-counter">
      Showing <strong>{{ filteredStudents.length }}</strong> of <strong>{{ store.students.length }}</strong> registered students
    </div>

    <div class="cards-grid">
      <div v-for="st in filteredStudents" :key="st.id" class="student-card">
        <div class="card-header">
          <div class="badge">{{ st.department || 'General' }}</div>
          <span class="st-id">#{{ st.id.slice(-6) }}</span>
        </div>
        <div class="st-name">{{ st.name }}</div>
        <div class="st-info">📧 {{ st.email || 'N/A' }}</div>
        <div class="st-info">🎂 Age: {{ st.age || 'N/A' }}</div>
        <div class="st-info">📍 {{ st.address || 'N/A' }}</div>
      </div>
      <div v-if="filteredStudents.length === 0" class="empty-state">
        No students match your query.
      </div>
    </div>
  </div>
</template>

<style scoped>
.directory-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.top-info {
  text-align: center;
}

h2 {
  margin: 0;
  font-size: 19px;
  color: #111827;
}

.subtitle {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #6b7280;
}

.search-box input {
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-sizing: border-box;
}

.stats-counter {
  font-size: 12px;
  color: #6b7280;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  max-height: 280px;
  overflow-y: auto;
  padding: 2px;
}

.student-card {
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
  background: #dbeafe;
  padding: 2px 6px;
  border-radius: 4px;
}

.st-id {
  font-size: 11px;
  color: #9ca3af;
  font-family: monospace;
}

.st-name {
  font-weight: 600;
  font-size: 14px;
  color: #111827;
}

.st-info {
  font-size: 12px;
  color: #4b5563;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 20px;
  color: #9ca3af;
  font-size: 13px;
}
</style>
