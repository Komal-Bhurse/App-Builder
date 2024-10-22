const express = require("express");
const path = require("path");
const { generateComponentCode } = require("./services");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "../", "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html"));
});

app.post("/api/data-table", (req, res) => {
    const { table } = req.body;
    const data = table.split(",");
    const dataTypes = data.map((item) => {
        return {
            name: item.split(":")[0],
            type: item.split(":")[1],
        };
    });
    // console.log(dataTypes);
//     console.log(dataTypes);
//     const html = `<h1>Hello World!</h1>
//     <p>It's {new Date().toLocaleString()}</p>
    
//     ${
//         dataTypes
//             .map((item, index) => {
//     return `<div>
//     <input type="${item.type}" name="${item.name}" id="${item.name}"/>
//     </div>\n`
//             }).join("")
//     }
//     <button type="submit">Submit</button>    
//   `;
    const componentCode = generateComponentCode("", dataTypes);
    res.json(componentCode);
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
