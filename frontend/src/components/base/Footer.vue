<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 VR Arena. All rights reserved.</p>
      <div class="social-links">
        <a href="#">VK</a>
        <a href="#">TG</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem;
  background: var(--bg-secondary);
  margin-top: 4rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 1rem;
}
</style>