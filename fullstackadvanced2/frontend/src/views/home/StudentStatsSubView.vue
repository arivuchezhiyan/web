<script setup>
import { computed } from 'vue'
import { useStudentStore } from '../../stores/studentStore'

const store = useStudentStore()

const departmentStats = computed(() => {
  const map = {}
  store.students.forEach((s) => {
    const dept = s.department?.trim() || 'Unassigned'
    map[dept] = (map[dept] || 0) + 1
  })
  return map
})

const averageAge = computed(() => {
  const valid = store.students.filter((s) => s.age && Number(s.age) > 0)
  if (valid.length === 0) return 0
  const sum = valid.reduce((acc, curr) => acc + Number(curr.age), 0)
  return (sum / valid.length).toFixed(1)
})
</script>

<template>
  <div class="subview">
    <div class="stats-overview">
      <div class="stat-card">
        <span class="stat-num">{{ store.students.length }}</span>
        <span class="stat-label">Total Enrolled</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ Object.keys(departmentStats).length }}</span>
        <span class="stat-label">Departments</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ averageAge }}</span>
        <span class="stat-label">Average Age</span>
      </div>
    </div>

    <div class="dept-list">
      <h4>Department Distribution</h4>
      <div v-if="store.students.length === 0" class="empty-state">
        No data available yet.
      </div>
      <div v-for="(count, dept) in departmentStats" :key="dept" class="dept-item">
        <span class="dept-name">{{ dept }}</span>
        <span class="dept-badge">{{ count }} student(s)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subview {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
}

.stat-label {
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  margin-top: 2px;
}

.dept-list {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  background: #fff;
}

h4 {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #374151;
}

.dept-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 12px;
}

.dept-item:last-child {
  border-bottom: none;
}

.dept-name {
  color: #1f2937;
  font-weight: 500;
}

.dept-badge {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 11px;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  font-size: 12px;
  padding: 10px;
}
</style>
