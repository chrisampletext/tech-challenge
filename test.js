var request = require("supertest");
const users = require("./data/users.json");
app = require('./server');

module.exports = app;

//choose to integration/unit test users route
describe("users", function(){
    it("yields all the users", function(done){
        request(app).get("/users")
        .expect(200)
        .expect(users,done);
    })
});




