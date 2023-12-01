<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  prefix?: string,
  name: string
}>(), {
  prefix: 'icon'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>