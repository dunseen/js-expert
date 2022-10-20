"use strict";var mocha;module.link("mocha",{default(v){mocha=v}},0);var chai;module.link("chai",{default(v){chai=v}},1);var Person;module.link("../src/person.js",{default(v){Person=v}},2);
const { describe, it } = mocha;


const { expect } = chai;



describe("Person Suite Tests", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Aviao 2000 2000-01-01 2020-01-01"
    );

    const expected = {
      from: "2000-01-01",
      to: "2020-01-01",
      vehicles: ["Bike", "Aviao"],
      kmTraveled: "2000",
      id: "1",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      from: "2000-01-01",
      to: "2020-01-01",
      vehicles: ["Bike", "Aviao"],
      kmTraveled: "2000",
      id: "1",
    });

    const expected = {
      id: 1,
      from: "01 de janeiro de 2000",
      to: "01 de janeiro de 2020",
      kmTraveled: "2.000 km",
      vehicles: "Bike e Aviao",
    };

    expect(person.formatted("pt-BR")).to.be.deep.equal(expected);
  });
});
