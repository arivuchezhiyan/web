<script setup>
import { ref } from 'vue'

const contact = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sent = ref(false)

const handleSubmit = () => {
  if (!contact.value.name || !contact.value.email || !contact.value.message) {
    return
  }
  sent.value = true
  setTimeout(() => {
    contact.value = { name: '', email: '', subject: '', message: '' }
    sent.value = false
  }, 4000)
}
</script>

<template>
  <div class="view-content">
    <h2>Contact Us</h2>
    <p class="desc">Have questions or feedback? Get in touch with our team.</p>

    <div v-if="sent" class="success-banner">
      ✓ Thank you! Your message has been sent successfully.
    </div>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-row">
        <div class="field">
          <label>Your Name</label>
          <input v-model="contact.name" placeholder="John Doe" required />
        </div>
        <div class="field">
          <label>Your Email</label>
          <input v-model="contact.email" type="email" placeholder="john@example.com" required />
        </div>
      </div>

      <div class="field">
        <label>Subject</label>
        <input v-model="contact.subject" placeholder="Inquiry topic" />
      </div>

      <div class="field">
        <label>Message</label>
        <textarea v-model="contact.message" rows="4" placeholder="Write your message here..." required></textarea>
      </div>

      <button type="submit" class="submit-btn">Send Message</button>
    </form>
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

.success-banner {
  padding: 10px;
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
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 4px;
}

.submit-btn:hover {
  background: #1d4ed8;
}
</style>
