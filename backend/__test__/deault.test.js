const { index,about,characters } = require("../routes/default.js");

describe("Test Handlers", function () {
    

  test("responds to /", () => {
    
    const req = {  };
    const res = {render:jest.fn()}
    index(req, res);

    expect(res.render).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith(
      expect.stringContaining("pages/index")
    );
  });
  test("responds to /about", () => {
    
    const req = {  };
    const res = {render:jest.fn()}
    about(req, res);

    expect(res.render).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith(
      expect.stringContaining("pages/about")
    );
  });
//   test("responds to /characters", async () => {
    
//     const req = { query:{page:0,name:""} };
//     const res = {render:jest.fn()}
//    await characters(req, res);

//     expect(res.render).toHaveBeenCalled();
//     expect(res.render).toHaveBeenCalledWith(
//       expect.stringContaining("pages/characters")
//     );
//   });
});
