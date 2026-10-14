<template>
  <div class="view-content">
    <h2>About Fullstack System</h2>
    <p class="desc">Architecture & Technology Stack</p>

    <div class="about-grid">
      <div class="about-card">
        <h3>🚀 Vue 3 & Vite</h3>
        <p>Ultra-fast reactive frontend using modern Composition API and Vite bundler.</p>
      </div>

      <div class="about-card">
        <h3>🍍 Pinia State Store</h3>
        <p>Lightweight and intuitive store managing global student records and API communications.</p>
      </div>

      <div class="about-card">
        <h3>🧭 Vue Router 4</h3>
        <p>Seamless SPA client-side routing for Home, Directory, About, and Contact Us views.</p>
      </div>

      <div class="about-card">
        <h3>🍃 Spring Boot 4 & MongoDB</h3>
        <p>Robust Java backend with Spring Data MongoDB repository, REST endpoints, and automated tests.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

h2 {
  margin: 0;
  font-size: 19px;
  color: #111827;
  text-align: center;
}

.desc {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 6px;
}

.about-card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
}

.about-card h3 {
  margin: 0 0 6px 0;
  font-size: 14px;
  color: #1f2937;
}

.about-card p {
  margin: 0;
  font-size: 12px;
  color: #4b5563;
  line-height: 1.5;
}
</style>
