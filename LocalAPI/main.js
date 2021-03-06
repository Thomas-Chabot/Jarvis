const modules = "./modules";
const solace = modules + "/Solace";

const {Subscriber, Events} = require(solace + "/subscriber.js");
const socket = require (modules + "/Socket.io.js");
const Excel = require(modules + "/ExcelValues.js");

const subscriber = new Subscriber();
const incomeStatement = new Excel();

var values;
incomeStatement.setup("../Data/Excel.csv").then(()=>{
  values = incomeStatement.getColumnTotals();
});

subscriber.events.on(Events.MessageReceived, (message)=>{
  let msg = JSON.parse(message);
  let type = msg.messageType;
  let body = msg.body;

  let revenues = values.Revenue;
  let expenses = values.Expenses;
  let typeValue = body.typeValue

  //socket.emit("Revenues", JSON.stringify(revenues));
  //socket.emit("Expenses", JSON.stringify(expenses));
  socket.emit("alexa_" + type, typeValue);
})

subscriber.subscribe("Alexa/*");
