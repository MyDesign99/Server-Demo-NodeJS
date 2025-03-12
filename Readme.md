
# MyDesign99 Server Demo for NodeJS

Use the MyDesign99 Server Demo for NodeJS to test the MyDesign99 Image Authentication SDK

![MyDesign99 logo](logo.png "MyDesign99 logo")

> ** **
> **To be used on your NodeJS server**
> ** **

# Installation

The package.json file in this repo that should install the necessary dependencies, including the MD99 SDK. But, depending on how you install this repository, you may need to also install the SDK manually. It can be found at 

[github.com/MyDesign99/AuthToken-SDK-NodeJS](https://github.com/MyDesign99/AuthToken-SDK-NodeJS)

## Simple Source Code

The MyDesign99 demo involves only 3 source code modules. The purpose is simply to see an example of the SDK in use.

```
app.js          - the entry point for the server running on port 3000
controller.js   - used to parse incoming URL's and process the requests image URL's through the SDK
data.js         - contains sample datasets that would normally be replaced by your own database
```

## Configuration

The following 2 values need to entered in the controller.js file:

```
publicKey      - use either:
                  1) the Public key from your existing MyDesign99 dashboard
                  2) request the public/secret keys for Demos from the 
                     MyDesign99 website
secretKey      - use either:
                  1) the Secret key from your existing MyDesign99 dashboard
                  2) request the public/secret keys for Demos from the 
                     MyDesign99 website
```

The following value has already been entered in the controller.js file and does NOT need to be changed:

```
assetName		- should be 'radial-demo'
```

# USAGE EXAMPLES

There are 3 sample routes (URL's) using HTTP GET requests. These examples can be accessed through a browser by copying the following URL's into the browser's address bar. The values in the following examples can be changed to see how the asset design changes based on different values.

The result in the browser is a fully-formed and authenticated image URL. This URL can then be used to retrieve the image (your data graphic)

The asset used in these examples is a Radial Wedge, and its design changes color based on value. The ranges are:
```
      < 70
70 thru 79
80 thru 89
     >= 90
```


## Sample GET URL #1
```
https://yourdomain.com/get/imageurl/{data_value}
```

An actual URL could be:
```
https://acme.com/get/imageurl/85
```
This returns a well formed image URL for a DEMO design called "radial-demo", showing the number "85" in that design.


## Sample GET URL #2 (get customer score image)
```
https://yourdomain.com/get/customer/{user_name}
```

An actual URL could be:
```
https://acme.com/get/customer/betty
```
This looks up the customer named "betty" and returns a well-formed image URL for her score and the asset name stored in the configuration file

### Valid customer names:

betty, billy, john, frank, karen


## Sample GET URL #3 (get array of student images)
```
https://yourdomain.com/student/images/{student_id}
```

An actual URL could be:
```
https://acme.com/student/images/3
```
The output is an array (in JSON format) containing the Student's name, each Course name and each image.

### Valid student ID's:

1 through 20

### Additional Examples:

There are also 3 additional routes illustrating HTTP POST requests, but this documentation only discusses the GET requests
