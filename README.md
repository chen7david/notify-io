# Notify-IO

### Introduction
Notify-IO gives you an easy to use interface for defining and calling your own custom notifications.

#### 1. Geting Started
The steps below will walk you through setting up a basic project to get started with **notify-io**

**step 0:** NPM install notify-io
```js 
$ npm i notify-io
```

**step 1:** Require in Notify and TemplateBuilder
```js 
const { Notify, TemplateBuilder } = require('notify-io')
```

**step 2:** Create new template-builder object
```js 
let templates = new TemplateBuilder() 
```

**step 3:** Set Notify class configurations
```js 
Notify.congif({ templates })
```

**step 4:** Define templates with the load function
```js 
templates.load('welcome', { state: 'info'},{
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})
```

**step 5:** Use Notify in your project
```js
let notify = new Notify()
    .loadMessage('welcome', 'some-username')

console.log(notify)
```

**step 6:** The output of step 5
```js 
{
  lang: 'en',
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


### Template Definition Categories
**Note:** keys must be valid ISO 639-1 lang codes e.g. "en"

Constant Template Definition (CTD)
```js 
templates.load('already_registered', { state: 'info'},{
    en: () => `please try loggin in!`, 
    zh: () => `请登陆`,
})
```

Unary Template Definition (UTD)
```js 
templates.load('welcome', { state: 'info'},{
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})
```

Multidimensional Template Definition (MTD)
```js 
templates.load('should_match', { key:'username', state: 'info'}, {
    en: (data) => `${data.noun1} and ${data.noun2} should match!`,
    zh: (data) => `${data.noun1} 和 ${data.noun2} 应该相同!`
})
```