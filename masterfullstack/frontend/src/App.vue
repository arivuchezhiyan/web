<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from './stores/studentStore'

const store = useStudentStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="center-container">
    <div class="box">
      <!-- Master Navigation Bar -->
      <nav class="main-nav">
        <router-link to="/" class="nav-item" exact-active-class="active">Home</router-link>
        <router-link to="/directory" class="nav-item" active-class="active">Directory</router-link>
        <router-link to="/about" class="nav-item" active-class="active">About</router-link>
        <router-link to="/contact-us" class="nav-item" active-class="active">Contact Us</router-link>
      </nav>

      <!-- Main Dynamic Content -->
      <div class="view-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.box {
  width: 100%;
  max-width: 650px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-nav {
  display: flex;
  justify-content: space-around;
  background: #f3f4f6;
  padding: 6px;
  border-radius: 6px;
}

.nav-item {
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.nav-item:hover {
  color: #111827;
}

.nav-item.active {
  background: #2563eb;
  color: #ffffff;
}

.view-content {
  min-height: 380px;
}
</style>
