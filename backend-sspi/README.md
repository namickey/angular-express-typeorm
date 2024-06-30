# backend

* WEBAPI（JSON形式）を提供する

## 前提
* node.js version `v18.20.3`
  * node-sspiが`v20`では使用できなかったため、`v18`を使用する
* node-sspiを使って、Windows認証(ActiveDirectoryは無いため、NTML認証)を行う
  * https://www.npmjs.com/package/node-sspi
* DBは`SQLServer`を使用し、ORマッパーは`typeorm`を使用する
* 開発環境は`VSCode`を使用する

## インストール
```shell
npm init -y
npm i typeorm ts-node express nodemon mssql node-sspi
npm i cors
npm i -D @types/cors @types/express
```

```shell
npx tsc --init
```

## vscode設定
edit tsconfig.json
```json
"experimentalDecorators": true
"emitDecoratorMetadata": true
"strictPropertyInitialization": false
```

## 起動
```shell
npm run serve
```

## 提供する機能
* `http://localhost:3000/users` GET  ユーザ一覧を取得
* `http://localhost:3000/users` POST ユーザ登録

> [!TIP]
> ## 参考
>
> npm node-sspi  
> https://www.npmjs.com/package/node-sspi  
> 
> expressでCORSエラーが起きたらcorsで解決しよう  
> https://zenn.dev/luvmini511/articles/d8b2322e95ff40  
> 
> 「APIを叩いてもCORSで弾かれた」の対応はこれ  
> https://qiita.com/uehiro22/items/c04e59c36a473fa4ffb4  
> 
> 【プリフライトリクエスト編】クロスドメイン関連の挙動をJavaScriptで確認する  
> https://note.com/kamimi01/n/n10c1e563fee9  
