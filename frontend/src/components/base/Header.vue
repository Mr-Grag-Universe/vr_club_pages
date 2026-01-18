<script setup lang="ts">
    import SocialLinks from './SocialLinks.vue'
</script>

<template>
  <header class="header">
    <div class="header-glitch"></div>
    
    <nav class="nav">
      <div class="nav-left">
        <a href="/" class="logo glitch" data-text="VR ARENA">
          VR ARENA
        </a>
        
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="#games" class="nav-link">Игры</a>
          </li>
          <li class="nav-item">
            <a href="#arena" class="nav-link">Арена</a>
          </li>
          <li class="nav-item">
            <a href="#gallery" class="nav-link">Галерея</a>
          </li>
          <li class="nav-item">
            <a href="#faq" class="nav-link">FAQ</a>
          </li>
        </ul>
      </div>
      
      <div class="nav-right">
        <SocialLinks />
        
        <div class="cta-wrapper">
            <button class="cta-button pulse">
                <span class="cta-text">Забронировать</span>
            </button>
            <div class="cta-glow"></div>
        </div>
        
        <div class="header-phone">
          <a href="tel:+79028877457" class="phone-link">+7 (902) 887-74-57</a>
        </div>
      </div>
    </nav>
    
    <div class="scanline"></div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(13, 6, 67, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(173, 240, 98, 0.2);
  padding: 1rem 0;
}

.header-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  animation: glitch-line 3s infinite;
}

@keyframes glitch-line {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--text-primary);
  text-decoration: none;
  position: relative;
  letter-spacing: 1px;
}

.logo.glitch::before,
.logo.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.logo.glitch::before {
  animation: glitch-1 0.5s infinite;
  color: var(--accent);
  z-index: -1;
}

.logo.glitch::after {
  animation: glitch-2 0.5s infinite;
  color: var(--glow);
  z-index: -2;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  color: var(--accent);
  text-shadow: 0 0 10px var(--glow);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.cta-wrapper {
  position: relative;
  padding: 15px 0; /* Даёт место свечению */
  margin: -15px 0; /* Компенсирует layout */
  z-index: 1;
}

.cta-button {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 30px;
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg, var(--accent) 0%, var(--glow) 100%);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px var(--glow);
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 100%;
  background: radial-gradient(rectangle, rgba(173, 240, 98, 0.3) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1; /* Свет сзади */
  pointer-events: none;
}

.cta-wrapper:hover .cta-glow {
  opacity: 1;
}

.cta-button:hover .cta-glow {
  opacity: 1;
}

.header-phone {
  position: relative;
  border-left: 1px solid rgba(173, 240, 98, 0.2);
  padding-left: 1.5rem;
  z-index: 2;
}

/* Добавьте псевдоэлемент для подсветки */
.header-phone::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130%;
  height: 130%;
  background: radial-gradient(circle, rgba(173, 240, 98, 0.2) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
  pointer-events: none;
}

.header-phone:hover::before {
  opacity: 1;
}

.phone-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: color 0.3s, transform 0.3s; /* ← добавлен transform */
  display: inline-block; /* ← нужно для transform */
}

.phone-link:hover {
  /* color: var(--glow); */
  transform: translateY(-2px); /* ← приподнимание */
}

.scanline {
  /* Замените существующие свойства на: */
  animation: scan-h 8s linear infinite;
  opacity: 0.4;
  filter: blur(1px);
}

@keyframes scan-h {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (max-width: 1024px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-left {
    width: 100%;
    justify-content: space-between;
  }
  
  .nav-menu {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.75rem 0;
  }
  
  .nav {
    padding: 0 1rem;
  }
  
  .nav-left {
    gap: 1rem;
  }
  
  .logo {
    font-size: 1.4rem;
  }
  
  .nav-menu {
    display: none;
  }
  
  .nav-right {
    gap: 1rem;
  }
  
  .social-links {
    gap: 0.5rem;
  }
  
  .soc-link {
    width: 28px;
    height: 28px;
  }
  
  .cta-button {
    padding: 0.6rem 1.5rem;
  }
  
  .header-phone {
    display: none;
  }
}
</style>