# Aliyun short message service connector

Aliyun is a primary cloud service provider in Asia, offering many cloud services, including SMS (short message service). Aliyun SMS Connector is a plugin provided by the Logto team to call the Aliyun SMS service, with the help of which Logto end-users can register and sign in to their Logto account via SMS verification code (or in other words, passcode).

## Register Aliyun account

Go to the [Aliyun website](https://cn.aliyun.com/) and register your Aliyun account if you don't have one.

## Enable and Configure Aliyun Short Message Service

1. Sign-in with your Aliyun account at the [Aliyun website](https://cn.aliyun.com/) and go to the [SMS service console page](https://www.aliyun.com/product/sms).
2. Click the "Open for free" button on the top left of the SMS service page and begin the configuration process.
3. Read and agree to the "SMS service activation Agreement" and click "Subscribe to a service" to move on.
4. You are now on the ["SMS service console page"](https://dysms.console.aliyun.com/overview), go to either "Domestic Messages" or "International / Hong Kong, Macao and Taiwan Messages" button on the sidebar per your use case.
5. Add signature and template following the guidelines, and provide the materials or information required for review.
    - Remember to select "verification code" as "Applicable scene" when filling out the signature application and also "verification code" for "Template type" when applying for a template review because we are using these signatures and templates to send passcode. Currently, we do not support sending SMS messages other than verification-code-related text messages.
    - Also, use "{{code}}" as a placeholder where you want to place your digital passcode in template contents.
6. After submitting your SMS signature and template application, you need to wait for it to take effect. At this point, we can go back to the [SMS service console page](https://dysms.console.aliyun.com/overview) and send a test SMS. If your signatures and templates are ready for use, you can try them directly; if they are not taking effect yet, Aliyun also provides test templates.
    - You may need to recharge a small amount of money before sending test messages.
    - You may also be asked to bind a test phone number before sending test messages. For more details, go to "Quick start" tab from the sidebar of the [SMS service console page](https://dysms.console.aliyun.com/overview).

## Compose the connector JSON

1. From the [SMS service console page](https://dysms.console.aliyun.com/overview), hover on your avatar in the top right corner and go to "AccessKey Management", and click "Create AccessKey". You will get an "AccessKey ID" and "AccessKey Secret" pair after finishing security verification. Please keep them properly.
2. Go to the "Domestic Messages" or "International / Hong Kong, Macao and Taiwan Messages" tab you just visited, you can find "Signature Name" and "Template Code" easily.
3. Fill out the Aliyun SMS Connector settings:
    - Fill out the `accessKeyId` and `accessKeySecret` fields with access key pairs you've got from step 1.
    - Fill out the `signName` field with "Signature Name" which is mentioned in step 2. All templates will share this signature name.
    - You can add multiple SMS connector templates for different cases. Here is an example of adding a single template:
        - Fill the `templateCode` field, which is how you can control SMS context, with "Template Code" from step 2.
        - Fill out `usageType` field with either `Register`, `SignIn` or `Test` for different use cases.

Here is an example of Aliyun SMS connector config JSON.

```json
{
    "accessKeyId": "<your-access-key-id>",
    "accessKeySecret": "<your-access-key-secret>",
    "signName": "<Aliyun>",
    "templates": [
        {
            "templateCode": "<SMS_123456>",
            "usageType": "Register"
        },
        {
            "templateCode": "<SMS_234567>",
            "usageType": "SignIn"
        },
        {
            "templateCode": "<SMS_345678>",
            "usageType": "Test"
        },
    ]
}
```

### Config types


| Name            | Type       |
|-----------------|------------|
| accessKeyId     | string     |
| accessKeySecret | string     |
| signName        | string     |
| templates       | Template[] |

| Template Properties | Type        | Enum values                      |
|---------------------|-------------|----------------------------------|
| templateCode        | string      | N/A                              |
| usageType           | enum string | 'Register' \| 'SignIn' \| 'Test' |


## References

- [Aliyun SMS - Quick Start](https://dysms.console.aliyun.com/quickstart)
