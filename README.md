# Notify-IO

Notify-IO gives you an easy to use interface for defining and calling your own custom notifications.

## Introduction

#### 1. Geting Started

```js
const { Notify, TemplateBuilder } = require('notify-io') // 1. require in Notify and TemplateBuilder

let templates = new TemplateBuilder() // 2. create new template-builder object

Notify.congif({ templates }) // 3. load tempates on Notify class

// 4. Define your templates with the load function
templates.load('welcome', { state: 'info'},{
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})

// 
let notify = new Notify()
    .loadMessage('welcome', 'some-username')

console.log(notify)

// Output

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




```js

// Note: keys must be valid ISO 639-1 lang codes e.g. "en"
// Case: 1, Constant Template Definition (CTD)
templates.load('already_registered', { state: 'info'},{
    en: () => `please try loggin in!`, 
    zh: () => `请登陆`,
})

// Case: 2, Unary Template Definition (UTD)
templates.load('welcome', { state: 'info'},{
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})

// Case: 3, Multidimensional Template Definition (MTD)
templates.load('should_match', { key:'username', state: 'info'}, {
    en: (data) => `${data.noun1} and ${data.noun2} should match!`,
    zh: (data) => `${data.noun1} 和 ${data.noun2} 应该相同!`
})

// 
let notify = new Notify()
    .loadMessage('welcome', 'some-username')

```