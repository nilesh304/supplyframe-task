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

const homepage = path.resolve(__dirname, "../views/pages/index.ejs");
const characters_page = path.resolve(__dirname, "../views/pages/characters.ejs");
const comics_page = path.resolve(__dirname, "../views/pages/index.ejs");
// const favorite_page = path.resolve(__dirname, "../views/pages/index.ejs");


ejs.renderFile(homepage, function (err, str) {
  if (str) {
    let dom;
    let container;

    describe("pages", () => {
      beforeEach(() => {
        dom =  new JSDOM(str, { runScripts: "dangerously" });
        // console.log(dom);
        container = dom.window.document.body;
      });

      test("home-page", () => {
        expect(container.querySelector(".row")).not.toBeNull();
        expect(container.querySelector(".img-fluid")).not.toBeNull();
        expect(container.querySelectorAll(".img-fluid").length).toBe(2);
        expect(container.querySelectorAll(".img-fluid")[0].src).toBe("/images/characters.jpeg");
        expect(container.querySelectorAll(".img-fluid")[1].src).toBe("/images/comics.jpeg");
      });
    });
  }
});
// name:element.name,image_url:element.image.small_url,origin:element.origin,publisher:element.publisher,api:element.api_detail_url,num:index,id:element.id

ejs.renderFile(characters_page,{name:"",page:1,data:[{name:"a",image:{small_url:"abc.jpg"},origin:{name:"origin"},publisher:{name:"publisher"},api_detail_url:"as",num:0,id:1}]}, function (err, str) {
    if (err) {
        console.log(err)
       }
    // console.log(str);
    if (str) {
      let dom;
      let container;
    //   console.log(str);
  
      describe("characters-pages", () => {
        beforeEach(() => {
          dom =  new JSDOM(str, { runScripts: "dangerously",url: 'http://localhost/' });
          container = dom.window.document.body;
        // console.log(container.querySelectorAll(".flip-card").length);

        });
        test("characters", () => {
          expect(container.querySelector(".row")).not.toBeNull();
          expect(container.querySelector(".flip-card")).not.toBeNull();
          expect(container.querySelectorAll(".flip-card").length).toBeLessThanOrEqual(12);
        });
      });
    }
  });