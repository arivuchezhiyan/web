<script setup>
const props = defineProps({
  students: {
    type: Array,
    default: () => []
  },
  selectedId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select', 'quick-delete'])

const onSelect = (student) => {
  emit('select', student)
}

const onDelete = (id) => {
  emit('quick-delete', id)
}
</script>

<template>
  <div class="list-container">
    <div v-if="students.length === 0" class="empty-state">
      No students loaded. Click <strong>Get All</strong> or <strong>Create</strong> to populate data.
    </div>

    <div v-else class="table-wrap">
      <table>
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
            v-for="s in students"
            :key="s.id"
            :class="{ active: s.id === selectedId }"
            @click="onSelect(s)"
            title="Click row to populate into form"
          >
            <td><code>{{ s.id }}</code></td>
            <td><strong>{{ s.name || '-' }}</strong></td>
            <td>{{ s.email || '-' }}</td>
            <td>{{ s.age || '-' }}</td>
            <td>{{ s.department || '-' }}</td>
            <td>{{ s.address || '-' }}</td>
            <td>
              <button class="action-btn select-btn" @click.stop="onSelect(s)">Select</button>
              <button class="action-btn delete-btn" @click.stop="onDelete(s.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  margin-top: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  max-height: 250px;
  overflow-y: auto;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
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
  color: #1f2937;
}

tr:hover {
  background: #f9fafb;
  cursor: pointer;
}

tr.active {
  background: #eff6ff;
}

code {
  font-family: monospace;
  color: #2563eb;
}

.action-btn {
  padding: 3px 8px;
  font-size: 11px;
  border-radius: 3px;
  border: 1px solid #d1d5db;
  cursor: pointer;
  margin-right: 4px;
}

.select-btn {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.delete-btn {
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
