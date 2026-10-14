<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '../stores/studentStore'

const store = useStudentStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="home-container">
    <div class="header">
      <h2>Student Management Dashboard</h2>
      <p class="desc">Vue Router Nested Navigation + Pinia State</p>
    </div>

    <!-- Nested Sub-Navigation Tabs -->
    <nav class="sub-nav">
      <router-link to="/" class="sub-link" exact-active-class="active">📝 Form & Actions</router-link>
      <router-link to="/list" class="sub-link" active-class="active">📋 Records Table</router-link>
      <router-link to="/stats" class="sub-link" active-class="active">📊 Analytics</router-link>
    </nav>

    <!-- Nested Router View for Child Routes -->
    <div class="sub-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.header {
  text-align: center;
}

h2 {
  margin: 0;
  font-size: 19px;
  color: #111827;
}

.desc {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #6b7280;
}

.sub-nav {
  display: flex;
  gap: 8px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 6px;
  justify-content: center;
}

.sub-link {
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.sub-link:hover {
  color: #1f2937;
}

.sub-link.active {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sub-content {
  width: 100%;
}
</style>
