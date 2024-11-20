import fs from "fs";

const numFiles = 10000;
const targetDirectory = './src';

// Generate and write files
for (let i = 0; i < numFiles; i++) {
    const fileName = `file_${i}.tsx`;
    const fileContent = `// This is file ${i}`;

    fs.writeFileSync(`${targetDirectory}/${fileName}`, fileContent, (err) => {
        if (err) throw err;
    });

    console.log(`Created file: ${fileName}`);
}

for (let i = 0; i < numFiles; i++) {
    const fileName = `file_${i}.ts`;
    const fileContent = `// This is file ${i}`;

    fs.writeFileSync(`${targetDirectory}/${fileName}`, fileContent, (err) => {
        if (err) throw err;
    });

    console.log(`Created file: ${fileName}`);
}

console.log('Files generation completed!');
