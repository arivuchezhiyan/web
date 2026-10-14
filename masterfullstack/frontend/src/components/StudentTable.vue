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

const emit = defineEmits(['select', 'delete'])

const handleSelect = (s) => emit('select', s)
const handleDelete = (id) => emit('delete', id)
</script>

<template>
  <div class="table-container">
    <div v-if="students.length === 0" class="empty-state">
      No student records found. Use the <strong>Form</strong> tab to add students.
    </div>

    <div v-else class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in students"
            :key="s.id"
            :class="{ active: s.id === selectedId }"
            @click="handleSelect(s)"
            title="Click to populate form"
          >
            <td><code>{{ s.id }}</code></td>
            <td><strong>{{ s.name }}</strong></td>
            <td>{{ s.email || '-' }}</td>
            <td>{{ s.age || '-' }}</td>
            <td>{{ s.department || '-' }}</td>
            <td>{{ s.address || '-' }}</td>
            <td>
              <button class="tbl-btn btn-sel" @click.stop="handleSelect(s)">Select</button>
              <button class="tbl-btn btn-del" @click.stop="handleDelete(s.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.table-wrap {
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
  color: #374151;
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
  color: #2563eb;
  font-family: monospace;
}

.tbl-btn {
  padding: 3px 8px;
  font-size: 11px;
  border: 1px solid #d1d5db;
  border-radius: 3px;
  margin-right: 4px;
  cursor: pointer;
}

.btn-sel {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.btn-del {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}
</style>
