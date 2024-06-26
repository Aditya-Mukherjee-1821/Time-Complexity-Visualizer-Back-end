// server.js
import express from 'express';
import esprima from 'esprima';
import cors from 'cors';
import { analyzeComplexity } from './utils/helper.js';

const app = express();
const PORT = 5000;

app.use(express.json());

// Use CORS middleware with options
app.use(cors());

app.post('/analyze', (req, res) => {
  const { code } = req.body;
  // Parse the JavaScript code into an AST
  const ast = esprima.parseScript(code);

  // Dummy logic for determining time complexity (replace with actual logic)
  const complexity = analyzeComplexity(ast);
  console.log(complexity);
  const chartData = [1, 2, 4, 8, 16]; // Example chart data

  res.json({ complexity, chartData });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

/*
for(int i =0; i < 2; i++){
    for(int j = 10; j < 31; j++){
        console.log(i, j);
    }
}
*/
