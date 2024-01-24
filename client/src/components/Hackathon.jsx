import { useState } from "react";
import axios from "axios";
import "../styles/Hackathon.css";



const Hackathon = () => {

  function updateSystemContextField(){
    // find the dropdown
    var ddl = document.getElementById("systemContextTemplate");
    // find the selected option
    var selectedOption = ddl.options[ddl.selectedIndex];
    // find the attribute value
    var mailValue = selectedOption.getAttribute("data-system-context-template");
    // find the textbox
    var textBox = document.getElementById("systemContext");
  
    // set the textbox value
    if(mailValue=="OSR"){
        textBox.value = "ABCD";
    }
    else if(mailValue=="ICSR"){
        textBox.value = "EFGH";
    } 
  }

  const [systemContext, setSystemContext] = useState(
    "You are an outbound sales representative selling Apple Airpods. You have a youthful and cheery personality. Keep your responses as brief as possible but make every attempt to keep the caller on the phone without being rude. Don't ask more than 1 question at a time. Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous. Speak out all prices to include the currency. Please help them decide between the airpods, airpods pro and airpods max by asking questions like 'Do you prefer headphones that go in your ear or over the ear?'. If they are trying to choose between the airpods and airpods pro try asking them if they need noise canceling. Once you know which model they would like ask them how many they would like to purchase and try to get them to place an order. You must add a '•' symbol every 5 to 10 words at natural pauses where your response can be split for text to speech."
  );
  const [initialGreeting, setInitialGreeting] = useState(
    "Hello! I understand you're looking for a pair of AirPods, is that correct?"
  );
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState({
    data: "Hello! I understand you're looking for a pair of AirPods, is that correct?",
  });

  const [func, setFunc] = useState([]);
  const [funcName, setFuncName] = useState("");
  const [funcDesc, setFuncDesc] = useState("");
  const [prop, setProp] = useState([]);
  const [propName, setPropName] = useState("");
  const [propType, setPropType] = useState("");
  const [propDesc, setPropDesc] = useState("");
  const [retObj, setRetObj] = useState([]);
  const [retObjName, setRetObjName] = useState("");
  const [retObjType, setRetObjType] = useState("");
  const [retObjDesc, setRetObjDesc] = useState("");


  const addFunctionInput = ()=>{
    setFunc([...func, {
      name: "",
      description: "",
      properties: [],
      returnObject: []
    }])

  }

  const handleFunctionChange = i => e => {
    let newFunc = [...func];
    newFunc[i][e.target.name] = e.target.value;
    setFunc(newFunc);

  }

  const addPropertiesInput = i => e => {
    let newProp = {
      name: "",
      type: "",
      description: ""
    }
    let newFunc = [...func];
    newFunc[i].properties = [...func[i].properties, newProp];
    setFunc(newFunc);
  }

  const handlePropertyChange = (i, p) => e => {
    let newFunc = [...func];
    newFunc[i]["properties"][p][e.target.name] = e.target.value;
    setFunc(newFunc);
  }

  const addReturnObjectInput = i => e => {
    let newRetObj = {
      name: "",
      type: "",
      description: ""
    }
    let newFunc = [...func];
    newFunc[i].returnObject = [...func[i].returnObject, newRetObj];
    setFunc(newFunc);

  }


  const handleReturnObjectChange = (i, r) => e => {
    let newFunc = [...func];
    newFunc[i]["properties"][r][e.target.name] = e.target.value;
    setFunc(newFunc);
  }

  const getOpenAIResponse = () => {
    console.log(func);
    axios
      .get("http://localhost:3000/hackathon/ask-gpt/" + prompt)
      .then((response) => {
        console.log(response);
        setResponse(response);
      })
      .catch((e) => console.log(e));
  };

  // const createVirtualAgent = () => {
  //   axios
  //     .post(
  //       "http://localhost:3000/hackathon/set-user-context/" +
  //         initialGreeting +
  //         "/" +
  //         systemContext
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       setResponse(response);
  //       alert("Success! Created Virtual Agent");
  //     })
  //     .catch((e) => {
  //       alert(e);
  //       console.log(e);
  //     });
  // };

  const createVirtualAgent = () => {
    console.log(func)
    axios
      .post("http://localhost:3000/hackathon/set-user-context", {
        greeting: initialGreeting,
        context: systemContext,
      })
      .then((response) => {
        console.log(response);
        setResponse(response);
        alert("Success! Created Virtual Agent");
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  };

  return (
    <div>
      <h2>Bot Builder</h2>
      <p>
        To do: Function Generator - Need to generate functions & function
        manifest file Language Generator - Need to define language settings and
        how this would work with TTS
      </p>
      <div className="form-group">
        <label htmlFor="systemContextTemplate">System Context Templates</label>
        <br/>
        <select defaultValue="blank" id="systemContextTemplate" onChange={updateSystemContextField}>
          <option data-system-context-template="" value="blank"></option>
          <option data-system-context-template="OSR" value="Outbound Sales Representative">Outbound Sales Representative</option>
          <option data-system-context-template="ICSR" value="Inbound Customer Service Representative">Inbound Customer Service Representative</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="systemContext">System Context</label>
        <textarea
          id="systemContext"
          className="form-control w-100 largeInput"
          value={systemContext}
          placeholder="System context"
          onChange={(e) => setSystemContext(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="languageSettings">Language Settings</label>
        <br/>
        <input type="checkbox" id="english"/>English
        <br/>
        <input type="checkbox" id="french"/>French
        <br/>
        <input type="checkbox" id="spanish"/>Spanish
        <br/>
        <input type="checkbox" id="italian"/>Italian
        <br/>
        <input type="checkbox" id="mandarin"/>Mandarin
        {/* <input
          id="languageSettings"
          className="form-control"
          value={languageSettings}
          placeholder="Language settings"
          onChange={(e) => setLanguageSettings(e.target.value)}
        /> */}
      </div>
      <div className="form-group">
        <label htmlFor="initialGreeting">Initial Greeting</label>
        <input
          id="initialGreeting"
          className="form-control"
          value={initialGreeting}
          placeholder="Initial greeting"
          onChange={(e) => setInitialGreeting(e.target.value)}
        />
      </div>
      <div className="form-group">
        <b><label htmlFor="functionList">List of Functions</label></b>
        <div>
          <button onClick={()=>addFunctionInput()}>+</button>
          {func.map((item, i) => {
            let FunctionName = "function" + i;
            return (
              <div className={FunctionName}>
                <label htmlFor={FunctionName}>&nbsp;&nbsp;&nbsp;Function {i}</label>
                <br/>
                <label htmlFor={FunctionName+"Name"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Function Name:</label>
                <input
                  onChange={handleFunctionChange(i)} 
                  value={item.value}
                  name="name"
                  id={FunctionName+"Name"}
                  type={item.type}
                  size="40"
                />
                <br/>
                <label htmlFor={FunctionName+"Desc"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Function Description:</label>
                <input
                  onChange={handleFunctionChange(i)} 
                  value={item.value}
                  name="description"
                  id={FunctionName+"Desc"}
                  type={item.type}
                  size="40"
                />
                <br/>
                <b><label htmlFor={FunctionName+"PropertyList"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List of Properties</label></b>
                <button onClick={addPropertiesInput(i)}>+</button>
                  {func.map((item, p) => {
                    let PropName = FunctionName + "Property" + p;
                    return (
                      <div className={PropName}>
                        <label htmlFor={PropName}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Property {p}</label>
                        <br/>
                        <label htmlFor={PropName+"Name"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Property Name:</label>
                        <input
                        onChange={handlePropertyChange(i, p)}
                          value={item.value}
                          name="name"
                          id={PropName+"Name"}
                          type={item.type}
                          size="40"
                        />
                        <br/>
                        <label htmlFor={PropName+"Type"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Property Type:</label>
                        <select defaultValue="blank" id={PropName+"Type"} name="type" onChange={handlePropertyChange(i, p)}>
                          <option data-system-context-template="" value="blank"></option>
                          <option data-system-context-template="String" value="String">String</option>
                          <option data-system-context-template="Integer" value="Integer">Integer</option>
                        </select>
                        <br/>
                        <label htmlFor={PropName+"Desc"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Property Description:</label>
                        <input
                        onChange={handlePropertyChange(i, p)} 
                          value={item.value}
                          name="description"
                          id={PropName+"Name"}
                          type={item.type}
                          size="40"
                        />
                      </div>
                    )
                  })}
                <br/>
                <b><label htmlFor={FunctionName+"ReturnObj"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List of Return Objects</label></b>
                <button onClick={addReturnObjectInput(i)}>+</button>
                {func.map((item, r) => {
                    let RetObjName = FunctionName + "RetObj" + r;
                    return (
                      <div className={RetObjName}>
                        <label htmlFor={RetObjName}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return Object {r}</label>
                        <br/>
                        <label htmlFor={RetObjName+"Name"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return Object Name:</label>
                        <input
                        onChange={handleReturnObjectChange(i, r)} 
                          value={item.value}
                          name="name"
                          id={RetObjName+"Nam"}
                          type={item.type}
                          size="40"
                        />
                        <br/>
                        <label htmlFor={RetObjName+"Type"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return Object Type:</label>
                        <select defaultValue="blank" id={RetObjName+"Type"} name="type" onChange={handleReturnObjectChange(i, r)}>
                          <option data-system-context-template="" value="blank"></option>
                          <option data-system-context-template="String" value="String">String</option>
                          <option data-system-context-template="Integer" value="Integer">Integer</option>
                        </select>
                        <br/>
                        <label htmlFor={RetObjName+"Desc"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return Object Description:</label>
                        <input
                        onChange={handleReturnObjectChange(i, r)} 
                          value={item.value}
                          name="description"
                          id={RetObjName+"Name"}
                          type={item.type}
                          size="40"
                        />
                      </div>
                    )
                  })}
                <br/>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={createVirtualAgent} className="btn btn-primary">
        Create Virtual Agent
      </button>
      <h2>Bot Tester</h2>
      <p>
        To Do: Add voice sdk soft client to make call from browser, show output
        from media in dialogbox as it's spoken
      </p>
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
    </div>
  );
};

export default Hackathon;
