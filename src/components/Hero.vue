<template>
  <section class="hero" ref="heroSection">
    <div class="hero-bg">
      <div class="stripe" v-for="n in 8" :key="n"></div>
      <div class="circles">
        <div class="circle" v-for="n in 3" :key="n"></div>
      </div>
    </div>
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="text-animate">IMPACTFUL COLLABORATION</span>
      </h1>
      <p class="hero-description">
        Outcome driven consulting services for digital projects
      </p>
      <a href="#contact-us" class="cta-button">
        Let's talk
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const heroSection = ref(null);

</script>

<style scoped lang="scss">
.hero {
  height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #0f172a;
  overflow: hidden;
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.stripe {
  position: absolute;
  width: 120%;
  height: 180px;
  background: linear-gradient(90deg, 
    rgba(56, 189, 248, 0.02) 0%,
    rgba(56, 189, 248, 0.15) 50%,
    rgba(56, 189, 248, 0.02) 100%
  );
  transform: rotate(-35deg);
  transition: transform 0.3s ease;

  @for $i from 1 through 8 {
    &:nth-child(#{$i}) {
      top: #{($i - 1) * 15}vh;
      height: #{120 + random(100)}px;
      opacity: #{0.15 + random(5) * 0.03};
      animation: stripeFloat #{8 + $i * 0.5}s ease-in-out infinite;
      animation-delay: #{$i * -0.7}s;
      
      @if $i % 2 == 0 {
        animation-direction: reverse;
      }
    }
  }
}

.circles {
  position: absolute;
  inset: 0;
  filter: blur(60px);
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;

  &:nth-child(1) {
    width: 400px;
    height: 400px;
    background: rgba(56, 189, 248, 0.15);
    top: -100px;
    right: -100px;
    animation: float 15s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: rgba(14, 165, 233, 0.15);
    bottom: -50px;
    left: -50px;
    animation: float 12s ease-in-out infinite reverse;
  }

  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: rgba(2, 132, 199, 0.15);
    top: 40%;
    left: 60%;
    animation: float 10s ease-in-out infinite;
    animation-delay: -5s;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  text-align: center;
  padding: 2rem;
}

.hero-title {
  font-size: var(--go-size-6);
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: #f8fafc;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  .text-animate {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards;
    background: linear-gradient(90deg, #f8fafc, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 100%;
    animation: fadeInUp 0.8s ease forwards, gradientMove 3s ease infinite;
  }
}

.hero-description {
  font-size: 1.25rem;
  text-wrap: balance;
  color: #94a3b8;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards 0.3s;
}

.cta-button {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-round);
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards 0.6s;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: white;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  .icon {
    width: 1.25em;
    height: 1.25em;
    transition: transform 0.3s ease;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      transparent 20%,
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.1) 60%,
      transparent 80%
    );
    transform: translateX(-100%) skewX(-25deg);
    transition: transform 0.75s ease;
  }

  &::after {
    background: linear-gradient(135deg,
      rgba(56, 189, 248, 0) 20%,
      rgba(56, 189, 248, 0.1) 40%,
      rgba(56, 189, 248, 0.2) 50%,
      rgba(56, 189, 248, 0.1) 60%,
      rgba(56, 189, 248, 0) 80%
    );
    transform: translateX(100%) skewX(-25deg);
    transition-delay: 0.2s;
  }

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3),
                0 0 0 2px rgba(56, 189, 248, 0.2);
    
    &::before {
      transform: translateX(100%) skewX(-25deg);
    }
    
    &::after {
      transform: translateX(-100%) skewX(-25deg);
    }
    .icon {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2),
                0 0 0 3px rgba(56, 189, 248, 0.3);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -30px);
  }
}

@keyframes stripeFloat {
  0%, 100% {
    transform: rotate(-35deg) translateY(0);
  }
  50% {
    transform: rotate(-35deg) translateY(-#{random(40) + 20}px);
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media screen and (max-width: 768px) {
  .hero-content {
    padding: 1.5rem;
  }

  .hero-title {
    font-size: var(--go-size-5);
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }

  .cta-button {
    padding: 1rem 1.75rem;
    font-size: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .hero-content {
    padding: 1rem;
  }

  .hero-title {
    font-size: var(--go-size-3);
    letter-spacing: 0.03em;
  }

  .hero-description {
    font-size: 0.875rem;
    padding: 0 0.5rem;
    margin-bottom: 1.5rem;
  }

  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
  }
}
</style>