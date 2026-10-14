<template>
  <div class="about-container">
    <div class="header">
      <h2>About Fullstack System</h2>
      <p class="desc">System Overview & REST API Reference</p>
    </div>

    <!-- Nested Sub-Navigation Tabs for About -->
    <nav class="sub-nav">
      <router-link to="/about" class="sub-link" exact-active-class="active">⚙️ Tech Stack</router-link>
      <router-link to="/about/api" class="sub-link" active-class="active">🔌 API Endpoints</router-link>
    </nav>

    <!-- Nested Router View -->
    <div class="sub-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.about-container {
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
  padding: 6px 14px;
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
