'use strict';
var AWS = require("aws-sdk");
var sns = new AWS.SNS();

exports.handler = (event, context, callback) => {

    event.Records.forEach((record) => {
        console.log('Stream record: ', JSON.stringify(record, null, 2));

        if (record.eventName == 'INSERT') {
            var name = JSON.stringify(record.dynamodb.NewImage.name.S);
            var createdAt = JSON.stringify(record.dynamodb.NewImage.createdAt.S);
            var dueDate = JSON.stringify(record.dynamodb.NewImage.dueDate.S);
            var credit = JSON.stringify(record.dynamodb.NewImage.credit.S);
            
            var params = {
                Subject: 'A new chore name ' + name + ' was created at ' + createdAt,
                Message: 'This chore is due on ' + dueDate + ' and will be valued at ' + credit + '\n\n ',
                TopicArn: 'arn:aws:sns:us-west-2:534199652943:ChoreTopic'
            };
            sns.publish(params, function(err, data) {
                if (err) {
                    console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                }
            });
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};   