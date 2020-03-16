# Notify-IO

### Introduction
Notify-IO gives you an easy to use interface for defining and calling your own custom notifications.

#### 1. Geting Started
The steps below will walk you through setting up a basic project to get started with **notify-io**

**step 0:** NPM install notify-io
```js 
$ npm i notify-io
```

**step 1:** Require in NotifyIO and SchemaBuilder
```js 
const { NotifyIO, SchemaBuilder } = require('notify-io')
```

**step 2:** Create new SchemaBuilder object
```js 
const schema = new SchemaBuilder()
```

**step 3:** Define templates with the load function
```js 
schema.create('welcome', {
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})
```

**step 4:** Load Schema on Notify class
```js 
NotifyIO.loadSchema(schema)
```


**step 5:** Use Notify in your project
```js
const validation = new NotifyIO('validation')
    .message('welcome', 'some-username', 'username')


console.log(validation)
```

**step 6:** The output of step 5
```js 
{
  lang: 'en',
  state: 'validation',
  messages: [
    {
      key: 'username',
      state: 'info',
      code: 'welcome',
      message: 'welcome back some-username'
    }
  ]
}
```


### Template Definition Types

Templates are at the core of Notify-IO. Here we will take a look at the three types of templates, specifically how they are defined and when what type is used. Templates types are distinguished based on the mount of arguments the template function takes. 

The three types are: 
- Constant Template Definition (CTD)
- Unary Template Definition (UTD)
- Multidimensional Template Definition (MTD)

**Note:** keys must be valid ISO 639-1 lang codes e.g. "en"

Constant Template Definition (CTD)
```js 
schema.create('already_registered', {
    en: () => `please try loggin in!`, 
    zh: () => `请登陆`,
})
```

Unary Template Definition (UTD)
```js 
schema.create('welcome', {
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})
```

Multidimensional Template Definition (MTD)
```js 
schema.create('should_match', {
    en: (data) => `${data.noun1} and ${data.noun2} should match!`,
    zh: (data) => `${data.noun1} 和 ${data.noun2} 应该相同!`
})
```