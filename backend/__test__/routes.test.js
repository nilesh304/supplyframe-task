// const request = require('supertest');
// const router = require("../routes/routes")
// const express = require("express");

// const app = new express();
// app.use('/', router);
// app.set('view engine', 'ejs');

// describe('Good Home Routes', function () {

//     test('responds to /', async () => {
//       const res = await request(app).get('/');
//       expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//       expect(res.statusCode).toBe(200);
//     });

//   });

require("@testing-library/jest-dom/extend-expect");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const targetFile = path.resolve(__dirname, "../views/pages/index.ejs");

ejs.renderFile(targetFile, function (err, str) {
  if (str) {
    let dom;
    let container;

    describe("Home page", () => {
      beforeEach(async () => {
        dom = await new JSDOM(str, { runScripts: "dangerously" });
        // console.log(dom);
        await new Promise((resolve) =>
          dom.window.addEventListener("load", resolve)
        );
        container = dom.window.document.body;
      });

      test("should show 1", () => {
        // console.log(">>> ",container.querySelectorAll(".img-fluid")[0].src);
        // console.log(">>> ",container.querySelectorAll(".img-fluid")[1].src);

        expect(container.querySelector(".row")).not.toBeNull();
        // expect(container.querySelector(".row").textContent).toBe('\n        \n            \n            \n             CHARACTERS\n        \n        \n        \n            \n            \n             COMICS\n\n\n\n\n      ');
        expect(container.querySelector(".img-fluid")).not.toBeNull();
        expect(container.querySelectorAll(".img-fluid").length).toBe(2);
        // console.log(">>> ",container.querySelectorAll(".img-fluid").src);
        expect(container.querySelectorAll(".img-fluid")[0].src).toBe("/images/characters.jpeg");
        expect(container.querySelectorAll(".img-fluid")[1].src).toBe("/images/comics.jpeg");



        // expect(1).toBe(1);
      });
    });
  }
});
