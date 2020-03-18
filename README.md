# Notify-IO

### Introduction
Notify-IO gives you an easy to use interface for defining and calling your own custom notifications.

#### 1. Geting Started
The steps below will walk you through setting up a basic project to get started with **notify-io**

**step 0:** NPM install notify-io
```js 
$ npm i notify-io
```

**step 1:** Require in Notify and SchemaBuilder
```js 
const { Notify, SchemaBuilder } = require('notify-io')
```

**step 2:** Create new SchemaBuilder object
```js 
const schema = new SchemaBuilder()
```

**step 3:** Define Schema with the create function
```js 
schema.create('welcome', {
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})
```

**step 4:** Use Notify in your project
```js
const notify = new Notify(schema)
notify.stateTo('info') // info is the default state, so only call stateTo() if you need another state.

const msg = notify.message('welcome', 'some-username', 'username')

console.log(msg)
```

**step 5:** The output of step 4
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


### Schema Definition Types

Schemas are at the core of Notify-IO. Here we will take a look at the three types of Schemas, specifically how they are defined and when what type is used. Schema types are distinguished based on the mount of arguments the template function takes. 

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

## API Documentation

### .message()
The message method has three parameters. The first is required and the other two are optional. <code>Notify-IO-Instance.message(schema-name, schema-data, message-key)</code>. The message method renders handles schema rendering for you.

```js
const notify = new Notify('validation')
notify
    .message('any.required', 'password', 'password')
```

### .load()
The load method has three parameters. The first is required and the other two are optional. <code>Notify-IO-Instance.load(schema-name, schema-data, message-key)</code>. The load method only loads your Schema to a queue. When you are done loading messages you can call the render method which will render all Schema in the queue.

```js
const notify = new Notify('validation')
notify
    .load('any.required', 'password', 'password')
    .load('string.empty', 'password', 'password')
    .render()
```

### .render() 
The render method takes no parameters. It renders all Schema in the queue.

```js
const notify = new Notify('validation')
notify
    .load('any.required', 'password', 'password')
    .load('string.empty', 'password', 'password')
    // call load as many times as you need ...
    .render()
```