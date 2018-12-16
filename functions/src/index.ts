import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase Bluetdot!");
});

// import * as express from "express";
// import * as functions from "firebase-functions";
// import * as fs from "fs";

// const app = express();
// app.get("/article/:articleId", (req, res) => {
//   const { articleId } = req.params;

//   try {
//     // CRA 빌드 후 functions로 복사된 index.html의 내용을 읽어들인다.
//     fs.readFile("./index.html", "utf8", (err, htmlString) => {
//       res.set("Content-Type", "text/html");

//       // 읽어들인 html 내용을 정규표현식을 이용해 <title> 태그를 갈아치운다.
//       const replacedHTML = htmlString.replace(
//         /<title>(.*?)<\/title>/,
//         `<title>${articleId}번 게시물 요청</title>`
//       );

//       // 갈아치운 html 내용을 response에 내보낸다.
//       res.send(new Buffer(replacedHTML));
//     });
//   } catch (e) {
//     res.redirect("/");
//   }
// });

// export const articleDetail = functions.https.onRequest(app);
