# servimatt_ai_prompt_app

## Setup Instructions

### Clone & Install

```bash
git clone https://github.com/santosh-jorka/servimatt_ai_prompt_app.git
cd ai-prompt-playground
npm install
npm run dev
```

Currently, the app uses a dummy API (Bacon Ipsum) to simulate AI responses.
We can easily switch to a real AI API (like OpenAI or HuggingFace) by simply updating the .env URL and adjusting the fetch logic in src/utils/aiService.ts.