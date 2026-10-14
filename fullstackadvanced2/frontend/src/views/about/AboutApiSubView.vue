<template>
  <div class="api-docs">
    <table class="api-table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="method get">GET</span></td>
          <td><code>/api/students</code></td>
          <td>Retrieve all students from MongoDB</td>
        </tr>
        <tr>
          <td><span class="method get">GET</span></td>
          <td><code>/api/students/{id}</code></td>
          <td>Retrieve student by unique ID</td>
        </tr>
        <tr>
          <td><span class="method post">POST</span></td>
          <td><code>/api/students</code></td>
          <td>Create student with name, email, age, dept, address</td>
        </tr>
        <tr>
          <td><span class="method put">PUT</span></td>
          <td><code>/api/students/{id}</code></td>
          <td>Update student profile by ID</td>
        </tr>
        <tr>
          <td><span class="method del">DELETE</span></td>
          <td><code>/api/students/{id}</code></td>
          <td>Delete student record by ID</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.api-docs {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
}

th {
  background: #f9fafb;
  padding: 8px 12px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

td {
  padding: 8px 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #1f2937;
}

tr:last-child td {
  border-bottom: none;
}

code {
  color: #2563eb;
  font-family: monospace;
}

.method {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
}

.method.get {
  background: #eff6ff;
  color: #1d4ed8;
}

.method.post {
  background: #ecfdf5;
  color: #047857;
}

.method.put {
  background: #fffbeb;
  color: #b45309;
}

.method.del {
  background: #fef2f2;
  color: #b91c1c;
}
</style>
