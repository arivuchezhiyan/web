<template>
  <div class="api-wrap">
    <div class="api-card">
      <div class="method-tag post">POST</div>
      <div class="endpoint">/api/students</div>
      <div class="desc">Create a new student with 6 fields: ID, Name, Email, Age, Dept, Address</div>
    </div>
    <div class="api-card">
      <div class="method-tag get">GET</div>
      <div class="endpoint">/api/students</div>
      <div class="desc">Retrieve all registered students from MongoDB</div>
    </div>
    <div class="api-card">
      <div class="method-tag get">GET</div>
      <div class="endpoint">/api/students/{id}</div>
      <div class="desc">Fetch a single student by unique ID</div>
    </div>
    <div class="api-card">
      <div class="method-tag put">PUT</div>
      <div class="endpoint">/api/students/{id}</div>
      <div class="desc">Update an existing student record with new fields</div>
    </div>
    <div class="api-card">
      <div class="method-tag delete">DELETE</div>
      <div class="endpoint">/api/students/{id}</div>
      <div class="desc">Remove a student record from the database</div>
    </div>
  </div>
</template>

<style scoped>
.api-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.api-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.method-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  min-width: 50px;
  text-align: center;
}

.method-tag.get { background: #dbeafe; color: #1e40af; }
.method-tag.post { background: #dcfce7; color: #166534; }
.method-tag.put { background: #fef3c7; color: #92400e; }
.method-tag.delete { background: #fee2e2; color: #991b1b; }

.endpoint {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  min-width: 150px;
}

.desc {
  font-size: 12px;
  color: #4b5563;
  flex: 1;
}
</style>
