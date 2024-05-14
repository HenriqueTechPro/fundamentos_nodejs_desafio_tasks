import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
});

async function importTaskFromCSV() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

   const response = await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
        
    })
    
    if(response.ok) {
      console.log(`Task "${title}" criada com sucesso.`)
    }else {
      console.error(`Erro ao criar task "${title}":`, response.statusText)
    }
   
  }

}

// Executa o script de importação
importTaskFromCSV().catch(error => {
  console.error('Erro ao importar tasks:', error);
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}