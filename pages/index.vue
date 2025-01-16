<template>
  <div>
    <!-- Header Section -->
    <Header />

    <!-- Main Content -->
    <main class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 class="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Shorten Your URL</h1>
      <form @submit.prevent="shortenUrl" class="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          v-model="longUrl"
          type="url"
          placeholder="Enter your URL here"
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>

      <!-- Shortened Links Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2">Original URL</th>
              <th class="border border-gray-300 px-4 py-2">Shortened URL</th>
              <th class="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(link, index) in sortedLinks"
              :key="index"
              class="even:bg-gray-100"
            >
              <td class="border border-gray-300 px-4 py-2 max-w-sm break-words">
                {{ link.original }}
              </td>
              <td class="border border-gray-300 px-4 py-2 text-blue-500 break-words">
                <a
                  :href="link.shortened"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:underline"
                >
                  {{ link.shortened }}
                </a>
              </td>
              <td class="px-4 py-2 flex gap-2 flex-wrap items-center justify-start">
                <button
                  @click="copyToClipboard(link.shortened)"
                  title="Copy"
                  class="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  <ClipboardIcon class="size-5" />
                </button>
                <button
                  @click="navigateTo({ path: 'qrcode-generator', query: { url: link.shortened } })"
                  title="Generate QR Code"
                  class="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  <QrCodeIcon class="size-5" />
                </button>
                <button
                  @click="deleteLink(index)"
                  title="Delete"
                  class="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  <TrashIcon class="size-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ClipboardIcon, QrCodeIcon, TrashIcon } from '@heroicons/vue/24/outline';

const longUrl = ref('');
const links = ref([]);

// Computed property to sort links by most recent
const sortedLinks = computed(() => [...links.value].reverse());

const shortenUrl = async () => {
  if (!longUrl.value) return;

  try {
    const response = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl.value)}`
    );
    const data = await response.json();

    if (data.shorturl) {
      // Add the new link to the beginning of the links list
      const newLink = { original: longUrl.value, shortened: data.shorturl };
      links.value.unshift(newLink);

      if (typeof window !== 'undefined') {
        localStorage.setItem('links', JSON.stringify(links.value));
      }

      longUrl.value = ''; // Clear input field
    } else {
      alert('Failed to shorten the URL. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
};

const copyToClipboard = (url) => {
  navigator.clipboard.writeText(url).then(
    () => alert('URL copied to clipboard!'),
    () => alert('Failed to copy URL.')
  );
};

// Delete a link from the list and update localStorage
const deleteLink = (index) => {
  // Find the correct index in the original array
  const originalIndex = links.value.length - 1 - index;

  // Remove the item from the links array
  links.value.splice(originalIndex, 1);

  // Update localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('links', JSON.stringify(links.value));
  }
};


onMounted(() => {
  if (typeof window !== 'undefined' && localStorage.getItem('links')) {
    links.value = JSON.parse(localStorage.getItem('links'));
  }
});
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
</style>
