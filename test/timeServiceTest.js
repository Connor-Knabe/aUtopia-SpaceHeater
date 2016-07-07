var timeService = require("../app/timeService");
var expect    = require("chai").expect;
describe("Time Service", function(){
    describe("grabAppointments",function(){
        it("returns cleaned object from getfloats service", function(){
            var fakeRawCalendarObj = [{"kind":"calendar#event","etag":"\"234234234\"","id":"laksjdflkajsdlkfjasdf","status":"confirmed","htmlLink":"","created":"2016-07-07T12:17:29.000Z","updated":"2016-07-07T12:17:29.879Z","summary":"Connor 60 min","creator":{"email":"fakeemail@gmail.com","self":true},"organizer":{"email":"fakeemail@gmail.com","self":true},"start":{"dateTime":"2016-07-07T17:00:00-05:00"},"end":{"dateTime":"2016-07-07T18:00:00-05:00"},"iCalUID":"56476E12-291B-4AA8-A3E7-462DF1217DA0","sequence":0,"reminders":{"useDefault":false,"overrides":[{"method":"popup","minutes":30}]}}];
            var expected = {
                name:"Connor",
                duration:60,
                startTime:"2016-07-07T17:00:00-05:00",
                endTime:"2016-07-07T18:00:00-05:00"
            };
            var actual = timeService.grabAppointments(fakeRawCalendarObj);
            expect(actual).to.equal(expected);

        });
    });
    describe("turnOn",function(){
        it("turns on when given a calendar appointment within two hours", function(){
            // var fakeCalendarObj = {
            //
            // };
            // timeService.turnOn(fakeCalendarObj);

        });
        it("turns on when given a calendar appointment within two hours", function(){
            // var fakeCalendarObj = {
            //
            // };
            // timeService.turnOn(fakeCalendarObj);

        });
        it("turns off heater after appointment time is over", function(){

        });
    });
    describe("turnOff",function(){
        it("turns on when given a calendar appointment within two hours", function(){

        });
        it("turns off heater after appointment time is over", function(){

        });
    });
});
