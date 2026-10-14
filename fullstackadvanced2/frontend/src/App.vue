<template>
  <div class="app-card">
    <nav class="nav-bar">
      <router-link to="/" class="nav-link" active-class="active">Home</router-link>
      <router-link to="/directory" class="nav-link" active-class="active">Directory</router-link>
      <router-link to="/about" class="nav-link" active-class="active">About</router-link>
      <router-link to="/contact-us" class="nav-link" active-class="active">Contact Us</router-link>
    </nav>

    <div class="content-body">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-card {
  width: 650px;
  max-width: 92vw;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 20px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.nav-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
}

.nav-link {
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  padding: 6px 14px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.nav-link:hover {
  color: #2563eb;
  background: #eff6ff;
}

.nav-link.active {
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.content-body {
  width: 100%;
}
</style>
