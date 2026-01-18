<script setup lang="ts">
import BaseLayout from '@/components/base/BaseLayout.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FAQ from '@/components/home/FAQ.vue'
import GamesGrid from '@/components/home/GamesGrid.vue'
import Gallery from '@/components/home/Gallery.vue'
import BookingWidget from '@/components/home/BookingWidget.vue'
import StatsCounter from '@/components/home/StatsCounter.vue'
import Location from '@/components/home/Location.vue'
</script>

<template>
  <BaseLayout title="VR Arena - Погрузись в виртуальную реальность">
    <HeroSection />
    <Gallery />
    <GamesGrid />
    <StatsCounter />
    <Location />
    <BookingWidget />
    <FAQ />
    <!-- Добавляй секции по очереди -->
  </BaseLayout>
</template>