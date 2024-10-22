import { useState } from "react";
import Editor from 'react-simple-code-editor';
import toast, { Toaster } from "react-hot-toast";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

function App() {
  let [Output, setOutput] = useState("");
  const [Inpute, setInpute] = useState("Name:text,Email:email,Phone:text,gender:select=male;female");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function copyToClipboard() {
    setCopied(true)
    navigator.clipboard.writeText(Output)
      .then(() => {
        toast.success("Copied")
      }, (error) => {
        console.log(error)
      })

    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  const getDataTable = () => {
    if (!Inpute) {
      return toast.error("Please enter input data");
    }
    setOutput("")
    setLoading(true)
    fetch("/api/data-table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table: Inpute }),
    })
      .then((response) => response.json())
      .then((data) =>{
        setTimeout(() => {
          setLoading(false)
        setOutput(data)
        },1000)
        
      }
         
        )
      .catch((error) => console.error("Error:", error));
      
  };

  return (
    <>
      <div className="bg-dark min-vh-100">
        <div className="container p-0" style={{}}>
          <h2 className="text-center text-primary">Welcome to App Builder</h2>
          <div className=" mt-3">
            <div className="form-grou">
              <textarea
                value={Inpute}
                onChange={(e) => setInpute(e.target.value)}
                className="form-control border-0"
                rows={3}
                cols={100}
                style={{
                  color: "#DCDCDC", backgroundColor: "#222222", resize: "none",
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 15,
                  padding: "1rem",
                }}
              />
            </div>
            <div className="form-group mt-3 text-center">
            {
                        loading ? <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                        </button> : <button onClick={() => getDataTable()} type="button" className="btn btn-primary">Generate form</button>
                    }
              <button className={`${Output ? "" : "d-none"} btn btn-primary ms-3`}>
              {
                copied ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="" style={{ width: "1.5rem", height: "1.5rem" }}>
                    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                    <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                  </svg>
                  :
                  <svg onClick={copyToClipboard} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="" style={{ width: "1.5rem", height: "1.5rem" }}>
                    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
              }  
              </button>
              
            </div>
          </div>
          <div className="mt-3">
            {
              Output &&
            
            <Editor
              value={Output}
              readOnly
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: "#222222",
                color: "#DCDCDC",
                maxHeight: "25rem",
                overflow: "auto",
                margin: "0",
                padding: "1rem",
              }}
            />
          }
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
