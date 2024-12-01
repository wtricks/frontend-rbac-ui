<template>
  <ul class="space-y-2">
    <li
      v-for="item in items"
      :key="item.key"
      @click="$emit('click', item.key)"
      class="cursor-pointer"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string
  key: string
}

defineProps<{
  items: MenuItem[]
}>()
</script>
