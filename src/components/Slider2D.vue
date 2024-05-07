<template>
  <div id="markerbounds" class="marker-bounds" :style="markerBoundsStyle">
    <div id="box" class="box" ref="box" :style="boxStyle">
      <div id="marker" class="marker" :style="markerPositionStyle" @mousedown="enableDragging"
        @mouseup="disableDragging"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['update:position']);

const markerSize = 20;
const boxSize = 150;
const position = reactive({ x: 0.5, y: 0.5 });
const isDragging = ref(false);
const box = ref(null);

// Styles for marker bounds
const markerBoundsStyle = computed(() => ({
  width: `${boxSize}px`,
  height: `${boxSize}px`,
  margin: 'auto',
  position: 'fixed',
}));

// Styles for the box
const boxStyle = computed(() => ({
  width: `${boxSize}px`,
  height: `${boxSize}px`,
  position: 'absolute',
  top: '10px',
  left: '10px',
  border: '1px solid #E9DDD1',
  'border-radius': '2px'
}));

// Marker position style
const markerPositionStyle = computed(() => ({
  top: `${position.y * boxSize - markerSize / 2}px`,
  left: `${position.x * boxSize - markerSize / 2}px`,
  width: `${markerSize}px`,
  height: `${markerSize}px`,
  position: 'absolute',
  backgroundColor: '#ec4d42',
  borderRadius: '100px',
  cursor: 'pointer',
}));

function getMousePosition(event) {
  const boxRect = box.value.getBoundingClientRect();
  const leftPos = event.clientX - boxRect.left;
  const topPos = event.clientY - boxRect.top;

  position.x = Math.max(0, Math.min(leftPos / boxSize, 1.0));
  position.y = Math.max(0, Math.min(topPos / boxSize, 1.0));
  emit('update:position', { x: position.x, y: position.y });
}

function enableDragging(event) {
  isDragging.value = true;
  dragging(event);
}

function disableDragging() {
  isDragging.value = false;
}

function dragging(event) {
  if (!isDragging.value) return;
  getMousePosition(event);
}

onMounted(() => {
  window.addEventListener('mousemove', dragging);
  window.addEventListener('mouseup', disableDragging);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', dragging);
  window.removeEventListener('mouseup', disableDragging);
});
</script>

<style>
/* styles are generated from the script section. */
</style>
