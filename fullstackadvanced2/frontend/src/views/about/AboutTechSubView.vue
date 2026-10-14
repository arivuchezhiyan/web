<template>
  <div class="tech-grid">
    <div class="card">
      <h3>🚀 Vue 3 & Vite</h3>
      <p>Modern frontend framework utilizing Composition API and setup scripts.</p>
    </div>
    <div class="card">
      <h3>🍍 Pinia Store</h3>
      <p>Centralized state management handling students, form state, and API requests.</p>
    </div>
    <div class="card">
      <h3>🧭 Vue Router 4</h3>
      <p>Supports top-level page routing and multi-level nested child routes.</p>
    </div>
    <div class="card">
      <h3>🍃 Spring Boot 4 & MongoDB</h3>
      <p>Non-blocking REST API backend with document database persistence and test suite.</p>
    </div>
  </div>
</template>

<style scoped>
.tech-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.card {
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
}

h3 {
  margin: 0 0 4px 0;
  font-size: 13px;
  color: #1f2937;
}

p {
  margin: 0;
  font-size: 12px;
  color: #4b5563;
  line-height: 1.5;
}
</style>
