# angular-express-typeorm
Angular-CSR + Express Backend + node-sspi

## 概要

以下の動作検証を行うための、ユーザ管理アプリケーションを作成する
* frontendは、
  - `Angular`の`CSR(クライアントサイドレンダリング)`
  - 1画面で、ユーザ管理機能（一覧表示、登録）を提供する
* backendは、
  - `Express` + `typeorm`を使用したWEBAPI
  - `node-sspi`を使用したWindows認証（ログイン画面無しでの自動ログイン）

## Windows認証

* 使用するWindows認証ライブラリ
  - `node-sspi`を利用する
  - 別に`node-expose-sspi`もある

* Windowsは非ドメイン参加（ActiveDirectory無し）で、WORKGROUPで行う。
  - そのため、今回はNTML認証を使ったWindows認証を行う。※2023年10月11日にNTML認証が将来的に廃止される方針が出された。
  - ActiveDirectoryを使用してドメイン参加した場合は、セキュアであるKerberos認証を使用することが可能。

* システム構成
  - 1.クライアントブラウザ端末：利用者が使用するマシン。ブラウザはEdge。Windows必須。
  - 2.frontendサーバ：frontend資材を静的に配信する`Webサーバ`
  - 3.backendサーバ：`backend`の`WEBAPI`と`DB`からならるサーバ。Windows必須。

* 本番環境：クライアントブラウザ端末とfrontendサーバとbackendサーバが全て異なるマシン（異なるIPアドレス）である
  - クライアントブラウザ端末とbackendサーバで、同一のユーザアカウント（パスワードも同じ）が登録されていること
    - NTML認証で必要
    - クライアントブラウザ端末が複数台存在する場合には、それぞれのアカウント（パスワードも同じ）をbackendサーバに登録しておく必要がある
  - クライアントブラウザ端末の`インターネットオプション`で`信頼済みサイト`または`ローカルイントラネット`に、backendサーバのIPアドレスまたはホスト名が登録されていること
    - NTML認証で必要
  - frontendサーバのIPアドレスまたはホスト名は、認証とは特に関係ないため登録不要。
  - `NTML認証`ではセキュリティで`HTTPS`は必須だが、本検証は`HTTP`で実施。

* 開発環境：クライアントブラウザ端末とfrontendサーバとbackendサーバが全て同一マシンである場合で、`localhost`で起動する
  - `localhost`でbackendを起動する際には特に`信頼済みサイト`等への登録は不要
  - そのマシンのWindowsにログインしているユーザアカウントでWindows認証が行われる

## 構成

![構成](app.png)

> [!TIP]
> ## 参考
> 
> IE 限定じゃない統合Windows認証－Chrome / Edge / Firefox でも！  
> https://www.teppi.com/fileblog-column/update0008  

