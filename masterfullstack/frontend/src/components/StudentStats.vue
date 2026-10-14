<script setup>
import { computed } from 'vue'

const props = defineProps({
  students: {
    type: Array,
    default: () => []
  }
})

const departmentStats = computed(() => {
  const map = {}
  props.students.forEach((s) => {
    const d = s.department?.trim() || 'General / Unassigned'
    map[d] = (map[d] || 0) + 1
  })
  return map
})

const averageAge = computed(() => {
  const valid = props.students.filter((s) => s.age && Number(s.age) > 0)
  if (valid.length === 0) return 0
  const sum = valid.reduce((acc, curr) => acc + Number(curr.age), 0)
  return (sum / valid.length).toFixed(1)
})
</script>

<template>
  <div class="stats-wrap">
    <div class="stat-metrics">
      <div class="stat-card">
        <span class="num">{{ students.length }}</span>
        <span class="label">Total Students</span>
      </div>
      <div class="stat-card">
        <span class="num">{{ Object.keys(departmentStats).length }}</span>
        <span class="label">Active Departments</span>
      </div>
      <div class="stat-card">
        <span class="num">{{ averageAge }}</span>
        <span class="label">Average Student Age</span>
      </div>
    </div>

    <div class="dept-box">
      <h4>Students by Department</h4>
      <div v-if="students.length === 0" class="empty">No student data available.</div>
      <div v-for="(cnt, dept) in departmentStats" :key="dept" class="dept-row">
        <span>{{ dept }}</span>
        <span class="badge">{{ cnt }} student(s)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-metrics {
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

.num {
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
}

.label {
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  margin-top: 2px;
}

.dept-box {
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

.dept-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 12px;
  color: #1f2937;
}

.dept-row:last-child {
  border-bottom: none;
}

.badge {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 11px;
}

.empty {
  text-align: center;
  color: #6b7280;
  font-size: 12px;
  padding: 12px;
}
</style>
