<template>
  <div class="tech-grid">
    <div class="tech-item">
      <div class="badge">Vue 3</div>
      <p>Modern frontend powered by Composition API, Vite build tool, reactive states, and Single File Components.</p>
    </div>
    <div class="tech-item">
      <div class="badge">Vue Router 4</div>
      <p>Supports top-level views and nested routes with dynamic outlet rendering using router-view.</p>
    </div>
    <div class="tech-item">
      <div class="badge">Pinia</div>
      <p>Centralized state management store for student records, active selection, messages, and async actions.</p>
    </div>
    <div class="tech-item">
      <div class="badge">Props & Emits</div>
      <p>Strict component communication: parent passes props down and children trigger emits up for state mutations.</p>
    </div>
    <div class="tech-item">
      <div class="badge">Spring Boot 4</div>
      <p>Robust Java backend with Spring Web REST controllers, service layer, and CORS cross-origin configuration.</p>
    </div>
    <div class="tech-item">
      <div class="badge">MongoDB</div>
      <p>NoSQL document persistence with Spring Data MongoRepository storing student profile documents.</p>
    </div>
  </div>
</template>

<style scoped>
.tech-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.tech-item {
  border: 1px solid #e5e7eb;
  padding: 10px;
  border-radius: 6px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.badge {
  font-size: 11px;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 2px 8px;
  border-radius: 4px;
  align-self: flex-start;
}

p {
  margin: 0;
  font-size: 12px;
  color: #4b5563;
  line-height: 1.4;
}
</style>
