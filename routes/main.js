//Require express and express router as shown in lecture code and worked in previous labs
const express = require("express");
const router = express.Router();
const path = require("path");
const {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const dynamoDBConfig = {
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIARNO54IOA37WAHO6A",
    secretAccessKey: "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",
  },
};
const scanParams = {
  TableName: "engr_111_team",
};
const dynamoDB = new DynamoDBClient(dynamoDBConfig);

router.route("/").get(async (req, res) => {
  const data = await dynamoDB.send(new ScanCommand(scanParams));
  const sortedItems = data.Items.sort((a, b) => {
    const valueA = a["total_score"].N;
    const valueB = b["total_score"].N;
    return valueB.localeCompare(valueA);
  });
  return res.status(200).render("homepage", {
    title: "Ranking Board",
    data: sortedItems,
  });
});

module.exports = router;
