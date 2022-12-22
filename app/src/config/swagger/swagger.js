const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const doc = {
  info: {
    title: "Node.js Blog API",
    description: "Express, Sequelize로 구현된 회원, 게시글, 댓글, 좋아요 기능이 들어간 블로그 API",
  },
  host: "http://3.34.196.250",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "../../../app.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);