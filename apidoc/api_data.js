define({ "api": [
  {
    "type": "post",
    "url": "/token",
    "title": "Get access token",
    "group": "Authorization",
    "parameter": {
      "fields": {
        "JSON": [
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "servers/api-server.js",
    "groupTitle": "Authorization",
    "name": "PostToken"
  },
  {
    "type": "get",
    "url": "/comment",
    "title": "Get all commentaries",
    "group": "Commentary",
    "version": "0.0.0",
    "filename": "servers/api-server.js",
    "groupTitle": "Commentary",
    "name": "GetComment"
  },
  {
    "type": "post",
    "url": "/comment",
    "title": "Create new commentary",
    "group": "Commentary",
    "parameter": {
      "fields": {
        "JSON": [
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "JSON",
            "type": "String",
            "optional": true,
            "field": "parent",
            "description": "<p>ID of parent commentary</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "servers/api-server.js",
    "groupTitle": "Commentary",
    "name": "PostComment"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Get all users",
    "group": "User",
    "version": "0.0.0",
    "filename": "servers/api-server.js",
    "groupTitle": "User",
    "name": "GetUser"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "New user registration",
    "group": "User",
    "parameter": {
      "fields": {
        "JSON": [
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": ""
          },
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": ""
          },
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "JSON",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "servers/api-server.js",
    "groupTitle": "User",
    "name": "PostUser"
  }
] });
