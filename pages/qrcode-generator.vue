<template>
  <div class="">
    <Header />

    <main class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      
      <h1 class="text-lg sm:text-xl text-center font-semibold text-gray-700 mb-4">Generate QR Code</h1>

      <div class="max-w-sm mx-auto" id="qrcode" v-if="url">
        <Qrcode :value="url" variant="rounded" :radius="1" />
      </div>

      <div class="w-fit flex flex-col gap-4 md:flex-row mt-4 mx-auto">
        <button
          @click="downloadPNG"
          class=" px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Download as PNG
        </button>
        <button
          @click="downloadSVG"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Download as SVG
        </button>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>

const route = useRoute();
const url = ref(route.query.url);

const downloadPNG = () => {
  const svgElement = document.querySelector('#qrcode svg');
  if (!svgElement) {
    alert('SVG not found.');
    return;
  }

  // Serialize the SVG
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  // Create an image element to load the SVG
  const img = new Image();
  img.onload = () => {
    // Create a canvas and draw the image
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Convert the canvas to a PNG
    const pngUrl = canvas.toDataURL('image/png');

    // Create a download link
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = url.value+'_qrcode.png';
    link.click();

    // Cleanup
    URL.revokeObjectURL(svgUrl);
  };
  img.src = svgUrl;
};


const downloadSVG = () => {
  const svgElement = document.querySelector('#qrcode svg');
  if (!svgElement) {
    alert('SVG not found.');
    return;
  }

  // Serialize the SVG content
  const svgData = new XMLSerializer().serializeToString(svgElement);

  // Create a blob and a download link
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = url.value+'_qrcode.svg'; // Set the filename
  link.click();
};

</script>
