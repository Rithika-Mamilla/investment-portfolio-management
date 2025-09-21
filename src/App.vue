<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Main Content -->
    <main class="min-h-screen">
      <router-view />
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    Footer
  }
}
</script>

<style>
/* Global styles are handled by Tailwind CSS */
</style>
