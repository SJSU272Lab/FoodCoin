import boto3
# sns = boto.sn.connect_to_region('us-west-2', profile_name='my_profile_name')
# boto.connect_sns

topicArn=""
client=boto3.setup_default_session(region_name='us-west-2')
client = boto3.client('sns',aws_access_key_id='XXXXXXXXX',
    aws_secret_access_key='XXXXXXXXXXX')#,aws_default_region='us-east-1')

def createTopic():
    response = client.create_topic(Name='FoodCoin')
    global topicArn
    topicArn=response['TopicArn']
    return response['TopicArn']



def subscribeUser(phoneNumber):
    global topicArn
    response = client.subscribe(
        TopicArn=topicArn,
        Protocol='sms',
        Endpoint=phoneNumber
    )
    return response

def publishMessage(message):
    #print "Inside publish Message"

    response = client.publish(
        TopicArn=topicArn,
        Message=message
    )
    return response

#global topicArn
topicArn=createTopic()
# mess="This is to test message from python"
# phoneNum="+14014020004"
# subscribeUser(phoneNum)
# #global topicArn
# #topicArn=createTopic()
# publishMessage(mess,topicArn)

