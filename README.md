# LinkSprint

LinkSprint is a simple URL shortener built using Nuxt 3 and Tailwind CSS. It utilizes the is.gd API to generate short links and stores them in the browser's local storage.

## Features

- Shorten long URLs using the is.gd API.
- Display shortened links in a clean, tabular format.
- Persist links using local storage.
- Responsive and minimalist UI.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joshytheprogrammer/linksprint.git
   ```

2. Navigate to the project directory:

   ```bash
   cd linksprint
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Enter a long URL in the input field and click "Shorten".
3. View the original and shortened URLs in the table.

## Technologies Used

- **Nuxt 3**: Framework for building modern web applications.
- **Tailwind CSS**: Utility-first CSS framework.
- **is.gd API**: Service for URL shortening.

## Notes

- Ensure you have a stable internet connection for the is.gd API to work.
- Links are stored locally and will persist across browser sessions.

## License

This project is open-source and available under the MIT License.
