const { Sender, Biker } = require("../models");
const dbMongo = require("./connection");
const AuthService = require("../services/authService");

(async () => {
  try {
    const dbCheck = await dbMongo.connect();
    if (dbCheck) {
      let senders = [];
      let bikers = [];
      for (let i = 1; i <= 5; i++) {
        try {
          const newSender = {
            name: `Sender${i}`,
            email: `sender${i}@mailinator.com`,
            password: await AuthService.encryptPassword(`senderpassword_${i}`),
            parcels: [],
          };
          senders.push(newSender);
        } catch (error) {
          console.log(error);
        }
      }
      const sendersCheck = await Sender.insertMany(senders);
      if (sendersCheck) {
        console.log("===========All senders Inserted==============");
      }
      // Create and save 10 bikers
      for (let i = 1; i <= 10; i++) {
        const biker = {
          name: `Biker ${i}`,
          email: `biker${i}@mailinator.com`,
          password: await AuthService.encryptPassword(`bikerpassword_${i}`),
          parcels: [],
        };
        bikers.push(biker);
      }
      const bikersCheck = await Biker.insertMany(bikers);
      if (bikersCheck) {
        console.log("===========All bikersInserted==============");
      }
    }
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
})();
