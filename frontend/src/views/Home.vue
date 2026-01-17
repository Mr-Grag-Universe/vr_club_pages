<script setup lang="ts">
import BaseLayout from '@/components/base/BaseLayout.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FAQ from '@/components/home/FAQ.vue'
import GamesGrid from '@/components/home/GamesGrid.vue'
import Gallery from '@/components/home/Gallery.vue'
import BookingWidget from '@/components/home/BookingWidget.vue'
import StatsCounter from '@/components/home/StatsCounter.vue'

// Импортируй остальные секции по мере создания
</script>

<template>
  <BaseLayout title="VR Arena - Погрузись в виртуальную реальность">
    <HeroSection />
    <Gallery />
    <GamesGrid />
    <StatsCounter />
    <BookingWidget />
    <FAQ />
    <!-- Добавляй секции по очереди -->
  </BaseLayout>
</template>