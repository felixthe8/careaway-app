<template>
  <span class = "icon">
    <i class = "fa-fw fa-3x" :class = "icon"></i>
  </span>
  
</template>


<script>
// This component creates the font awesome icon. It takes in the icon class.
export default {
    name: 'service',
    // The parent component passes the class name through a prop
    props: ['icon']
  
}
</script>
