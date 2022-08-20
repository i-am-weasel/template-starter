<script setup lang="ts">
import { tryCatch } from '@project-name/shared'

const baseUrl = 'http://localhost:3000/'

interface Props {
  message?: string
}

const data = $ref<Props>({ message: 'No message yet' })

const { data: result, error } = await tryCatch<Props>(async () => {
  const response = await fetch(baseUrl)

  return response.json()
})

data.message = result?.message
</script>

<template>
  <p v-if="error">
    {{ error.message }}
  </p>
  <div v-else>
    {{ data?.message }}
  </div>
</template>
