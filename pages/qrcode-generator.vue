<template>
  <div class="">
    <Header />

    <main class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      
      <h1 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Generate QR Code</h1>

      <form @submit.prevent="" class="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          v-model="url"
          type="url"
          placeholder="Enter your URL here"
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          class=" px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Generate
        </button>
      </form>
      
      <div class="max-w-sm mx-auto" v-if="url">
        <Qrcode :value="url" variant="rounded" :radius="1" />
      </div>

    </main>
    
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const url = ref(route.query.url);

</script>
