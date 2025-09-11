import swaggerAutogen from "swagger-autogen";

const docs = {
  host: "localhost:3000",
  info: {
    title: "API REST",
    description: "API para gerenciamento escolar",
  },
  components: {
    schemas: {
      erro: {
        msg: "Erro",
      },
      aluno: {
        nome: "nome do aluno",
        email: "email do aluno",
        idade: 15,
        turma: {
          id: 2,
        },
      },
      materia: {
        nome: "nome da materia",
      },
      professor: {
        nome: "nome do professor",
        email: "email do professor",
        materia: {
          id: 3,
        },
      },
      turma: {
        nome: "1-Ano",
        periodo: "periodo de aula da turma",
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};
const routes = ["./server.js"];
const outputJson = "./swaggerOutput.json";
swaggerAutogen({ openapi: "3.0.0" })(outputJson, routes, docs).then(
  async () => {
    await import("./server.js");
  }
);
