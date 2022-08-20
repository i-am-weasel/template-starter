<script setup lang="ts">
import Hello from '~/components/Hello.vue'
</script>

<template>
  <Suspense>
    <Hello />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
