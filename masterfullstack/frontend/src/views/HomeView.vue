<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '../stores/studentStore'

const store = useStudentStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="home-box">
    <div class="top-info">
      <h2>Student Dashboard</h2>
      <p class="subtitle">Vue Router (Nested Routes) + Pinia Store + Props & Emits</p>
    </div>

    <!-- Nested Sub-Navigation -->
    <nav class="nested-nav">
      <router-link to="/" class="tab-link" exact-active-class="active">📝 CRUD Form</router-link>
      <router-link to="/list" class="tab-link" active-class="active">📋 Student Table</router-link>
      <router-link to="/stats" class="tab-link" active-class="active">📊 Statistics</router-link>
    </nav>

    <!-- Global Message Banner -->
    <div v-if="store.message" class="status-msg">
      {{ store.message }}
    </div>

    <!-- Nested Router View binding Props and Emits with Pinia -->
    <router-view v-slot="{ Component }">
      <component
        :is="Component"
        :student="store.currentStudent"
        :students="store.students"
        :loading="store.loading"
        :selected-id="store.currentStudent.id"
        @create="store.create"
        @update="store.update"
        @delete="store.remove"
        @get-all="store.fetchAll"
        @get-by-id="store.fetchById"
        @select="store.select"
        @clear="store.clear"
      />
    </router-view>
  </div>
</template>

<style scoped>
.home-box {
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

.nested-nav {
  display: flex;
  gap: 8px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 6px;
  justify-content: center;
}

.tab-link {
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.tab-link:hover {
  color: #111827;
}

.tab-link.active {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
