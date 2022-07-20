# 入稿時チェックアプリ

## 説明

新人デザイナーや、普段紙ものを扱うことが少ないデザイナー向けに、入稿時の注意点をメモし、管理できるアプリを作成しました。<br>
入稿時のデータ形式をメモできると同時に、入稿前のチェックも一緒にできるように form の画面を工夫しました。

## 開発背景

### 課題

印刷物制作の最後の工程である入稿時に、確認すべき事項が多く、また印刷所や案件によってその事項が変更することもあり、その煩雑さからのミスを無くしたいと考えていました。

### 課題に対する仮説

・ミスしやすいポイントが特に新人の頃には分かりづらい<br>
・印刷所によって要件が違うため、毎回同じチェックリストを使用することができない

### 仮説に対する解決策

・チェックリストの項目を自分で入力できるようにする<br>
・ミスしやすい項目がわかるように入力フォーマットを用意する。

## 使用技術

### フロントエンド

・HTML
・Styled component
・React
・Material UI

### バックエンド

・Firebase

## 使い方

タイトル部分に案件名を入れ、チェックリスト内の input には案件、予定している印刷所ごとのデータ形式を入力します。
入稿前には checkbox にチェックを入れることで、データ形式など入稿時のチェック漏れを防ぎます。<br>
<img src = "https://user-images.githubusercontent.com/90192979/166429382-c0bab6e5-e23a-4bcd-a9eb-c3fdbbbb67ef.png" width = "500px">
<br><br>一覧からプロジェクトのリストも確認ができ、削除もこの画面で行います。
<img src = "https://user-images.githubusercontent.com/90192979/166439002-e314cbf3-8308-45a7-804e-bf90e7ee5b13.png" width = "500px">
<br><br>ログイン、新規登録を行うことも可能です。<br>
<img src = "https://user-images.githubusercontent.com/90192979/166876008-de2cf2d0-f3a3-4ac1-915b-0dc553ef8716.png" width = "500px">
<br><br>新規作成時<br>
<img src = "https://user-images.githubusercontent.com/90192979/166885231-a2cae805-b5b8-42de-9223-e9703f77e5e2.gif" width = "500px">
<br><br>内容編集時<br>
<img src = "https://user-images.githubusercontent.com/90192979/166882255-49b0769a-7aa4-41ab-80ba-c4f5a300f810.gif" width = "500px">
<br><br>

## 機能

・ログイン、新規登録機能<br>
・firebase にデータを保存、またそのデータを変更、削除<br>
・firebase のクエリを使用したページネーション<br>
・ゲストログイン機能<br>

## 構築、インストール方法

・インストール方法<br>
React `npx create-react-app my-app cd my-app`<br>
Firebase `npm install -g firebase-tools`<br>
<br><br>
・構築
ローカル環境での閲覧
`npm start`
→ Open http://localhost:3000

オープンな環境に構築する場合
`firebase init`
`firebase login`
`npm run build`
`npm firebase deploy`

## ライセンス

MIT

## 作者

YONEDA MANAE
<br>
<br>
