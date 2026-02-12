<template>
  <picture class="adaptive-picture">
    <source v-if="avifSrc" :srcset="avifSrc" type="image/avif" />
    <source v-if="webpSrc" :srcset="webpSrc" type="image/webp" />
    <img
      :src="jpgSrc"
      :alt="alt"
      v-bind="$attrs"
      class="adaptive-img"
    />
  </picture>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

defineProps({
  jpgSrc:  { type: String, required: true },
  webpSrc: { type: String, default: '' },
  avifSrc: { type: String, default: '' },
  alt:     { type: String, default: '' }
})
</script>

<style scoped>
.adaptive-picture,
.adaptive-img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>