var pvm;
$(document).ready(function () {

function initTest(){
    pvm = new PizzaViewModel{locationName:"", pizzaTypes:{}};
}

$(function () {

    QUnit.module("Asset View Model", {
        setup: initTest
    });


    QUnit.test("set pizza types based on city", function (){
        //Arrange
        pvm.locationName = "San Francisco";
        //Act
        pvm.setPizzaTypes();
        //Assert
        assert.ok(pvm.locationName =="San Francisco", "City Name was set correctly.");
        assert.ok(pvm.pizzaTypes.length == 3, "Pizza Types got mapped for the selected city.");
    });
});
});