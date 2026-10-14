<template>
  <div class="about-box">
    <div class="top-info">
      <h2>About Master Fullstack</h2>
      <p class="subtitle">Complete Architectural Overview</p>
    </div>

    <!-- Nested Navigation for About -->
    <nav class="nested-nav">
      <router-link to="/about" class="tab-link" exact-active-class="active">⚙️ Core Architecture</router-link>
      <router-link to="/about/api" class="tab-link" active-class="active">🔌 REST Endpoints</router-link>
    </nav>

    <!-- Nested Router View -->
    <router-view />
  </div>
</template>

<style scoped>
.about-box {
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
  padding: 6px 14px;
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
</style>
