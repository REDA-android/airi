export const farmvibesPlugin = {
  name: 'FarmVibes AI Assistant',
  description: 'Integrates Airi with the FarmVibes BigQuery ML service.',
  init: () => {
    console.log('FarmVibes plugin initialized. Ready to query agricultural data!');
    // Here we would typically connect to the Python service running at localhost:8501
  },
  askAiri: async (question: string) => {
    // Airi handles agricultural queries
    if (question.includes('yield') || question.includes('soil')) {
      return "Fetching ML predictions from FarmVibes...";
    }
    return "I am not sure about that.";
  }
};
