const fs = require("fs");

const template = fs.readFileSync("readme-template.md", "utf8");

const data = {
  blog_name: "TI Experient",
  blog_url: "https://tiexperient-blog.netlify.app/",
  portfolio_url: "https://ti-experient.netlify.app/",
  angular_version: "14.0.7",
};

const output = template.replace(/{{(\w+)}}/g, (_, key) => data[key] || "");

fs.writeFileSync("README.md", output);

console.log("README.md atualizado com sucesso!");
