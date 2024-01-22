import { useState } from "react";
import axios from "axios";

const Hackathon = () => {
  const [systemContent, setSystemContent] = useState("");
  const [assistantContent, setAssistantContent] = useState(""); // context
  const [languageSettings, setLanguageSettings] = useState("");
  const [functionGenerator, setFunctionGenerator] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState({
    data: "Hello! I understand you're looking for a pair of AirPods, is that correct?",
  });

  const getOpenAIResponse = () => {
    // alert("Button pushed - update");
    axios
      .get("http://localhost:3001/hackathon/ask-gpt/" + prompt)
      .then((response) => {
        console.log(response);
        setResponse(response);
      })
      .catch((e) => console.log(e));
  };

  const createVirtualAgent = () => {
    alert("TBD");
    // axios
    //   .get("http://localhost:3001/hackathon/ask-gpt/" + prompt)
    //   .then((response) => {
    //     console.log(response);
    //     setResponse(response);
    //   })
    //   .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Open AI IVR Hackathon Demo</h1>
      <h2>Bot Builder</h2>

      <div className="form-group">
        <label htmlFor="systemContent">System Content</label>
        <input
          id="systemContent"
          className="form-control"
          value={systemContent}
          placeholder="System content"
          onChange={(e) => setSystemContent(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="assistantContent">Language Settings</label>
        <input
          id="languageSettings"
          className="form-control"
          value={languageSettings}
          placeholder="Language settings"
          onChange={(e) => setLanguageSettings(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="assistantContent">Assistant Content</label>
        <input
          id="assistantContent"
          className="form-control"
          value={assistantContent}
          placeholder="Assistant content"
          onChange={(e) => setAssistantContent(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="assistantContent">Function Generator</label>
        <input
          id="functionGenerator"
          className="form-control"
          value={functionGenerator}
          placeholder="Function generator"
          onChange={(e) => setFunctionGenerator(e.target.value)}
        />
      </div>

      <button onClick={createVirtualAgent} className="btn btn-primary">
        Create Virtual Agent
      </button>
      <h2>Bot Tester</h2>

      <div className="form-group">
        <label htmlFor="response">GPT</label>
        <input
          id="response"
          className="form-control"
          value={response.data}
          onChange={(e) => setResponse(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="prompt">Prompt</label>
        <input
          id="prompt"
          className="form-control"
          value={prompt}
          placeholder="Type your prompt here..."
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button onClick={getOpenAIResponse} className="btn btn-primary">
        Ask GPT
      </button>
      <h2>Number Provisioning</h2>
    </div>
  );
};

export default Hackathon;
