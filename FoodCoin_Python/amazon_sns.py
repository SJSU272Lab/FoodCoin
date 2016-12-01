import boto3
import boto
# sns = boto.sn.connect_to_region('us-west-2', profile_name='my_profile_name')
# boto.connect_sns

topicArn=""
client = boto3.client('sns',aws_access_key_id='AKIAIRCB4RN6I777XV5A',
    aws_secret_access_key='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')#,aws_default_region='us-east-1')

# sns=boto3.resource('sns',aws_access_key_id='AKIAIRCB4RN6I777XV5A',
#     aws_secret_access_key='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')
# topic =sns.Topic('arn')

def createTopic():
    response = client.create_topic(Name='FoodCoin')
    global topicArn
    topicArn=response['TopicArn']
    print response
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

global topicArn
topicArn=createTopic()
# mess="This is to test message from python"
# phoneNum="+14014020004"
# subscribeUser(phoneNum)
# #global topicArn
# #topicArn=createTopic()
# publishMessage(mess,topicArn)

