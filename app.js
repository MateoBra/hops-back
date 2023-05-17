const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const port = 5000;
const app = express();

app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const sequelize = new Sequelize("ProcessModel-SNMP", "sa", "password123", {
  dialect: "mssql",
  logging: false,
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
      // Your tedious options here
      useUTC: false,
      dateFirst: 1,
    },
  },
});

let x = sequelize.query("execute spTest");
/*
spTest
USE [ProcessModel-SNMP]
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[spTest]
as
begin
SELECT [Id]
      ,[Time]
      ,[Sys]
      ,[SysName]
      ,[Subsys]
      ,[SubsysName]
      ,[Complex]
      ,[ComplexName]
      ,[DataKey]
      ,[ValueType]
      ,[Value]
	  ,[EventText]
	  ,[TypeDescription]
	  ,[IdentObject]
	  ,[IdentData]


  FROM(select [DataKey] as last_DataKey,
  MAX(Time) as last_Time
  from [ProcessModel-SNMP].[EventList].[Event] group by [DataKey]
)last_data

inner join [ProcessModel-SNMP].[EventList].[Event] on last_data.last_DataKey = [DataKey] and last_data.last_Time = [Time]
where Sys = 'SNMP'
order by [DataKey]
		
END
*/

app.get("/test", async (req, res) => {
  const result = await x;
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
