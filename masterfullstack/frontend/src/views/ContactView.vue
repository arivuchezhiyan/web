<script setup>
import { reactive, ref } from 'vue'

const contact = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sent = ref(false)

const handleSubmit = () => {
  if (!contact.name || !contact.email || !contact.message) {
    alert('Please complete the required fields.')
    return
  }
  sent.value = true
  setTimeout(() => {
    contact.name = ''
    contact.email = ''
    contact.subject = ''
    contact.message = ''
    sent.value = false
  }, 3500)
}
</script>

<template>
  <div class="contact-wrap">
    <div class="top-info">
      <h2>Contact Us</h2>
      <p class="subtitle">Have questions or feedback? Send us a message.</p>
    </div>

    <div v-if="sent" class="alert-success">
      Thank you! Your message has been submitted successfully.
    </div>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-row">
        <div class="field">
          <label>Your Name *</label>
          <input v-model="contact.name" placeholder="John Doe" required />
        </div>
        <div class="field">
          <label>Email Address *</label>
          <input v-model="contact.email" type="email" placeholder="john@example.com" required />
        </div>
      </div>

      <div class="field">
        <label>Subject</label>
        <input v-model="contact.subject" placeholder="Topic of enquiry" />
      </div>

      <div class="field">
        <label>Message *</label>
        <textarea v-model="contact.message" rows="3" placeholder="Write your message here..." required></textarea>
      </div>

      <button type="submit" class="submit-btn">Send Message</button>
    </form>
  </div>
</template>

<style scoped>
.contact-wrap {
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

.alert-success {
  padding: 8px 12px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  font-size: 13px;
  border-radius: 4px;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}

input, textarea {
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  font-family: inherit;
}

input:focus, textarea:focus {
  border-color: #2563eb;
}

.submit-btn {
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: #2563eb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.submit-btn:hover {
  background: #1d4ed8;
}
</style>
