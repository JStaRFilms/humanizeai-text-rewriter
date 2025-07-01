# Humanize AI Text Rewriter

Transform AI-generated text into natural, human-sounding content with this React application powered by Google's Gemini AI. Perfect for content creators, marketers, and developers looking to make AI-generated content more engaging and authentic.

![Demo](https://via.placeholder.com/800x400.png?text=Humanize+AI+Text+Rewriter+Demo)

## ✨ Features

- **Smart Text Humanization** - Convert robotic AI text into natural, engaging content
- **Customizable Transformations**:
  - **Synonym Replacement** - Swap out overused words with varied alternatives
  - **Sentence Structure Variation** - Break up repetitive patterns in sentence construction
  - **Contraction Insertion** - Add natural-sounding contractions for a conversational tone
  - **AI Trope Reduction** - Identify and rephrase common AI clichés and formalisms
- **Adjustable Intensity** - Fine-tune transformations from subtle to significant changes
- **Real-time Preview** - See changes instantly as you adjust settings
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Google's Gemini API
- **Package Manager**: npm

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Google Gemini API Key

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/humanizeai-text-rewriter.git
   cd humanizeai-text-rewriter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Production Build
```bash
npm run build
npm run preview
```

## 🧪 Testing

To run tests (when available):
```bash
npm test
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── IntensitySlider.tsx
│   ├── LoadingSpinner.tsx
│   ├── TextAreaInput.tsx
│   └── TransformationOptionsInput.tsx
├── services/           # API and service layer
│   └── geminiService.ts
├── types.ts            # TypeScript type definitions
├── constants.ts        # Application constants
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Powered by [Google Gemini AI](https://ai.google/)
- Icons from [Heroicons](https://heroicons.com/)

## 📬 Contact

For questions or feedback, please open an issue on GitHub or contact the maintainers.
