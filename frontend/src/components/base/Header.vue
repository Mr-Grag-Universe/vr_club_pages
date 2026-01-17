<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">VR ARENA</div>
      <div class="nav-links">
        <a href="#games">Игры</a>
        <a href="#gallery">Галерея</a>
        <a href="#faq">FAQ</a>
        <button class="cta">Забронировать</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--accent);
}

.cta {
  padding: 0.5rem 1.5rem;
  background: var(--accent);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.cta:hover {
  background: var(--accent-hover);
}
</style>