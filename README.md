# oj

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### 网络请求使用
**请求**
```
this.$store.dispatch('n', {
  flag: flag,  //
  method: method,
  url: `/path/${this.$route.params.id}`,
  params: {
    param1: param1
  }
}),
```

**获取请求后的数据**
```
this.$store.state.n[flag].data
```

**说明**

``` this.$store.state.n ```是一个保存返回数据的对象

``` flag ``` 指定 ``` this.$store.state.n ``` 中的哪一部分数据。当有多个并发请求时，通过指定 ``` flag ``` 来区分获取到的数据