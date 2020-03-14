# Notify-IO

Notify-IO gives you an easy to use interface for defining and calling your own custom notifications.

### Introduction

#### 1. Geting Started
1. Require in Notify and TemplateBuilder
```js 
const { Notify, TemplateBuilder } = require('notify-io')
```

2. Create new template-builder object
```js 
let templates = new TemplateBuilder() 
```

3. Set Notify class configurations
```js 
Notify.congif({ templates })
```

4. Define templates with the load function
```js 
templates.load('welcome', { state: 'info'},{
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})
```


5. Use Notify in your project
```js
let notify = new Notify()
    .loadMessage('welcome', 'some-username')

console.log(notify)
```

6. The output of step 5
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

CAT 1: Constant Template Definition (CTD)
```js 
templates.load('already_registered', { state: 'info'},{
    en: () => `please try loggin in!`, 
    zh: () => `请登陆`,
})
```

CAT 2: Unary Template Definition (UTD)
```js 
templates.load('welcome', { state: 'info'},{
    en: (noun) => `welcome back ${noun}`, 
    zh: (noun) => `欢迎回来 ${noun}`,
})
```

CAT 3: Multidimensional Template Definition (MTD)
```js 
templates.load('should_match', { key:'username', state: 'info'}, {
    en: (data) => `${data.noun1} and ${data.noun2} should match!`,
    zh: (data) => `${data.noun1} 和 ${data.noun2} 应该相同!`
})
```